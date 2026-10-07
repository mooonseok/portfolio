import * as THREE from 'three';
import { PROJECT_SLUG, type ProjectSlug } from '@/constants/project';
import { createModel } from './create-model';
import { modelParts } from './model-parts';

export function createProjectModel(slug: ProjectSlug) {
  const model =
    slug === PROJECT_SLUG.FARMFAM_PLUS
      ? createModel()
      : createDistinctModel(slug);
  model.group.userData.projectSlug = slug;
  model.group.traverse((object) => {
    if (object instanceof THREE.Mesh && object !== model.ring)
      object.userData.projectSlug = slug;
  });
  return model;
}

function createDistinctModel(slug: ProjectSlug) {
  const m = modelParts();
  if (slug === PROJECT_SLUG.EMOSAVE) {
    m.phone(-0.95, -0.25);
    m.add(new THREE.CircleGeometry(0.2, 24), -0.95, 1.34, -0.12);
    [-1.02, -0.88].forEach((x) => m.sphere(0.025, x, 1.38, -0.1));
    [0.76, 0.95].forEach((y) => m.box(0.36, 0.045, 0.03, -0.95, y, -0.12));
    [
      [0.32, 0.65],
      [1.13, -0.32],
    ].forEach(([x, z]) => {
      m.box(0.62, 0.6, 0.6, x, 0.5, z);
      const roof = m.add(
        new THREE.ConeGeometry(0.54, 0.42, 4),
        x,
        1.0,
        z,
        true
      );
      roof.rotation.y = Math.PI / 4;
      m.box(0.15, 0.3, 0.035, x - 0.12, 0.38, z + 0.32, true);
      m.box(0.13, 0.13, 0.035, x + 0.15, 0.61, z + 0.32, true);
    });
  } else if (slug === PROJECT_SLUG.INDIAN_BOB) {
    m.phone(-0.8, -0.2);
    [0.75, 1.08, 1.4].forEach((y) => {
      m.box(0.13, 0.13, 0.035, -0.95, y, -0.07);
      m.box(0.22, 0.035, 0.035, -0.69, y, -0.07);
    });
    m.box(0.84, 0.88, 0.08, 0.55, 1.2, -0.7);
    [0.98, 1.23].forEach((y) =>
      [0.3, 0.57, 0.82].forEach((x) =>
        m.box(0.13, 0.13, 0.035, x, y, -0.64, true)
      )
    );
    [0.3, 0.8].forEach((x) => m.box(0.06, 0.18, 0.12, x, 1.65, -0.7, true));
    [
      [0.25, 0.5],
      [0.95, 0.05],
      [1.05, 1.0],
    ].forEach(([x, z]) => {
      m.add(new THREE.CylinderGeometry(0.13, 0.22, 0.45, 12), x, 0.5, z);
      m.sphere(0.18, x, 0.86, z);
    });
  } else if (slug === PROJECT_SLUG.APC) {
    m.box(1.65, 1.04, 0.14, -0.5, 1.2, -0.65);
    [0.93, 1.2, 1.47].forEach((y) =>
      m.box(1.34, 0.09, 0.025, -0.5, y, -0.56, true)
    );
    m.box(0.15, 0.5, 0.15, -0.5, 0.5, -0.65);
    m.box(0.9, 0.43, 0.6, -0.6, 0.4, 0.7);
    m.box(0.55, 0.43, 0.48, 0.17, 0.4, 0.85);
    m.box(0.66, 1.04, 0.08, 1.05, 0.77, 0.12);
    [0.5, 0.74, 0.98].forEach((y) =>
      m.box(0.41, 0.055, 0.025, 1.05, y, 0.18, true)
    );
    m.box(0.24, 0.1, 0.13, 1.05, 1.34, 0.12, true);
    m.add(
      new THREE.CylinderGeometry(0.11, 0.15, 0.2, 16),
      1.16,
      0.42,
      0.9,
      true
    );
    m.box(0.38, 0.09, 0.28, 1.16, 0.27, 0.9);
    [-0.91, -0.6, -0.29].forEach((x) =>
      m.box(0.06, 0.36, 0.025, x, 0.4, 1.015, true)
    );
  } else {
    m.box(0.04, 0.06, 2.9, 0, 0.24, 0);
    m.box(1.1, 0.1, 0.78, -0.93, 0.3, 0.05, true);
    m.box(0.36, 0.19, 0.3, -0.93, 0.45, 0.05);
    [-1.34, -1.08, -0.82, -0.56].forEach((x) => {
      m.add(new THREE.CylinderGeometry(0.035, 0.035, 0.22, 8), x, 0.46, 0.32);
      m.add(new THREE.CylinderGeometry(0.035, 0.035, 0.22, 8), x, 0.46, -0.22);
    });
    [-1.03, -0.91, -0.79].forEach((x) =>
      m.box(0.045, 0.025, 0.22, x, 0.56, 0.05, true)
    );
    m.box(0.84, 0.08, 0.58, 0.95, 0.28, 0.05);
    [0.8, 1.1].forEach((x) =>
      m.add(new THREE.CylinderGeometry(0.032, 0.032, 0.43, 8), x, 0.54, 0.05)
    );
    m.add(
      new THREE.CylinderGeometry(0.28, 0.28, 0.3, 24),
      0.95,
      0.9,
      0.05,
      true
    );
    m.add(
      new THREE.SphereGeometry(0.28, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2),
      0.95,
      1.05,
      0.05,
      true
    );
  }
  return { group: m.group, ring: m.ring };
}
