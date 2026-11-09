import * as THREE from 'three';
import { matteMaterial, SURFACE } from './matte-material';

const vertexShader = `varying vec3 vPosition; varying vec3 vNormal;
void main() {
  vPosition = position;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragmentShader = `uniform float uSize; uniform vec3 uColor;
varying vec3 vPosition; varying vec3 vNormal;
void main() {
  float radius = length(vPosition.xy) / uSize;
  float edge = smoothstep(1.36, 1.39, radius) * (1.0 - smoothstep(1.52, 1.55, radius));
  float groove = 1.0 - 0.16 * exp(-pow((radius - 1.46) * 130.0, 2.0));
  float light = 0.62 + 0.28 * abs(dot(normalize(vNormal), normalize(vec3(-0.65,0.85,1.1))));
  vec3 color = uColor * light * groove * mix(0.72, 1.0, edge);
  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export function createSatinRing(size: number) {
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(size * 1.36, size * 1.55, 128, 2),
    new THREE.ShaderMaterial({
      uniforms: {
        uSize: { value: size },
        uColor: { value: new THREE.Color(0xb4b0a4) },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    })
  );
  ring.rotation.set(0.22, 0.32, -0.3);
  return ring;
}

export function createFineRing(size: number) {
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(size * 1.46, size * 0.018, 8, 128),
    matteMaterial(SURFACE.PORCELAIN, 0xb7b7ad, 0x394455)
  );
  ring.rotation.set(-Math.PI / 2 + 0.85, 0.1, -0.5);
  return ring;
}
