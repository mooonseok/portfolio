import * as THREE from 'three';
import type { OrbitBody } from '@/dto/orbit.dto';
import {
  SKIN_OUTER,
  createMoon,
  createPlanet,
  createPlate,
  ringPoints,
  type PlanetParts,
} from './bodies';
import { INK, VERMILION } from './engrave';
import { RADII } from './fit-view';

const TILTS = [
  [0.05, 0.03],
  [-0.05, 0.06],
  [0.06, -0.04],
  [-0.04, -0.06],
];

export interface Orbit {
  parts: PlanetParts;
  plane: THREE.Group;
  arc: THREE.Group;
  arcMaterial: THREE.MeshBasicMaterial;
  baseMaterial: THREE.LineDashedMaterial;
  share: number;
  size: number;
  outer: number;
  phase: number;
  grow: number;
}

export function createSystem(bodies: OrbitBody[], pixelRatio: number) {
  const world = new THREE.Group();
  world.add(createPlate());
  const moonGroup = new THREE.Group();
  moonGroup.add(createMoon(pixelRatio));
  world.add(moonGroup);
  const most = Math.max(1, ...bodies.map((body) => body.count));
  const orbits: Orbit[] = bodies.slice(0, RADII.length).map((body, i) => {
    const plane = new THREE.Group();
    plane.rotation.set(TILTS[i][0], 0, TILTS[i][1]);
    world.add(plane);
    const baseMaterial = new THREE.LineDashedMaterial({
      color: INK,
      transparent: true,
      opacity: 0.12,
      dashSize: 0.06,
      gapSize: 0.07,
    });
    const base = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(ringPoints(RADII[i], 180)),
      baseMaterial
    );
    base.computeLineDistances();
    plane.add(base);
    const share = Math.max(0.1, body.count / most) * Math.PI * 2 * 0.9;
    const arcMaterial = new THREE.MeshBasicMaterial({
      color: INK,
      transparent: true,
      opacity: 0.45,
    });
    const arcMesh = new THREE.Mesh(
      new THREE.TorusGeometry(RADII[i], 0.012, 6, 200, share),
      arcMaterial
    );
    arcMesh.rotation.x = Math.PI / 2;
    const arc = new THREE.Group();
    arc.add(arcMesh);
    plane.add(arc);
    const size = 0.24 + 0.1 * Math.sqrt(body.count / most);
    const parts = createPlanet(body.skin, size);
    plane.add(parts.group);
    return {
      parts,
      plane,
      arc,
      arcMaterial,
      baseMaterial,
      share,
      size,
      outer: SKIN_OUTER[body.skin],
      phase: (i * Math.PI * 2) / bodies.length + 0.4,
      grow: 1,
    };
  });
  return { world, moonGroup, orbits };
}

export type OrbitSystem = ReturnType<typeof createSystem>;

const ink = new THREE.Color(INK);
const vermilion = new THREE.Color(VERMILION);

export function poseOrbit(
  orbit: Orbit,
  index: number,
  turn: number,
  time: number,
  active: boolean,
  lift: number
) {
  const angle = orbit.phase + turn;
  orbit.grow += ((active ? 1.1 : 1) + lift - orbit.grow) * 0.2;
  const { group, core, spin, moons } = orbit.parts;
  group.position.set(
    Math.cos(angle) * RADII[index],
    0,
    Math.sin(angle) * RADII[index]
  );
  group.scale.setScalar(orbit.grow);
  core.rotation.y = time * 0.3 + index;
  if (spin) spin.rotation.y = time * 0.35;
  moons.forEach((moon) => {
    const a = (moon.userData.angle as number) + time * 0.55;
    const r = (orbit.size / 4.5) * 6.5;
    moon.position.set(
      Math.cos(a) * r,
      Math.sin(a * 2) * orbit.size * 0.13,
      Math.sin(a) * r
    );
  });
  orbit.arc.rotation.y = orbit.share - angle;
  orbit.arcMaterial.color.copy(active ? vermilion : ink);
  orbit.arcMaterial.opacity = active ? 1 : 0.45;
  orbit.baseMaterial.opacity = active ? 0.22 : 0.1;
}
