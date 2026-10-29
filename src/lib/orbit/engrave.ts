import * as THREE from 'three';

export const PATTERN = {
  GRID: 0,
  LINES: 1,
  DOTS: 2,
  DIAGONAL: 3,
  HATCH: 5,
} as const;

export const INK = 0xebe3cb;
export const BODY = 0x111d38;
export const NIGHT = 0x0b1428;
export const VERMILION = 0xe0664a;
export const LIGHT = new THREE.Vector3(0.85, 0.42, 0.32).normalize();

const vertexShader = `varying vec3 vN; varying vec3 vO; varying float vF;
void main() {
  vO = position;
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vF = dot(normalize(normalMatrix * normal), normalize(-mv.xyz));
  gl_Position = projectionMatrix * mv;
}`;

const fragmentShader = `uniform vec3 uL; uniform float uS; uniform int uPat; uniform float uF;
uniform vec3 uInk; uniform vec3 uBg;
varying vec3 vN; varying vec3 vO; varying float vF;
float ln(float x, float w) {
  float g = fract(x); float d = min(g, 1.0 - g); float a = fwidth(x);
  return 1.0 - smoothstep(w - a, w + a, d);
}
void main() {
  float dl = dot(normalize(vN), uL);
  float lit = uS > 0.5 ? smoothstep(-0.05, 0.5, dl) : clamp(dl * 0.85 + 0.15, 0.0, 1.0);
  vec3 p = normalize(vO);
  float lat = asin(clamp(p.y, -1.0, 1.0)); float lon = atan(p.z, p.x);
  float w = 0.05 + 0.12 * lit; float a = 0.0;
  if (uPat == 0) a = max(ln(lat * uF, w), ln(lon * uF * 0.64, w));
  else if (uPat == 1) a = ln(lat * uF * 1.3, w);
  else if (uPat == 3) a = ln((p.x + p.y) * uF * 1.5, w);
  else if (uPat == 5) a = ln((gl_FragCoord.x - gl_FragCoord.y) / uF, w);
  else {
    vec2 q = vec2(lon * 0.64, lat) * uF * 1.3; vec2 c = fract(q) - 0.5;
    float r = 0.08 + 0.2 * lit; float aa = fwidth(q.x);
    a = 1.0 - smoothstep(r - aa, r + aa, length(c));
  }
  float rim = smoothstep(0.32, 0.12, vF);
  float ink = uS > 0.5 ? a * lit : a * (0.25 + 0.75 * lit);
  float edge = rim * (uS > 0.5 ? 0.22 + 0.78 * lit : 1.0);
  gl_FragColor = vec4(mix(uBg, uInk, clamp(max(ink, edge), 0.0, 1.0)), 1.0);
}`;

export function engraveMaterial(pattern: number, frequency: number, sharp = 0) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uL: { value: LIGHT },
      uS: { value: sharp },
      uPat: { value: pattern },
      uF: { value: frequency },
      uInk: { value: new THREE.Color(INK) },
      uBg: { value: new THREE.Color(BODY) },
    },
    vertexShader,
    fragmentShader,
  });
}
