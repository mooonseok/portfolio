import * as THREE from 'three';
import { ORBIT_SKIN, type OrbitSkin } from '@/constants/orbit';
import { INK, PATTERN, engraveMaterial } from './engrave';

const SKIN_PATTERN: Record<OrbitSkin, number> = {
  [ORBIT_SKIN.SITE]: PATTERN.GRID,
  [ORBIT_SKIN.TEXT]: PATTERN.LINES,
  [ORBIT_SKIN.ALBUM]: PATTERN.DOTS,
  [ORBIT_SKIN.CANDLE]: PATTERN.DIAGONAL,
};

export const SKIN_OUTER: Record<OrbitSkin, number> = {
  [ORBIT_SKIN.SITE]: 1.62,
  [ORBIT_SKIN.TEXT]: 1.6,
  [ORBIT_SKIN.ALBUM]: 1.6,
  [ORBIT_SKIN.CANDLE]: 1.62,
};

const line = (opacity: number) =>
  new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity });

export function ringPoints(radius: number, segments: number) {
  return Array.from({ length: segments + 1 }, (_, k) => {
    const t = (k / segments) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius);
  });
}

export function lineLoop(radius: number, segments: number, opacity: number) {
  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(ringPoints(radius, segments)),
    line(opacity)
  );
}

function segments(pairs: [number, number, number][], opacity: number) {
  const points = pairs.flatMap(([t, r0, r1]) => [
    new THREE.Vector3(Math.cos(t) * r0, 0, Math.sin(t) * r0),
    new THREE.Vector3(Math.cos(t) * r1, 0, Math.sin(t) * r1),
  ]);
  return new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(points),
    line(opacity)
  );
}

export interface PlanetParts {
  group: THREE.Group;
  core: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>;
  spin: THREE.Object3D | null;
  moons: THREE.Mesh[];
}

export function createPlanet(skin: OrbitSkin, size: number): PlanetParts {
  const group = new THREE.Group();
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(size, 48, 32),
    engraveMaterial(SKIN_PATTERN[skin], 2.6)
  );
  group.add(core);
  let spin: THREE.Object3D | null = null;
  const moons: THREE.Mesh[] = [];
  if (skin === ORBIT_SKIN.SITE) {
    [
      [1.7, 0.9],
      [1.85, 0.4],
    ].forEach(([scale, opacity]) => {
      const ring = lineLoop(size * scale, 96, opacity);
      ring.rotation.set(0.42, 0, -0.32);
      group.add(ring);
    });
  }
  if (skin === ORBIT_SKIN.CANDLE) {
    spin = segments(
      Array.from({ length: 36 }, (_, k) => [
        (k / 36) * Math.PI * 2,
        size * 1.45,
        size * (k % 3 === 0 ? 1.75 : 1.6),
      ]),
      0.9
    );
    spin.rotation.set(0.38, 0, 0.22);
    group.add(spin);
  }
  if (skin === ORBIT_SKIN.TEXT || skin === ORBIT_SKIN.ALBUM) {
    const count = skin === ORBIT_SKIN.ALBUM ? 3 : 1;
    for (let k = 0; k < count; k += 1) {
      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(size * 0.17, 16, 12),
        new THREE.MeshBasicMaterial({ color: INK })
      );
      moon.userData.angle =
        (k / 3) * Math.PI * 2 + (skin === ORBIT_SKIN.TEXT ? 0.6 : 0);
      moons.push(moon);
      group.add(moon);
    }
  }
  return { group, core, spin, moons };
}

export function createMoon(pixelRatio: number) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 48),
    engraveMaterial(PATTERN.HATCH, 4.5 * Math.min(2, pixelRatio), 1)
  );
}

export function createPlate() {
  const plate = new THREE.Group();
  plate.add(
    segments(
      Array.from({ length: 12 }, (_, k) => [(k / 12) * Math.PI * 2, 1, 5.05]),
      0.07
    )
  );
  plate.add(
    segments(
      Array.from({ length: 120 }, (_, k) => [
        (k / 120) * Math.PI * 2,
        5.2,
        k % 10 === 0 ? 5.42 : k % 5 === 0 ? 5.34 : 5.28,
      ]),
      0.28
    )
  );
  plate.add(lineLoop(5.2, 240, 0.28));
  return plate;
}
