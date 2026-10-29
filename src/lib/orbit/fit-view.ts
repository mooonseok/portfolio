import * as THREE from 'three';
import { readMode, type FitBox } from './read-mode';

export const RADII = [1.75, 2.7, 3.65, 4.6];

export interface OrbitView {
  dist: number;
  elev: number;
  look: THREE.Vector3;
  phone: boolean;
  land: boolean;
}

export const createView = (): OrbitView => ({
  dist: 12,
  elev: 0.62,
  look: new THREE.Vector3(),
  phone: false,
  land: false,
});

export function placeCamera(
  camera: THREE.PerspectiveCamera,
  view: OrbitView,
  dist = view.dist,
  elev = view.elev
) {
  camera.position.set(
    view.look.x,
    view.look.y + Math.sin(elev) * dist,
    Math.cos(elev) * dist
  );
  camera.lookAt(view.look);
  camera.updateMatrixWorld();
}

const project = (camera: THREE.PerspectiveCamera, x: number, z: number) =>
  new THREE.Vector3(x, 0, z).project(camera);

function fitPhone(
  camera: THREE.PerspectiveCamera,
  view: OrbitView,
  box: FitBox,
  area: { left: number; top: number; width: number }
) {
  const { width: w, height: h } = box;
  const outer = RADII[RADII.length - 1] + 0.8;
  const room = h - Math.max(16, box.safeBottom + 16) - area.top;
  const unit = () => view.dist * 2 * Math.tan((camera.fov * Math.PI) / 360);
  const screenY = (z: number) => (-project(camera, 0, z).y * 0.5 + 0.5) * h;
  for (let pass = 0; pass < 8; pass += 1) {
    placeCamera(camera, view);
    let x0 = Infinity;
    let x1 = -Infinity;
    for (let k = 0; k < 36; k += 1) {
      const t = (k / 36) * Math.PI * 2;
      const x =
        (project(camera, Math.cos(t) * outer, Math.sin(t) * outer).x * 0.5 +
          0.5) *
        w;
      x0 = Math.min(x0, x);
      x1 = Math.max(x1, x);
    }
    const span = screenY(outer) - screenY(-outer);
    const need = 30 + span + 44 + box.panelHeight;
    const grow = Math.max((x1 - x0) / area.width, need / room);
    view.look.x +=
      (((x0 + x1) / 2 - (area.left + area.width / 2)) / w) *
      unit() *
      camera.aspect;
    const start = area.top + Math.max(0, (room - need) / 2);
    view.look.y +=
      (((start + 30 - screenY(-outer)) / h) * unit()) / Math.cos(view.elev);
    if (grow > 1.002) view.dist *= grow;
    else if (pass > 2) break;
  }
  placeCamera(camera, view);
  return screenY(outer) + 44;
}

export function fitView(
  camera: THREE.PerspectiveCamera,
  view: OrbitView,
  box: FitBox
): number | null {
  const { width: w, height: h } = box;
  Object.assign(view, readMode(box));
  camera.aspect = w / h;
  camera.fov = view.phone ? 40 : 34;
  camera.updateProjectionMatrix();
  const outer = RADII[RADII.length - 1] + (view.phone ? 0.8 : 0.42);
  const vt = 2 * Math.tan((camera.fov * Math.PI) / 360);
  const wide = w >= 1280;
  const [left, right, top, bottom] = view.phone
    ? [20, 20, 112, box.panelHeight + 56]
    : view.land
      ? [150, w - box.panelLeft + 70, 70, 40]
      : [wide ? 104 : 72, w - box.panelLeft + (wide ? 72 : 56), 80, 92];
  const availW = Math.max(160, w - left - right);
  const availH = Math.max(140, h - top - bottom);
  const ratio = availH / availW / 1.12;
  view.elev = Math.asin(
    Math.min(view.phone ? 0.9 : 0.86, Math.max(view.phone ? 0.68 : 0.5, ratio))
  );
  view.dist = Math.max(
    (2 * outer) / (vt * camera.aspect * (availW / w)),
    (2 * outer * Math.sin(view.elev) * 1.12) / (vt * (availH / h))
  );
  view.look.set(
    (0.5 - (left + availW / 2) / w) * view.dist * vt * camera.aspect,
    ((top + availH / 2) / h - 0.5) * view.dist * vt,
    0
  );
  if (!view.phone) {
    placeCamera(camera, view);
    return null;
  }
  return fitPhone(camera, view, box, { left, top, width: availW });
}
