import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as THREE from 'three';
import { PROJECT_SLUG } from '../../src/constants/project.ts';
import { fixture } from './diorama-fixture.mjs';

const slugs = Object.values(PROJECT_SLUG);
const groups = (scene) => scene.children.filter((object) => object.isGroup);
const rings = (scene) =>
  groups(scene).flatMap((group) =>
    group.children.filter(
      (object) => object.isMesh && !object.userData.projectSlug
    )
  );
const selected = (scene) =>
  groups(scene)
    .filter((group) =>
      group.children.some(
        (object) => rings(scene).includes(object) && object.visible
      )
    )
    .map((group) => group.userData.projectSlug);

function settle(f) {
  let rendered;
  let count = 0;
  while (f.pending() && count++ < 180) rendered = f.flush();
  assert.equal(f.pending(), 0, 'animation must reach idle');
  return rendered;
}

test('all five project models have finite geometry and clickable slug identity', () => {
  const f = fixture();
  const stage = f.create();
  try {
    const { scene } = f.flush();
    assert.deepEqual(
      groups(scene)
        .map((g) => g.userData.projectSlug)
        .sort(),
      [...slugs].sort()
    );
    for (const group of groups(scene)) {
      let meshes = 0;
      group.traverse((object) => {
        if (!object.isMesh) return;
        meshes += 1;
        const position = object.geometry.getAttribute('position');
        assert.ok(position.count >= 3);
        assert.ok(Array.from(position.array).every(Number.isFinite));
        if (!rings(scene).includes(object))
          assert.equal(object.userData.projectSlug, group.userData.projectSlug);
      });
      assert.ok(meshes > 1);
      const point = new THREE.Box3()
        .setFromObject(group)
        .getCenter(new THREE.Vector3());
      f.click(point);
      assert.equal(f.selections.at(-1), group.userData.projectSlug);
    }
  } finally {
    stage.dispose();
    f.assertClean();
  }
});

test('rapid changes keep one latest selection and settle without another frame', () => {
  const f = fixture();
  const stage = f.create();
  try {
    f.flush();
    for (const slug of slugs) {
      stage.setSelected(slug);
      const { scene } = f.flush();
      assert.deepEqual(selected(scene), [slug]);
    }
    const { scene } = settle(f);
    assert.deepEqual(selected(scene), [slugs.at(-1)]);
    assert.equal(
      groups(scene).filter((group) => group.position.y > 0).length,
      1
    );
    stage.setSelected(null);
    const cleared = settle(f).scene;
    assert.deepEqual(selected(cleared), []);
    assert.ok(groups(cleared).every((group) => group.position.y === 0));
  } finally {
    stage.dispose();
  }
});

test('immediate and reduced-motion selection settle in one frame', () => {
  const f = fixture();
  const stage = f.create();
  try {
    stage.setSelected(PROJECT_SLUG.APC, true);
    let { scene } = f.flush();
    assert.deepEqual(selected(scene), [PROJECT_SLUG.APC]);
    assert.equal(f.pending(), 0);
    stage.setSelected(PROJECT_SLUG.EMOSAVE);
    f.flush();
    stage.setReducedMotion(true);
    scene = f.flush().scene;
    assert.deepEqual(selected(scene), [PROJECT_SLUG.EMOSAVE]);
    assert.equal(f.pending(), 0);
    assert.equal(
      groups(scene).filter((group) => group.position.y > 0).length,
      1
    );
    stage.setSelected(null);
    f.flush();
    assert.equal(f.pending(), 0);
    assert.deepEqual(selected(scene), []);
  } finally {
    stage.dispose();
  }
});

test('all model vertices remain inside the camera across aspect ratios and selections', () => {
  const f = fixture();
  const stage = f.create();
  try {
    for (const [width, height] of [
      [390, 500],
      [744, 520],
      [1024, 540],
      [1440, 600],
    ]) {
      f.resize(width, height);
      for (const slug of [null, ...slugs]) {
        stage.setSelected(slug, true);
        const { scene, camera } = f.flush();
        for (const group of groups(scene))
          group.traverse((object) => {
            if (!object.isMesh) return;
            const positions = object.geometry.getAttribute('position');
            for (let index = 0; index < positions.count; index += 1) {
              const point = new THREE.Vector3()
                .fromBufferAttribute(positions, index)
                .applyMatrix4(object.matrixWorld)
                .project(camera);
              assert.ok(
                Math.abs(point.x) <= 1 &&
                  Math.abs(point.y) <= 1 &&
                  Math.abs(point.z) <= 1,
                `${width}px clips ${group.userData.projectSlug} with ${slug} selected`
              );
            }
          });
      }
    }
  } finally {
    stage.dispose();
  }
});

test('five-model cleanup releases every geometry and shared material exactly once', () => {
  const f = fixture();
  const stage = f.create();
  const { scene } = f.flush();
  const resources = new Set();
  scene.traverse((object) => {
    if (object.geometry) resources.add(object.geometry);
    if (object.material)
      for (const material of [object.material].flat()) resources.add(material);
  });
  const counts = new Map([...resources].map((resource) => [resource, 0]));
  for (const resource of resources)
    resource.addEventListener('dispose', () =>
      counts.set(resource, counts.get(resource) + 1)
    );
  stage.dispose();
  stage.dispose();
  assert.ok(resources.size > 0);
  assert.ok([...counts.values()].every((count) => count === 1));
  assert.equal(scene.children.length, 0);
  f.assertClean();
});
