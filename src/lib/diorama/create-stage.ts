import * as THREE from 'three';
import type {
  DioramaStage,
  DioramaStageOptions,
} from '@/dto/diorama-stage.dto';
import { createModel, disposeModel } from './create-model';

export function createStage(
  host: HTMLDivElement,
  options: DioramaStageOptions
): DioramaStage {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const scene = new THREE.Scene();
  const { group, ring } = createModel();
  scene.add(group, new THREE.HemisphereLight(0xffffff, 0xb6b8b0, 2.2));
  const light = new THREE.DirectionalLight(0xffffff, 2.4);
  light.position.set(-3, 7, 5);
  scene.add(light);
  const camera = new THREE.OrthographicCamera(-4, 4, 3, -3, 0.1, 50);
  camera.position.set(5.5, 5, 7);
  camera.lookAt(0, 0.7, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.style.cssText = 'width:100%;height:100%;display:block';
  canvas.setAttribute('aria-hidden', 'true');
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let disposed = false;
  let selected = false;
  let reduced = options.reducedMotion;
  let frame = 0;
  let last = 0;
  let progress = 0;
  const render = (now: number) => {
    frame = 0;
    if (disposed || document.hidden) return;
    const delta = Math.min((now - (last || now - 16)) / 1000, 0.05);
    last = now;
    const target = selected ? 1 : 0;
    progress = reduced
      ? target
      : THREE.MathUtils.lerp(progress, target, 1 - Math.exp(-14 * delta));
    if (Math.abs(progress - target) < 0.001) progress = target;
    group.position.y = progress * 0.16;
    ring.material.opacity = progress;
    ring.visible = progress > 0;
    try {
      renderer.render(scene, camera);
    } catch {
      fail();
      return;
    }
    if (progress !== target) wake();
  };
  const wake = () => {
    if (!disposed && !document.hidden && !frame)
      frame = requestAnimationFrame(render);
  };
  const resize = () => {
    if (disposed) return;
    const { width, height } = host.getBoundingClientRect();
    if (width <= 0 || height <= 0) return;
    const aspect = width / height;
    const halfHeight = Math.max(2.5, 3.45 / aspect);
    camera.left = -halfHeight * aspect;
    camera.right = halfHeight * aspect;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    wake();
  };
  const intersects = (event: PointerEvent | MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    );
    scene.updateMatrixWorld(true);
    camera.updateMatrixWorld(true);
    raycaster.setFromCamera(pointer, camera);
    return raycaster
      .intersectObjects(group.children, true)
      .some((hit) => hit.object instanceof THREE.Mesh && hit.object !== ring);
  };
  const click = (event: MouseEvent) => {
    if (!disposed && intersects(event)) options.onSelect();
  };
  const move = (event: PointerEvent) => {
    canvas.style.cursor = intersects(event) ? 'pointer' : 'default';
  };
  const visibility = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
    wake();
  };
  let observer: ResizeObserver | undefined;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    observer?.disconnect();
    document.removeEventListener('visibilitychange', visibility);
    canvas.removeEventListener('click', click);
    canvas.removeEventListener('pointermove', move);
    canvas.removeEventListener('webglcontextlost', lost);
    try {
      disposeModel(scene);
      renderer.dispose();
    } finally {
      try {
        renderer.forceContextLoss();
      } finally {
        canvas.remove();
      }
    }
  };
  const fail = () => {
    try {
      dispose();
    } finally {
      options.onError();
    }
  };
  const lost = (event: Event) => {
    event.preventDefault();
    fail();
  };
  try {
    host.appendChild(canvas);
    observer = new ResizeObserver(() => {
      try {
        resize();
      } catch {
        fail();
      }
    });
    canvas.addEventListener('click', click);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('webglcontextlost', lost);
    document.addEventListener('visibilitychange', visibility);
    observer.observe(host);
    resize();
  } catch (error) {
    dispose();
    throw error;
  }
  return {
    setSelected(value, immediate = false) {
      if (disposed) return;
      selected = value;
      if (immediate || reduced) progress = selected ? 1 : 0;
      last = 0;
      wake();
    },
    setReducedMotion(value) {
      reduced = value;
      if (reduced) progress = selected ? 1 : 0;
      wake();
    },
    dispose,
  };
}
