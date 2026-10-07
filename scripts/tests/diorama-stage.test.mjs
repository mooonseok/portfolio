import assert from 'node:assert/strict';
import { getEventListeners } from 'node:events';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import * as THREE from 'three';
import ts from 'typescript';
import * as model from '../../src/lib/diorama/create-model.ts';

const source = readFileSync(
  new URL('../../src/lib/diorama/create-stage.ts', import.meta.url),
  'utf8'
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

function fixture(failure) {
  const error = new Error('injected renderer failure');
  const canvas = new EventTarget();
  const document = new EventTarget();
  document.hidden = false;
  const host = {
    children: [],
    appendChild(child) {
      this.children.push(child);
    },
    getBoundingClientRect: () => ({ width: 800, height: 500 }),
  };
  canvas.style = {};
  canvas.setAttribute = () => {};
  canvas.getBoundingClientRect = host.getBoundingClientRect;
  canvas.remove = () => {
    host.children = host.children.filter((child) => child !== canvas);
  };
  const frames = new Map();
  let nextFrame = 0;
  const counts = { disposed: 0, contextLost: 0, disconnected: 0, errors: 0 };
  class Renderer {
    domElement = canvas;
    setPixelRatio() {}
    setSize() {
      if (failure === 'size') throw error;
    }
    render() {
      if (failure === 'render') throw error;
    }
    dispose() {
      counts.disposed += 1;
    }
    forceContextLoss() {
      counts.contextLost += 1;
    }
  }
  class Observer {
    observe() {}
    disconnect() {
      counts.disconnected += 1;
    }
  }
  const loaded = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === 'three') return { ...THREE, WebGLRenderer: Renderer };
    if (specifier === './create-model') return model;
    throw new Error(`Unexpected dependency: ${specifier}`);
  };
  new Function(
    'require',
    'module',
    'exports',
    'document',
    'window',
    'ResizeObserver',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    compiled
  )(
    localRequire,
    loaded,
    loaded.exports,
    document,
    { devicePixelRatio: 1 },
    Observer,
    (callback) => {
      frames.set(++nextFrame, callback);
      return nextFrame;
    },
    (id) => frames.delete(id)
  );
  return {
    canvas,
    error,
    counts,
    create: () =>
      loaded.exports.createStage(host, {
        reducedMotion: false,
        onSelect: () => {},
        onError: () => {
          counts.errors += 1;
        },
      }),
    flush: () => {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach((callback) => callback(16));
    },
    assertClean: () => {
      assert.equal(host.children.length, 0);
      assert.equal(frames.size, 0);
      assert.equal(counts.disposed, 1);
      assert.equal(counts.contextLost, 1);
      assert.equal(counts.disconnected, 1);
      for (const type of ['click', 'pointermove', 'webglcontextlost'])
        assert.equal(getEventListeners(canvas, type).length, 0);
      assert.equal(getEventListeners(document, 'visibilitychange').length, 0);
    },
  };
}

test('initial resize failure releases the mounted canvas and resources', () => {
  const f = fixture('size');
  assert.throws(f.create, (error) => error === f.error);
  f.assertClean();
});

test('render failure reports fallback once and cancels further work', () => {
  const f = fixture('render');
  const stage = f.create();
  stage.setSelected(true);
  f.flush();
  assert.equal(f.counts.errors, 1);
  f.assertClean();
  stage.setSelected(false);
  stage.setReducedMotion(true);
  stage.dispose();
  f.flush();
  assert.equal(f.counts.errors, 1);
  f.assertClean();
});

test('context loss prevents default, reports fallback and removes its listener', () => {
  const f = fixture();
  const stage = f.create();
  const lost = new Event('webglcontextlost', { cancelable: true });
  f.canvas.dispatchEvent(lost);
  assert.equal(lost.defaultPrevented, true);
  assert.equal(f.counts.errors, 1);
  f.assertClean();
  f.canvas.dispatchEvent(new Event('webglcontextlost', { cancelable: true }));
  stage.dispose();
  f.flush();
  assert.equal(f.counts.errors, 1);
  f.assertClean();
});
