import * as THREE from 'three';

export const SURFACE = {
  CHALK: 0,
  LAYERED: 1,
  STONE: 2,
  PORCELAIN: 3,
} as const;

const vertexShader = `varying vec3 vNormal; varying vec3 vPosition; varying vec3 vView;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;

const fragmentShader = `uniform vec3 uBase; uniform vec3 uShadow;
uniform int uSurface; uniform float uF;
varying vec3 vNormal; varying vec3 vPosition; varying vec3 vView;
float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float noise(vec3 p) {
  vec3 i = floor(p); vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
    mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
    mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}
void main() {
  vec3 p = normalize(vPosition);
  vec3 n = normalize(vNormal);
  vec3 view = normalize(vView);
  vec3 light = normalize(vec3(-0.65, 0.85, 1.1));
  float coarse = noise(p * 4.0);
  float fine = noise(p * 29.0);
  float relief = (coarse - 0.5) * 0.08;
  if (uSurface == 1) {
    float layers = sin(p.y * 14.0 + coarse * 2.8);
    relief = layers * 0.045 + (coarse - 0.5) * 0.04;
  } else if (uSurface == 2) {
    relief = (coarse - 0.5) * 0.16 + (noise(p * 11.0) - 0.5) * 0.045;
  } else if (uSurface == 3) {
    relief *= 0.3;
  }
  relief += (fine - 0.5) * 0.016 * smoothstep(1.3, 2.6, uF);
  float diffuse = max(dot(n, light), 0.0);
  float broad = pow(max(dot(n, normalize(light + view)), 0.0), 9.0);
  float reflected = pow(max(dot(n, normalize(vec3(0.7, -0.2, 0.4))), 0.0), 2.0);
  float shade = smoothstep(-0.16, 0.98, dot(n, light));
  vec3 color = mix(uShadow, uBase, shade * 0.94);
  color *= 0.94 + relief;
  color += uBase * (broad * 0.065 + diffuse * 0.025);
  color += vec3(0.015, 0.021, 0.032) * reflected;
  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export function matteMaterial(surface: number, base: number, shadow: number) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uSurface: { value: surface },
      uBase: { value: new THREE.Color(base) },
      uShadow: { value: new THREE.Color(shadow) },
      uF: { value: 2.6 },
    },
    vertexShader,
    fragmentShader,
  });
}
