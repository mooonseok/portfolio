import * as THREE from 'three';

export const DIORAMA_COLOR = {
  face: '#111d38',
  recess: '#0b1428',
  line: '#ebe3cb',
  select: '#e0664a',
} as const;

export const DIORAMA_LIGHT = {
  ambient: 2.4,
  key: 1.2,
  direction: [-3, 7, 5],
} as const;

export const DIORAMA_HATCH = { period: 4.5, maxRatio: 2 } as const;

const hatchVertex = `varying vec3 vN;
void main() {
  vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const hatchFragment = `uniform vec3 uInk; uniform vec3 uBg; uniform vec3 uL; uniform float uP;
varying vec3 vN;
void main() {
  float lit = clamp(dot(normalize(vN), uL) * 0.5 + 0.5, 0.0, 1.0);
  float x = (gl_FragCoord.x - gl_FragCoord.y) / uP;
  float g = fract(x); float d = min(g, 1.0 - g); float a = fwidth(x);
  float w = 0.08 + 0.1 * lit;
  gl_FragColor = vec4(mix(uBg, uInk, 1.0 - smoothstep(w - a, w + a, d)), 1.0);
  #include <colorspace_fragment>
}`;

const offset = {
  polygonOffset: true,
  polygonOffsetFactor: 1,
  polygonOffsetUnits: 1,
} as const;

const surface = (color: string) =>
  new THREE.MeshLambertMaterial({ color, ...offset });

export function createMaterials(pixelRatio = 1) {
  return {
    paper: surface(DIORAMA_COLOR.face),
    accent: new THREE.ShaderMaterial({
      ...offset,
      uniforms: {
        uInk: { value: new THREE.Color(DIORAMA_COLOR.line) },
        uBg: { value: new THREE.Color(DIORAMA_COLOR.face) },
        uL: {
          value: new THREE.Vector3(...DIORAMA_LIGHT.direction).normalize(),
        },
        uP: {
          value:
            DIORAMA_HATCH.period * Math.min(DIORAMA_HATCH.maxRatio, pixelRatio),
        },
      },
      vertexShader: hatchVertex,
      fragmentShader: hatchFragment,
    }),
    ink: new THREE.LineBasicMaterial({ color: DIORAMA_COLOR.line }),
  };
}

export function createModel(pixelRatio = 1) {
  const group = new THREE.Group();
  const { paper, accent, ink } = createMaterials(pixelRatio);
  const dark = surface(DIORAMA_COLOR.recess);
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
  box(1.66, 0.95, 0.03, accent, -0.55, 1.35, -0.15);
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
    box(0.06, 0.06, 0.035, accent, 1.18, y, 0);
  });
  [0.35, 0.57, 0.79].forEach((y) =>
    add(new THREE.CylinderGeometry(0.38, 0.38, 0.2, 32), accent, 0.95, y, 0.95)
  );
  box(0.92, 0.48, 0.62, paper, -0.9, 0.43, 1.0);
  [-1.2, -0.9, -0.6].forEach((x) => {
    box(0.06, 0.42, 0.03, dark, x, 0.43, 1.33);
    add(new THREE.SphereGeometry(0.14, 12, 8), accent, x, 0.73, 1.0);
    const leaf = box(0.1, 0.025, 0.045, paper, x + 0.03, 0.89, 1.0);
    leaf.rotation.z = 0.45;
  });
  return { group };
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
