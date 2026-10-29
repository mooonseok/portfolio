import { ORBIT } from '@/constants/orbit';

const ORBITS = [
  [150, 56, -2.4],
  [260, 96, 0.35],
  [370, 137, 1.95],
  [480, 178, -0.9],
];

export const tall = () => window.matchMedia(ORBIT.TALL).matches;

export const squash = () => (tall() ? 1.8 : 1);

export function around(block: Element, index: number, angle: number) {
  const r = block.getBoundingClientRect();
  const cx = r.left + r.width / 2 - window.innerWidth / 2;
  const cy = r.top + r.height / 2 - window.innerHeight / 2;
  const rx = Math.min(window.innerWidth / 2 - 30, r.width * 0.7 + 44);
  const ry = Math.min(window.innerHeight / 2 - 30, r.height * 0.56 + 40);
  const t = angle + (index * Math.PI * 2) / 3;
  return { x: cx + Math.cos(t) * rx, y: cy + Math.sin(t) * ry };
}

export function landing(end: Element, index: number) {
  const r = end.getBoundingClientRect();
  const k = r.width / 1100;
  const [rx, ry, t] = ORBITS[index];
  return {
    x: r.left + r.width / 2 - window.innerWidth / 2 + Math.cos(t) * rx * k,
    y:
      r.top +
      r.height / 2 -
      window.innerHeight / 2 +
      Math.sin(t) * ry * squash() * k,
  };
}

export function offscreen(element: Element) {
  return -(element.getBoundingClientRect().bottom + 24);
}

export function wipeTravel() {
  return (
    170 +
    ((Math.tan((14 * Math.PI) / 180) * window.innerHeight * 0.7) /
      window.innerWidth) *
      100
  );
}
