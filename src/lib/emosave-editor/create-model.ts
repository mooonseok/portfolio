import * as THREE from 'three';
import { EDITOR } from '@/constants/emosave-editor';

export function createEditorModel() {
  const scene = new THREE.Scene();
  const house = new THREE.Group();
  const paper = new THREE.MeshStandardMaterial({
    color: '#f3f2ed',
    roughness: 0.9,
  });
  const blue = new THREE.MeshStandardMaterial({
    color: '#1f5fd6',
    roughness: 0.9,
  });
  const ink = new THREE.LineBasicMaterial({ color: '#161817' });
  const box = (
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    accent = false
  ) => {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(geometry, accent ? blue : paper);
    mesh.position.set(x, y, z);
    mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), ink));
    house.add(mesh);
    return mesh;
  };
  box(0.9, 0.72, 0.8, 0, 0.36, 0);
  const roofGeometry = new THREE.ConeGeometry(0.76, 0.48, 4);
  const roof = new THREE.Mesh(roofGeometry, blue);
  roof.position.y = 0.95;
  roof.rotation.y = Math.PI / 4;
  roof.add(new THREE.LineSegments(new THREE.EdgesGeometry(roofGeometry), ink));
  house.add(roof);
  box(0.22, 0.22, 0.22, -0.2, 1.1, -0.12, true);
  box(0.2, 0.4, 0.035, -0.17, 0.22, 0.42, true);
  box(0.18, 0.18, 0.035, 0.19, 0.46, 0.42, true);
  box(0.38, 0.08, 0.28, -0.17, 0.04, 0.55, true);
  scene.add(house);
  const ground = new THREE.Mesh(new THREE.BoxGeometry(5, 0.12, 5), paper);
  ground.position.y = -0.075;
  ground.add(
    new THREE.LineSegments(new THREE.EdgesGeometry(ground.geometry), ink)
  );
  scene.add(ground);
  const gridMaterial = new THREE.LineBasicMaterial({ color: '#d6d5cf' });
  const points: THREE.Vector3[] = [];
  for (let i = -2; i <= 2; i++) {
    points.push(
      new THREE.Vector3(i, 0, -EDITOR.HALF_GROUND),
      new THREE.Vector3(i, 0, EDITOR.HALF_GROUND)
    );
    points.push(
      new THREE.Vector3(-EDITOR.HALF_GROUND, 0, i),
      new THREE.Vector3(EDITOR.HALF_GROUND, 0, i)
    );
  }
  scene.add(
    new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(points),
      gridMaterial
    )
  );
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.84, 0.862, 64),
    new THREE.MeshBasicMaterial({ color: '#d23a2e', side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.008;
  ring.visible = false;
  scene.add(ring);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb6b8b0, 2.2));
  const light = new THREE.DirectionalLight(0xffffff, 2.4);
  light.position.set(-3, 7, 5);
  scene.add(light);
  return { scene, house, ring };
}
