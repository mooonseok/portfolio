import * as THREE from 'three';
import { DIORAMA_POSITIONS } from '@/constants/diorama-scene';
import { createProjectModel } from './create-project-model';
import { disposeModel } from './create-model';

export function createProjectScene(pixelRatio = 1) {
  const scene = new THREE.Scene();
  try {
    const models = DIORAMA_POSITIONS.map(({ slug, x, z }) => {
      const model = createProjectModel(slug, pixelRatio);
      model.group.scale.setScalar(0.57);
      model.group.position.set(x, 0, z);
      scene.add(model.group);
      return { slug, ...model };
    });
    return { scene, models };
  } catch (error) {
    disposeModel(scene);
    throw error;
  }
}
