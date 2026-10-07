import * as THREE from 'three';
import { EDITOR } from '@/constants/emosave-editor';
import type { EditorSession, EditorStage } from '@/dto/emosave-editor.dto';
import { disposeModel } from '@/lib/diorama/create-model';
import { createEditorModel } from './create-model';
import { bindEditorInput } from './bind-input';

export function createEditorStage(
  host: HTMLDivElement,
  session: EditorSession,
  onError: () => void
): EditorStage {
  const { scene, house, ring } = createEditorModel();
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (error) {
    disposeModel(scene);
    throw error;
  }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.style.cssText =
    'width:100%;height:100%;display:block;touch-action:pan-y pinch-zoom';
  canvas.setAttribute('aria-hidden', 'true');
  const camera = new THREE.OrthographicCamera(-4, 4, 4, -4, 0.1, 50);
  camera.position.set(0, 7, 9);
  camera.lookAt(0, 0, 0);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  let frame = 0;
  let disposed = false;
  let observer: ResizeObserver | undefined;
  let input: ReturnType<typeof bindEditorInput> | undefined;
  const render = () => {
    frame = 0;
    if (disposed || document.hidden) return;
    try {
      renderer.render(scene, camera);
    } catch {
      fail();
    }
  };
  const wake = () => {
    if (!disposed && !frame && !document.hidden)
      frame = requestAnimationFrame(render);
  };
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (disposed || width <= 0 || height <= 0) return;
    input?.cancel();
    const aspect = width / height;
    const half = Math.max(2.65, 3.05 / aspect);
    camera.left = -half * aspect;
    camera.right = half * aspect;
    camera.top = half;
    camera.bottom = -half;
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    wake();
  };
  const visibility = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    wake();
  };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    input?.dispose();
    cancelAnimationFrame(frame);
    observer?.disconnect();
    document.removeEventListener('visibilitychange', visibility);
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
    dispose();
    onError();
  };
  const lost = (event: Event) => {
    event.preventDefault();
    fail();
  };
  try {
    host.appendChild(canvas);
    input = bindEditorInput(canvas, session, (event) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      scene.updateMatrixWorld(true);
      raycaster.setFromCamera(pointer, camera);
      const point = raycaster.ray.intersectPlane(plane, new THREE.Vector3());
      if (!point) return null;
      const inside =
        Math.abs(pointer.x) <= 1 &&
        Math.abs(pointer.y) <= 1 &&
        Math.abs(point.x) <= EDITOR.HALF_GROUND &&
        Math.abs(point.z) <= EDITOR.HALF_GROUND;
      const item = raycaster
        .intersectObject(house, true)
        .some((hit) => hit.object instanceof THREE.Mesh);
      return { point: { x: point.x, z: point.z }, item, inside };
    });
    canvas.addEventListener('webglcontextlost', lost);
    document.addEventListener('visibilitychange', visibility);
    observer = new ResizeObserver(() => {
      try {
        resize();
      } catch {
        fail();
      }
    });
    observer.observe(host);
    resize();
  } catch (error) {
    dispose();
    throw error;
  }
  return {
    paint(value) {
      if (disposed) return;
      house.position.set(value.x, 0, value.z);
      house.rotation.y = Math.PI / 4 + (value.turn * Math.PI) / 2;
      ring.position.set(value.x, 0.008, value.z);
      ring.visible = value.selected;
      wake();
    },
    cancel: () => input?.cancel(),
    dispose,
  };
}
