import assert from 'node:assert/strict';
import { getEventListeners } from 'node:events';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import * as THREE from 'three';
import ts from 'typescript';

export function fixture(failure) {
  const error = new Error('injected renderer failure');
  const canvas = new EventTarget();
  const document = new EventTarget();
  document.hidden = false;
  let width = 800;
  let height = 500;
  let observerCallback;
  let rendered;
  const host = {
    children: [],
    appendChild(child) {
      this.children.push(child);
    },
    getBoundingClientRect: () => ({ width, height, left: 0, top: 0 }),
  };
  canvas.style = {};
  canvas.setAttribute = () => {};
  canvas.getBoundingClientRect = host.getBoundingClientRect;
  canvas.remove = () => {
    host.children = host.children.filter((child) => child !== canvas);
  };
  const frames = new Map();
  let nextFrame = 0;
  let time = 0;
  const counts = { disposed: 0, contextLost: 0, disconnected: 0, errors: 0 };
  const selections = [];
  class Renderer {
    domElement = canvas;
    setPixelRatio() {}
    setSize() {
      if (failure === 'size') throw error;
    }
    render(scene, camera) {
      if (failure === 'render') throw error;
      scene.updateMatrixWorld(true);
      camera.updateMatrixWorld(true);
      rendered = { scene, camera };
    }
    dispose() {
      counts.disposed += 1;
    }
    forceContextLoss() {
      counts.contextLost += 1;
    }
  }
  class Observer {
    constructor(callback) {
      observerCallback = callback;
    }
    observe() {}
    disconnect() {
      counts.disconnected += 1;
    }
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
      if (specifier.startsWith('@/'))
        return load(resolve(root, specifier.slice(2)));
      if (specifier.startsWith('.'))
        return load(resolve(dirname(path), specifier));
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
    return loaded.exports;
  };
  return {
    canvas,
    error,
    counts,
    selections,
    create: () =>
      load(resolve(root, 'lib/diorama/create-stage')).createStage(host, {
        reducedMotion: false,
        onSelect: (slug) => selections.push(slug),
        onError: () => {
          counts.errors += 1;
        },
      }),
    flush: (delta = 16) => {
      time += delta;
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach((callback) => callback(time));
      return rendered;
    },
    pending: () => frames.size,
    resize: (w, h) => {
      width = w;
      height = h;
      observerCallback();
    },
    click: (point) => {
      const event = new Event('click');
      const projected = point.clone().project(rendered.camera);
      Object.assign(event, {
        clientX: ((projected.x + 1) * width) / 2,
        clientY: ((1 - projected.y) * height) / 2,
      });
      canvas.dispatchEvent(event);
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
