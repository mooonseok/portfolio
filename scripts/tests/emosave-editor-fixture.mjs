import assert from 'node:assert/strict';
import { getEventListeners } from 'node:events';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import * as THREE from 'three';
import ts from 'typescript';

export function dispatch(target, type, values = {}) {
  const event = new Event(type, { cancelable: true });
  Object.assign(event, values);
  target.dispatchEvent(event);
  return event;
}

export function fixture(failure) {
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
  const canvas = new Surface();
  const document = Object.assign(new Surface(), { hidden: false });
  const window = Object.assign(new Surface(), { devicePixelRatio: 3 });
  const captures = new Set();
  const attributes = new Map();
  const resources = new Map();
  const frames = new Map();
  const changes = [];
  const error = new Error(`injected ${failure} failure`);
  const failAt = (point) => {
    if (failure === point) throw error;
  };
  const counts = { renders: 0, disposed: 0, contextLost: 0, disconnected: 0 };
  const rect = { width: 800, height: 500, left: 20, top: 30 };
  let nextFrame = 0;
  let observe;
  let rendered;
  let model;
  let stage;
  const host = {
    children: [],
    appendChild: (child) => host.children.push(child),
    getBoundingClientRect: () => ({ ...rect }),
  };
  canvas.style = {};
  canvas.setAttribute = (key, value) => attributes.set(key, value);
  canvas.getBoundingClientRect = host.getBoundingClientRect;
  canvas.remove = () => host.children.splice(0);
  canvas.setPointerCapture = (id) => captures.add(id);
  canvas.hasPointerCapture = (id) => captures.has(id);
  canvas.releasePointerCapture = (id) => {
    if (captures.delete(id))
      dispatch(canvas, 'lostpointercapture', { pointerId: id });
  };
  class Renderer {
    constructor() {
      failAt('constructor');
    }
    domElement = canvas;
    setPixelRatio = (value) => (counts.pixelRatio = value);
    setSize = () => failAt('size');
    render(scene, camera) {
      counts.renders += 1;
      failAt('render');
      scene.updateMatrixWorld(true);
      camera.updateMatrixWorld(true);
      rendered = { scene, camera };
    }
    dispose = () => counts.disposed++;
    forceContextLoss = () => counts.contextLost++;
  }
  class Observer {
    constructor(callback) {
      observe = callback;
    }
    observe = () => failAt('observe');
    disconnect = () => counts.disconnected++;
  }
  const root = resolve(import.meta.dirname, '../../src');
  const cache = new Map();
  const load = (file) => {
    const path = file.endsWith('.ts') ? file : `${file}.ts`;
    if (cache.has(path)) return cache.get(path).exports;
    const loaded = { exports: {} };
    cache.set(path, loaded);
    const compiled = ts.transpileModule(readFileSync(path, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText;
    const localRequire = (specifier) => {
      if (specifier === 'three') return { ...THREE, WebGLRenderer: Renderer };
      return load(
        specifier.startsWith('@/')
          ? resolve(root, specifier.slice(2))
          : resolve(dirname(path), specifier)
      );
    };
    const context = {
      require: localRequire,
      exports: loaded.exports,
      document,
      window,
      ResizeObserver: Observer,
      requestAnimationFrame: (callback) => {
        frames.set(++nextFrame, callback);
        return nextFrame;
      },
      cancelAnimationFrame: (id) => frames.delete(id),
    };
    new Function(...Object.keys(context), compiled)(...Object.values(context));
    if (loaded.exports.createEditorModel) {
      const create = loaded.exports.createEditorModel;
      loaded.exports.createEditorModel = () => {
        model = create();
        model.scene.traverse((object) => {
          if (!object.isMesh && !object.isLineSegments) return;
          for (const resource of [object.geometry, object.material].flat()) {
            if (resources.has(resource)) continue;
            resources.set(resource, 0);
            resource.addEventListener('dispose', () =>
              resources.set(resource, resources.get(resource) + 1)
            );
          }
        });
        return model;
      };
    }
    return loaded.exports;
  };
  const editor = (name) => load(resolve(root, 'lib/emosave-editor', name));
  const session = editor('state').createEditorSession((value, message) => {
    changes.push({ value, message });
    stage?.paint(value);
  });
  return {
    canvas,
    document,
    window,
    host,
    captures,
    attributes,
    resources,
    session,
    changes,
    counts,
    error,
    get model() {
      return model;
    },
    create() {
      stage = editor('create-stage').createEditorStage(host, session, () => {
        counts.errors = (counts.errors ?? 0) + 1;
      });
      stage.paint(session.get());
      return stage;
    },
    bind() {
      return editor('bind-input').bindEditorInput(
        canvas,
        session,
        (event) => event.hit ?? null
      );
    },
    emit: (type, values = {}) =>
      dispatch(canvas, type, {
        pointerId: 1,
        pointerType: 'mouse',
        button: 0,
        isPrimary: true,
        clientX: 100,
        clientY: 100,
        ...values,
      }),
    pending: () => frames.size,
    flush() {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach((callback) => callback(16));
      return rendered;
    },
    resize(width = rect.width, height = rect.height) {
      Object.assign(rect, { width, height });
      observe();
    },
    assertClean() {
      assert.equal(host.children.length, 0);
      assert.equal(frames.size, 0);
      assert.equal(captures.size, 0);
      assert.ok([...resources.values()].every((count) => count === 1));
      for (const target of [canvas, window, document])
        for (const type of target.types)
          assert.equal(getEventListeners(target, type).length, 0, type);
    },
  };
}
