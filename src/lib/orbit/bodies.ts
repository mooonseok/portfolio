import * as THREE from 'three';
import { ORBIT_SKIN, type OrbitSkin } from '@/constants/orbit';
import { INK } from './engrave';
import { SURFACE, matteMaterial } from './matte-material';
import { createFineRing, createSatinRing } from './planet-ring';

const SKIN_SURFACE: Record<OrbitSkin, [number, number, number]> = {
  [ORBIT_SKIN.SITE]: [SURFACE.CHALK, 0xd8d2bf, 0x283344],
  [ORBIT_SKIN.TEXT]: [SURFACE.LAYERED, 0xcbbfa8, 0x303744],
  [ORBIT_SKIN.ALBUM]: [SURFACE.STONE, 0xc3cbd0, 0x273547],
  [ORBIT_SKIN.CANDLE]: [SURFACE.PORCELAIN, 0xe1d9ca, 0x2a3446],
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
    matteMaterial(...SKIN_SURFACE[skin])
  );
  group.add(core);
  let spin: THREE.Object3D | null = null;
  const moons: THREE.Mesh[] = [];
  if (skin === ORBIT_SKIN.SITE) {
    group.add(createSatinRing(size));
  }
  if (skin === ORBIT_SKIN.CANDLE) {
    spin = createFineRing(size);
    group.add(spin);
  }
  if (skin === ORBIT_SKIN.TEXT || skin === ORBIT_SKIN.ALBUM) {
    const count = skin === ORBIT_SKIN.ALBUM ? 3 : 1;
    for (let k = 0; k < count; k += 1) {
      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(size * 0.17, 16, 12),
        matteMaterial(SURFACE.CHALK, 0xbdb9ad, 0x303a4b)
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
  const material = matteMaterial(SURFACE.STONE, 0xc8c6bc, 0x273246);
  material.uniforms.uF.value = 2.6 * Math.min(2, pixelRatio);
  return new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 48), material);
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
