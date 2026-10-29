export interface FitBox {
  width: number;
  height: number;
  viewportWidth: number;
  viewportHeight: number;
  panelLeft: number;
  panelHeight: number;
  safeBottom: number;
}

export function readMode(box: FitBox) {
  const land =
    box.viewportHeight < 520 && box.viewportWidth > box.viewportHeight;
  const phone =
    (box.width < 744 || (box.width < 1024 && box.height > box.width)) && !land;
  return { phone, land };
}
