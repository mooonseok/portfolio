import assert from 'node:assert/strict';
import { getEventListeners } from 'node:events';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import ts from 'typescript';

export function dispatch(target, type, values = {}) {
  const event = new Event(type, { cancelable: true });
  const { target: suppliedTarget, ...properties } = values;
  Object.assign(event, properties);
  if (suppliedTarget)
    Object.defineProperty(event, 'target', { value: suppliedTarget });
  target.dispatchEvent(event);
  return event;
}

export function fakeClock() {
  const pending = new Map();
  let next = 0;
  return {
    schedule(callback, delay) {
      pending.set(++next, { callback, delay });
      return next;
    },
    clear: (id) => pending.delete(id),
    pending,
    tick() {
      assert.equal(pending.size, 1);
      const [id, task] = pending.entries().next().value;
      pending.delete(id);
      task.callback();
      return task.delay;
    },
  };
}

export function fixture() {
  class Surface extends EventTarget {
    types = new Set();
    addEventListener(type, callback, options) {
      this.types.add(type);
      super.addEventListener(type, callback, options);
    }
    removeEventListener(type, callback, options) {
      const capture = options === true || options?.capture;
      super.removeEventListener(type, callback, { capture });
    }
  }
  const element = new Surface();
  const document = Object.assign(new Surface(), { hidden: false });
  const window = new Surface();
  const captures = new Set();
  const changes = [];
  const clock = fakeClock();
  const rect = { left: 20, top: 30, width: 800, height: 800 };
  const makeNode = (dataset) => {
    const attributes = new Map();
    const node = {
      dataset,
      style: {},
      setAttribute: (name, value) => attributes.set(name, value),
      getAttribute: (name) => attributes.get(name),
      closest: (selector) =>
        selector === `[data-editor-${dataset.editorOverlay}]` ? node : null,
    };
    return node;
  };
  const nodes = ['cloud', 'sprout', 'drop'].map((id) =>
    makeNode({ editorItem: id })
  );
  const overlays = ['rotate', 'resize', 'delete'].map((mode) =>
    makeNode({ editorOverlay: mode })
  );
  let stage;
  let failCapture = false;
  element.style = {};
  element.getBoundingClientRect = () => ({ ...rect });
  element.querySelectorAll = (selector) =>
    selector === '[data-editor-overlay]' ? overlays : nodes;
  element.setPointerCapture = (id) => {
    if (failCapture) throw new Error('element disconnected');
    captures.add(id);
  };
  element.hasPointerCapture = (id) => captures.has(id);
  element.releasePointerCapture = (id) => {
    if (captures.delete(id))
      dispatch(element, 'lostpointercapture', { pointerId: id });
  };
  window.setTimeout = clock.schedule;
  window.clearTimeout = clock.clear;
  const root = resolve(import.meta.dirname, '../../src');
  const cache = new Map();
  const load = (file) => {
    const path = file.endsWith('.ts') ? file : `${file}.ts`;
    if (cache.has(path)) return cache.get(path).exports;
    const loaded = { exports: {} };
    cache.set(path, loaded);
    const compiled = ts.transpileModule(readFileSync(path, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2017,
      },
    }).outputText;
    const localRequire = (specifier) =>
      load(
        specifier.startsWith('@/')
          ? resolve(root, specifier.slice(2))
          : resolve(dirname(path), specifier)
      );
    new Function('require', 'exports', 'document', 'window', compiled)(
      localRequire,
      loaded.exports,
      document,
      window
    );
    return loaded.exports;
  };
  const editor = (name) => load(resolve(root, 'lib/emosave-editor', name));
  const session = editor('state').createEditorSession((value, message) => {
    changes.push({ value, message });
    stage?.paint(value);
  });
  return {
    element,
    document,
    window,
    captures,
    session,
    changes,
    clock,
    nodes,
    overlays,
    makeNode,
    rect,
    point: (x, y) => ({
      clientX: rect.left + rect.width * x,
      clientY: rect.top + rect.height * y,
    }),
    create() {
      stage = editor('create-dom-stage').createEditorDomStage(element, session);
      return stage;
    },
    failCapture: () => (failCapture = true),
    bubbles: (changed, options = {}) =>
      editor('bubbles').createEditorBubbles(changed, options),
    bind: () =>
      editor('bind-input').bindEditorInput(
        element,
        session,
        (event) => event.hit ?? null
      ),
    emit: (type, values = {}) =>
      dispatch(element, type, {
        pointerId: 1,
        pointerType: 'mouse',
        button: 0,
        isPrimary: true,
        clientX: 100,
        clientY: 100,
        ...values,
      }),
    assertClean() {
      assert.equal(clock.pending.size, 0);
      assert.equal(captures.size, 0);
      for (const target of [element, window, document])
        for (const type of target.types)
          assert.equal(getEventListeners(target, type).length, 0, type);
    },
  };
}
