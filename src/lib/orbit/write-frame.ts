import type { OrbitFrame } from './create-orbit-stage';
import { placeLabels, type Rect } from './place-labels';

export interface LabelMemory {
  candidate: number | null;
  from: [number, number] | null;
  offset: [number, number];
  k: number;
  width: number;
  height: number;
}

export interface FrameTargets {
  root: HTMLElement;
  labels: (HTMLElement | null)[];
  names: (HTMLElement | null)[];
  blocks: (Element | null)[];
  ticks: SVGPathElement | null;
  reticle: SVGPathElement | null;
}

export const createMemory = (): LabelMemory => ({
  candidate: null,
  from: null,
  offset: [0, 0],
  k: 1,
  width: 0,
  height: 0,
});

const ease = (k: number) => 1 - Math.pow(1 - k, 3);
const fixed = (value: number) => value.toFixed(1);

function blockRects(targets: FrameTargets): Rect[] {
  const base = targets.root.getBoundingClientRect();
  return targets.blocks.flatMap((element) => {
    if (!element) return [];
    const rect = element.getBoundingClientRect();
    if (!rect.width) return [];
    return [
      [
        rect.left - base.left - 8,
        rect.top - base.top - 8,
        rect.right - base.left + 8,
        rect.bottom - base.top + 8,
      ] as Rect,
    ];
  });
}

export function writeFrame(
  frame: OrbitFrame,
  targets: FrameTargets,
  memory: LabelMemory[],
  active: number,
  delta: number,
  reduced: boolean
) {
  frame.planets.forEach((_, i) => {
    const name = targets.names[i];
    if (name && !memory[i].width) {
      memory[i].width = name.offsetWidth;
      memory[i].height = name.offsetHeight;
    }
  });
  const spots = placeLabels(
    frame.planets.map((planet, i) => ({
      sx: planet.sx,
      sy: planet.sy,
      reach: planet.reach,
      depth: planet.depth,
      width: memory[i].width,
      height: memory[i].height,
      active: i === active,
      previous: memory[i].candidate,
    })),
    {
      width: frame.width,
      height: frame.height,
      vertical: frame.vertical,
      moon: frame.moon,
      blocks: blockRects(targets),
      margin: 8,
    }
  );
  let ticks = '';
  frame.planets.forEach((planet, i) => {
    const spot = spots[i];
    const mem = memory[i];
    const target: [number, number] = [spot.x - planet.sx, spot.y - planet.sy];
    if (spot.candidate !== mem.candidate) {
      mem.from = mem.candidate === null || reduced ? null : [...mem.offset];
      mem.candidate = spot.candidate;
      mem.k = 0;
    }
    mem.k = Math.min(1, mem.k + delta / 0.24);
    const e = mem.from ? ease(mem.k) : 1;
    const from = mem.from ?? target;
    mem.offset = [
      from[0] + (target[0] - from[0]) * e,
      from[1] + (target[1] - from[1]) * e,
    ];
    const label = targets.labels[i];
    if (label) {
      label.style.transform = `translate(${fixed(planet.sx)}px, ${fixed(planet.sy)}px)`;
      label.style.setProperty(
        '--d',
        `${Math.round(Math.max(48, planet.reach * 2 + 8))}px`
      );
      label.toggleAttribute('data-dim', spot.clash);
    }
    const name = targets.names[i];
    if (name)
      name.style.transform = `translate(${fixed(mem.offset[0])}px, ${fixed(mem.offset[1])}px)`;
    if (i === active) return;
    const r1 = planet.reach + 4;
    for (let k = 0; k < 4; k += 1) {
      const a = Math.PI / 4 + (k * Math.PI) / 2;
      ticks += `M${fixed(planet.sx + Math.cos(a) * r1)} ${fixed(planet.sy + Math.sin(a) * r1)}L${fixed(planet.sx + Math.cos(a) * (r1 + 4))} ${fixed(planet.sy + Math.sin(a) * (r1 + 4))}`;
    }
  });
  targets.ticks?.setAttribute('d', ticks);
  const focus = frame.planets[active];
  if (!focus || !targets.reticle) return;
  const s = focus.reach + 10;
  const corners = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ];
  targets.reticle.setAttribute(
    'd',
    corners
      .map(
        ([x, y]) =>
          `M${fixed(focus.sx + x * s)} ${fixed(focus.sy + y * (s - 7))}L${fixed(focus.sx + x * s)} ${fixed(focus.sy + y * s)}L${fixed(focus.sx + x * (s - 7))} ${fixed(focus.sy + y * s)}`
      )
      .join('')
  );
}
