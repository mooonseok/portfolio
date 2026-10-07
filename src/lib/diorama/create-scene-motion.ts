import * as THREE from 'three';
import type { ProjectSlug } from '@/constants/project';
import type { createProjectScene } from './create-project-scene';

export function createSceneMotion(
  models: ReturnType<typeof createProjectScene>['models'],
  camera: THREE.OrthographicCamera
) {
  const target = new THREE.Vector3();
  const offset = new THREE.Vector3();
  let selected: ProjectSlug | null = null;
  let snap = false;
  return {
    select(slug: ProjectSlug | null, immediate = false) {
      selected = slug;
      snap = immediate;
    },
    tick(delta: number, reduced: boolean) {
      const k = reduced || snap ? 1 : 1 - Math.exp(-14 * delta);
      let moving = false;
      const active = models.find((model) => model.slug === selected);
      models.forEach(({ slug, group, ring }) => {
        const lift = slug === selected ? 0.18 : 0;
        group.position.y = THREE.MathUtils.lerp(group.position.y, lift, k);
        if (Math.abs(group.position.y - lift) < 0.001) group.position.y = lift;
        moving ||= group.position.y !== lift;
        ring.visible = slug === selected;
        ring.material.opacity = slug === selected ? 1 : 0;
      });
      target.set(
        active ? active.group.position.x * 0.055 : 0,
        0,
        active ? active.group.position.z * 0.055 : 0
      );
      offset.lerp(target, k);
      if (offset.distanceTo(target) < 0.001) offset.copy(target);
      const zoom = selected ? 1.015 : 1;
      camera.zoom = THREE.MathUtils.lerp(camera.zoom, zoom, k);
      if (Math.abs(camera.zoom - zoom) < 0.0001) camera.zoom = zoom;
      camera.position.set(offset.x, 9, 11 + offset.z);
      camera.lookAt(offset.x, 0.35, offset.z);
      camera.updateProjectionMatrix();
      snap = false;
      return moving || offset.distanceTo(target) > 0 || camera.zoom !== zoom;
    },
  };
}
