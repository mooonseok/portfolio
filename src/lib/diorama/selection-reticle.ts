import * as THREE from 'three';
import { reticleRects, type ReticleRect } from './reticle-geometry';

const QUADS = 8;

export type Reticle = THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;

export function createReticle(color: string): Reticle {
  const geometry = new THREE.BufferGeometry();
  const position = new THREE.BufferAttribute(new Float32Array(QUADS * 12), 3);
  position.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('position', position);
  geometry.setIndex(
    Array.from({ length: QUADS }, (_, quad) => {
      const i = quad * 4;
      return [i, i + 1, i + 2, i, i + 2, i + 3];
    }).flat()
  );
  const reticle = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0,
      depthTest: false,
      depthWrite: false,
    })
  );
  reticle.renderOrder = 10;
  reticle.frustumCulled = false;
  reticle.visible = false;
  writeReticle(reticle, reticleRects(2.8, 2.8, 0.3, 0.05));
  return reticle;
}

export function writeReticle(reticle: Reticle, rects: readonly ReticleRect[]) {
  const position = reticle.geometry.getAttribute(
    'position'
  ) as THREE.BufferAttribute;
  rects.slice(0, QUADS).forEach(([x0, y0, x1, y1], quad) => {
    const i = quad * 4;
    position.setXYZ(i, x0, y0, 0);
    position.setXYZ(i + 1, x1, y0, 0);
    position.setXYZ(i + 2, x1, y1, 0);
    position.setXYZ(i + 3, x0, y1, 0);
  });
  position.needsUpdate = true;
  reticle.geometry.computeBoundingSphere();
}

export function measureFrame(
  group: THREE.Object3D,
  skip: THREE.Object3D,
  view: THREE.Quaternion
) {
  group.updateMatrixWorld(true);
  const toLocal = group.matrixWorld.clone().invert();
  const toView = view.clone().invert();
  const relative = new THREE.Matrix4();
  const point = new THREE.Vector3();
  const box = new THREE.Box3();
  group.traverse((object) => {
    if (!(object instanceof THREE.Mesh) || object === skip) return;
    relative.multiplyMatrices(toLocal, object.matrixWorld);
    const positions = object.geometry.getAttribute('position');
    for (let index = 0; index < positions.count; index += 1)
      box.expandByPoint(
        point
          .fromBufferAttribute(positions, index)
          .applyMatrix4(relative)
          .applyQuaternion(toView)
      );
  });
  const size = box.getSize(new THREE.Vector3());
  return {
    center: box.getCenter(new THREE.Vector3()).applyQuaternion(view),
    halfWidth: size.x / 2,
    halfHeight: size.y / 2,
  };
}
