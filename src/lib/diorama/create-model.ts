import * as THREE from 'three';

export function createModel() {
  const group = new THREE.Group();
  const paper = new THREE.MeshStandardMaterial({
    color: '#f3f2ed',
    roughness: 0.9,
  });
  const blue = new THREE.MeshStandardMaterial({
    color: '#1f5fd6',
    roughness: 0.85,
  });
  const ink = new THREE.LineBasicMaterial({ color: '#161817' });
  const dark = new THREE.MeshStandardMaterial({
    color: '#161817',
    roughness: 0.9,
  });
  const add = (
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    x: number,
    y: number,
    z: number
  ) => {
    const mesh = new THREE.Mesh(geometry, material);
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
    material: THREE.Material,
    x: number,
    y: number,
    z: number
  ) => add(new THREE.BoxGeometry(w, h, d), material, x, y, z);
  add(new THREE.CylinderGeometry(2.4, 2.5, 0.18, 6), paper, 0, 0.09, 0);
  box(1.9, 1.2, 0.16, paper, -0.55, 1.35, -0.25);
  box(1.66, 0.95, 0.03, blue, -0.55, 1.35, -0.15);
  box(0.18, 0.45, 0.18, dark, -0.55, 0.58, -0.25);
  box(0.85, 0.08, 0.55, paper, -0.55, 0.27, -0.25);
  box(0.28, 0.72, 0.035, paper, -1.14, 1.35, -0.12);
  [1.58, 1.31, 1.04].forEach((y) => {
    box(0.17, 0.17, 0.035, paper, -0.83, y, -0.12);
    box(0.53, 0.055, 0.035, paper, -0.34, y + 0.04, -0.12);
    box(0.32, 0.035, 0.035, paper, -0.44, y - 0.05, -0.12);
  });
  box(0.62, 1.4, 0.72, paper, 1.05, 0.89, -0.4);
  [0.52, 0.88, 1.24].forEach((y) => {
    box(0.46, 0.2, 0.025, dark, 1.05, y, -0.025);
    box(0.06, 0.06, 0.035, blue, 1.18, y, 0);
  });
  [0.35, 0.57, 0.79].forEach((y) =>
    add(new THREE.CylinderGeometry(0.38, 0.38, 0.2, 32), blue, 0.95, y, 0.95)
  );
  box(0.92, 0.48, 0.62, paper, -0.9, 0.43, 1.0);
  [-1.2, -0.9, -0.6].forEach((x) => {
    box(0.06, 0.42, 0.03, dark, x, 0.43, 1.33);
    add(new THREE.SphereGeometry(0.14, 12, 8), blue, x, 0.73, 1.0);
    const leaf = box(0.1, 0.025, 0.045, paper, x + 0.03, 0.89, 1.0);
    leaf.rotation.z = 0.45;
  });
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.63, 0.026, 8, 96),
    new THREE.MeshBasicMaterial({
      color: '#d23a2e',
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.025;
  group.add(ring);
  return { group, ring };
}

export function disposeModel(scene: THREE.Scene) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  scene.traverse((object) => {
    if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
      geometries.add(object.geometry);
      const list = Array.isArray(object.material)
        ? object.material
        : [object.material];
      list.forEach((material) => materials.add(material));
    }
  });
  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => material.dispose());
  scene.clear();
}
