import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as THREE from 'three';
import {
  createModel,
  disposeModel,
} from '../../src/lib/diorama/create-model.ts';

function resources(scene) {
  const geometries = new Set();
  const materials = new Set();
  scene.traverse((object) => {
    if (!object.isMesh && !object.isLineSegments) return;
    geometries.add(object.geometry);
    const list = Array.isArray(object.material)
      ? object.material
      : [object.material];
    list.forEach((material) => materials.add(material));
  });
  return [...geometries, ...materials];
}

test('the model has finite drawable geometry and a usable world extent', () => {
  const scene = new THREE.Scene();
  const { group } = createModel();
  scene.add(group);
  try {
    let meshes = 0;
    group.traverse((object) => {
      if (!object.isMesh) return;
      meshes += 1;
      const position = object.geometry.getAttribute('position');
      assert.ok(position.count >= 3);
      assert.ok(Array.from(position.array).every(Number.isFinite));
      object.geometry.computeBoundingSphere();
      assert.ok(Number.isFinite(object.geometry.boundingSphere.radius));
      assert.ok(object.geometry.boundingSphere.radius > 0);
    });
    assert.ok(meshes > 0);
    const size = new THREE.Box3()
      .setFromObject(group)
      .getSize(new THREE.Vector3());
    assert.ok(
      size.toArray().every((value) => Number.isFinite(value) && value > 0)
    );
  } finally {
    disposeModel(scene);
  }
});

test('a camera ray can select model surfaces without relying on the selection ring', () => {
  const scene = new THREE.Scene();
  const { group, ring } = createModel();
  scene.add(group);
  try {
    const camera = new THREE.OrthographicCamera(-4, 4, 3, -3, 0.1, 50);
    camera.position.set(5.5, 5, 7);
    camera.lookAt(0, 0.7, 0);
    camera.updateMatrixWorld(true);
    scene.updateMatrixWorld(true);
    const ray = new THREE.Raycaster();
    ray.setFromCamera(new THREE.Vector2(0, 0), camera);
    const hits = ray.intersectObjects(group.children, true);
    assert.ok(hits.some((hit) => hit.object.isMesh && hit.object !== ring));
    assert.ok(hits.every((hit) => Number.isFinite(hit.distance)));
  } finally {
    disposeModel(scene);
  }
});

test('cleanup disposes shared model resources exactly once and is safe to repeat', () => {
  const scene = new THREE.Scene();
  scene.add(createModel().group);
  const tracked = resources(scene);
  assert.ok(tracked.length > 0);
  const counts = new Map(tracked.map((resource) => [resource, 0]));
  tracked.forEach((resource) =>
    resource.addEventListener('dispose', () =>
      counts.set(resource, counts.get(resource) + 1)
    )
  );
  disposeModel(scene);
  assert.equal(scene.children.length, 0);
  assert.ok([...counts.values()].every((count) => count === 1));
  disposeModel(scene);
  assert.ok([...counts.values()].every((count) => count === 1));
  const replacement = createModel();
  scene.add(replacement.group);
  assert.ok(resources(scene).every((resource) => !counts.has(resource)));
  disposeModel(scene);
  assert.ok([...counts.values()].every((count) => count === 1));
});
