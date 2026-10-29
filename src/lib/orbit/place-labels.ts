export type Rect = [number, number, number, number];

export interface LabelInput {
  sx: number;
  sy: number;
  reach: number;
  depth: number;
  width: number;
  height: number;
  active: boolean;
  previous: number | null;
}

export interface LabelSpot {
  x: number;
  y: number;
  candidate: number;
  clash: boolean;
}

export interface LabelScene {
  width: number;
  height: number;
  vertical: boolean;
  moon: { x: number; y: number; r: number };
  blocks: Rect[];
  margin: number;
}

export const overlaps = (a: Rect, b: Rect) =>
  a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1];

const disc = (x: number, y: number, r: number): Rect => [
  x - r,
  y - r,
  x + r,
  y + r,
];

function candidates(item: LabelInput, scene: LabelScene, gap: number) {
  const { sx, sy, width: w, height: h } = item;
  const dx0 = sx - scene.moon.x;
  const dy0 = sy - scene.moon.y;
  const len = Math.hypot(dx0, dy0) || 1;
  const dx = dx0 / len;
  const dy = dy0 / len;
  const away: [number, number] =
    scene.vertical || Math.abs(dy) > Math.abs(dx) * 1.2
      ? [sx - w / 2 + dx * gap * 0.4, dy >= 0 ? sy + gap : sy - gap - h]
      : [dx >= 0 ? sx + gap : sx - gap - w, sy - h / 2 + dy * gap * 0.5];
  const d = gap * 0.72;
  const list: [number, number][] = [
    away,
    [sx - w / 2, sy + gap],
    [sx - w / 2, sy - gap - h],
    [sx + gap, sy - h / 2],
    [sx - gap - w, sy - h / 2],
    [sx + d, sy + d],
    [sx - d - w, sy + d],
    [sx + d, sy - d - h],
    [sx - d - w, sy - d - h],
  ];
  return list;
}

export function placeLabels(
  items: LabelInput[],
  scene: LabelScene
): LabelSpot[] {
  const discs = items.map((item) => disc(item.sx, item.sy, item.reach + 2));
  const fixed = [
    ...scene.blocks,
    disc(scene.moon.x, scene.moon.y, scene.moon.r + 6),
  ];
  const placed: Rect[] = [];
  const order = items
    .map((item, index) => index)
    .sort(
      (a, b) =>
        Number(items[b].active) - Number(items[a].active) ||
        items[b].depth - items[a].depth
    );
  const spots: LabelSpot[] = new Array(items.length);
  for (const index of order) {
    const item = items[index];
    const list = candidates(item, scene, item.reach + (item.active ? 10 : 6));
    const fits = ([x, y]: [number, number]) => {
      const box: Rect = [x, y, x + item.width, y + item.height];
      return (
        x >= scene.margin &&
        y >= scene.margin &&
        box[2] <= scene.width - scene.margin &&
        box[3] <= scene.height - scene.margin &&
        !fixed.some((rect) => overlaps(box, rect)) &&
        !discs.some((rect, k) => k !== index && overlaps(box, rect)) &&
        !placed.some((rect) => overlaps(box, rect))
      );
    };
    const kept =
      item.previous !== null && fits(list[item.previous])
        ? item.previous
        : list.findIndex(fits);
    const clash = kept < 0;
    const candidate = clash ? (item.previous ?? 0) : kept;
    const [rawX, rawY] = list[candidate];
    const x = Math.min(
      Math.max(scene.margin, rawX),
      scene.width - item.width - scene.margin
    );
    const y = Math.min(
      Math.max(scene.margin, rawY),
      scene.height - item.height - scene.margin
    );
    if (!clash) placed.push([x, y, x + item.width, y + item.height]);
    spots[index] = { x, y, candidate, clash: clash && !item.active };
  }
  return spots;
}
