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
    m.phone(-0.9, 0);
    m.box(1.32, 1.18, 0.1, 0.68, 1.05, -0.45);
    [-0.0, 0.38, 0.76].forEach((x) => {
      m.box(0.23, 0.18, 0.035, x + 0.22, 1.34, -0.37, true);
      m.box(0.23, 0.38, 0.035, x + 0.22, 0.9, -0.37, true);
    });
    m.box(0.85, 0.06, 0.55, 0.4, 0.29, 0.9, true);
    m.box(0.18, 0.07, 0.18, 0.66, 0.38, 0.9);
  } else if (slug === PROJECT_SLUG.INDIAN_BOB) {
    m.phone(-0.8, -0.2);
    [0.75, 1.08, 1.4].forEach((y) => {
      m.box(0.13, 0.13, 0.035, -0.95, y, -0.07);
      m.box(0.22, 0.035, 0.035, -0.69, y, -0.07);
    });
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
    m.sphere(0.12, 1.05, 1.34, 0.12);
  } else {
    m.box(0.04, 0.06, 2.9, 0, 0.24, 0);
    m.box(1.1, 0.1, 0.78, -0.93, 0.3, 0.05, true);
    m.box(0.36, 0.19, 0.3, -0.93, 0.45, 0.05);
    [-1.3, -0.56].forEach((x) =>
      m.add(new THREE.CylinderGeometry(0.05, 0.05, 0.27, 8), x, 0.48, 0.05)
    );
    m.add(new THREE.CylinderGeometry(0.42, 0.5, 0.12, 24), 0.95, 0.3, 0.05);
    m.add(new THREE.CylinderGeometry(0.055, 0.055, 0.82, 12), 0.95, 0.74, 0.05);
    m.sphere(0.27, 0.95, 1.32, 0.05);
  }
  return { group: m.group, ring: m.ring };
}
