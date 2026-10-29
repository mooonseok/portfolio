import * as THREE from 'three';
import { NIGHT } from './engrave';
import { createView, fitView } from './fit-view';
import type { FitBox } from './read-mode';
import type { OrbitBody } from '@/dto/orbit.dto';
import { createSystem, poseOrbit } from './orbit-system';

export interface PlanetPoint {
  sx: number;
  sy: number;
  sr: number;
  reach: number;
  depth: number;
}

export interface OrbitFrame {
  width: number;
  height: number;
  planets: PlanetPoint[];
  moon: { x: number; y: number; r: number };
  vertical: boolean;
}

const TURN = (Math.PI * 2) / 70;

export function createOrbitStage(
  host: HTMLElement,
  bodies: OrbitBody[],
  reducedMotion: boolean
) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(NIGHT, 1);
  const canvas = renderer.domElement;
  canvas.style.cssText = 'display:block;width:100%;height:100%';
  canvas.setAttribute('aria-hidden', 'true');
  host.append(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.05, 200);
  const view = createView();
  const system = createSystem(bodies, window.devicePixelRatio || 1);
  scene.add(system.world);
  const up = new THREE.Vector3();
  const point = new THREE.Vector3();
  const edge = new THREE.Vector3();
  const state = {
    reduced: reducedMotion,
    active: 0,
    lift: -1,
    hold: false,
    spin: reducedMotion ? 0 : 1,
    turn: 0,
    velocity: 0,
    time: 0,
    width: 1,
    height: 1,
    frame: 0,
    last: 0,
    disposed: false,
  };
  let listener: ((frame: OrbitFrame) => void) | null = null;

  const toScreen = (target: THREE.Vector3) => {
    target.project(camera);
    return [
      (target.x * 0.5 + 0.5) * state.width,
      (-target.y * 0.5 + 0.5) * state.height,
    ];
  };

  const measure = (object: THREE.Object3D, radius: number) => {
    object.getWorldPosition(point);
    const depth = point.clone().applyMatrix4(camera.matrixWorldInverse).z;
    edge.copy(point).addScaledVector(up, radius);
    const [sx, sy] = toScreen(point);
    const [ex, ey] = toScreen(edge);
    return { sx, sy, sr: Math.max(6, Math.hypot(ex - sx, ey - sy)), depth };
  };

  const step = (delta: number) => {
    const moving = !state.reduced;
    if (moving) {
      state.time += delta;
      state.spin +=
        ((state.hold ? 0 : 1) - state.spin) * Math.min(1, delta * 4);
      state.turn += state.velocity + TURN * delta * state.spin;
      state.velocity *= 0.92;
    }
    system.moonGroup.rotation.y = moving
      ? Math.sin(state.time * 0.35) * 0.45
      : 0.25;
    up.setFromMatrixColumn(camera.matrixWorld, 1);
    const planets = system.orbits.map((orbit, i) => {
      const lift = state.lift === i ? 0.12 : 0;
      poseOrbit(
        orbit,
        i,
        state.turn,
        moving ? state.time : 0,
        state.active === i,
        lift
      );
      const m = measure(orbit.parts.group, orbit.size * orbit.grow * 1.1);
      orbit.parts.core.material.uniforms.uF.value =
        2.6 * Math.min(1, Math.max(0.5, m.sr / 20));
      orbit.parts.moons.forEach((moon) =>
        moon.scale.setScalar(Math.max(1, 3 / Math.max(1, m.sr * 0.17)))
      );
      return { ...m, reach: m.sr * orbit.outer };
    });
    const moon = measure(system.moonGroup, 0.62);
    renderer.render(scene, camera);
    listener?.({
      width: state.width,
      height: state.height,
      planets,
      moon: { x: moon.sx, y: moon.sy, r: moon.sr },
      vertical: view.phone,
    });
  };

  const loop = (now: number) => {
    state.frame = 0;
    if (state.disposed) return;
    const delta = Math.min(0.05, (now - (state.last || now)) / 1000);
    state.last = now;
    if (!document.hidden) step(delta);
    state.frame = requestAnimationFrame(loop);
  };
  state.frame = requestAnimationFrame(loop);

  return {
    canvas,
    fit(box: FitBox) {
      state.width = box.width;
      state.height = box.height;
      const ratio = Math.min(1.5, window.devicePixelRatio || 1);
      renderer.setPixelRatio(ratio);
      renderer.setSize(box.width, box.height, false);
      const top = fitView(camera, view, box);
      step(0);
      return { panelTop: top, phone: view.phone, land: view.land };
    },
    setActive(index: number) {
      state.active = index;
    },
    setLift(index: number) {
      state.lift = index;
    },
    setHold(hold: boolean) {
      state.hold = hold;
    },
    setReduced(reduced: boolean) {
      state.reduced = reduced;
    },
    nudge(amount: number) {
      state.velocity = amount;
      state.turn += amount;
    },
    redraw() {
      step(0);
    },
    onFrame(callback: (frame: OrbitFrame) => void) {
      listener = callback;
    },
    dispose() {
      state.disposed = true;
      cancelAnimationFrame(state.frame);
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();
        const material = mesh.material as THREE.Material | undefined;
        material?.dispose?.();
      });
      renderer.dispose();
      canvas.remove();
    },
  };
}

export type OrbitStage = ReturnType<typeof createOrbitStage>;
