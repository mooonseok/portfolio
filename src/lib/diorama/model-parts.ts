import * as THREE from 'three';
import { DIORAMA_COLOR, createMaterials } from './create-model';

export function modelParts(pixelRatio = 1) {
  const group = new THREE.Group();
  const { paper, accent: hatch, ink } = createMaterials(pixelRatio);
  const add = (
    geometry: THREE.BufferGeometry,
    x: number,
    y: number,
    z: number,
    accent = false
  ) => {
    const mesh = new THREE.Mesh(geometry, accent ? hatch : paper);
    mesh.position.set(x, y, z);
    mesh.add(
      new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 25), ink)
    );
    group.add(mesh);
    return mesh;
  };
  const box = (
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    accent = false
  ) => add(new THREE.BoxGeometry(w, h, d), x, y, z, accent);
  const sphere = (radius: number, x: number, y: number, z: number) =>
    add(new THREE.SphereGeometry(radius, 12, 8), x, y, z, true);
  const phone = (x: number, z: number) => {
    box(0.78, 1.52, 0.14, x, 1.05, z);
    box(0.61, 1.18, 0.03, x, 1.08, z + 0.09, true);
    box(0.15, 0.035, 0.035, x, 0.38, z + 0.09);
  };
  add(new THREE.CylinderGeometry(2.4, 2.5, 0.18, 6), 0, 0.09, 0);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.63, 0.026, 8, 96),
    new THREE.MeshBasicMaterial({
      color: DIORAMA_COLOR.select,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.025;
  ring.visible = false;
  group.add(ring);
  return { group, ring, add, box, sphere, phone };
}
