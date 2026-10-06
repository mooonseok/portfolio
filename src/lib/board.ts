import { FLOORS, FLOOR_LABEL } from '@/constants/floor';
import { STATUS_KIND } from '@/constants/status';
import type { BoardBox, BoardColumn } from '@/dto/board.dto';
import type { Project } from '@/dto/project.dto';
import { markerLine, markerLoop, markerRect, seedOf } from '@/lib/marker';

const startYear = (p: Project) => Number(p.period.match(/\d{4}/)?.[0] ?? 0);

function boxes(p: Project): BoardBox[] {
  const list = FLOORS.map((floor, i) => {
    const layer = p.layers.find((l) => l.floor === floor);
    return {
      floor,
      label: FLOOR_LABEL[floor],
      lit: !!layer,
      kind: layer ? (layer.kind ?? STATUS_KIND.PRODUCT) : undefined,
      experiment: layer?.kind === STATUS_KIND.EXPERIMENT,
      tech: layer?.tech,
      summary: layer?.summary ?? '',
      lines: layer?.lines ?? [],
      path: markerRect(seedOf(p.slug + floor) + i),
    };
  });
  return list.map((b, i) => ({
    ...b,
    joinNext:
      b.lit && list[i + 1]?.lit
        ? markerLine(seedOf(p.slug) + i * 13)
        : undefined,
  }));
}

const experimental = (p: Project) =>
  p.status.every((s) => s.kind === STATUS_KIND.EXPERIMENT);

export const boardColumn = (p: Project): BoardColumn => ({
  slug: p.slug,
  title: p.title,
  service: p.boardService,
  href: `/work/${p.slug}`,
  period: p.period,
  kind: experimental(p) ? STATUS_KIND.EXPERIMENT : STATUS_KIND.PRODUCT,
  statusLabel: experimental(p) ? 'EXPERIMENT' : 'PRODUCT WORK',
  boxes: boxes(p),
  loop: markerLoop(seedOf(p.title)),
});

export const boardColumns = (projects: Project[]) =>
  [...projects].sort((a, b) => startYear(a) - startYear(b)).map(boardColumn);

export const boardFloors = () =>
  FLOORS.map((floor) => ({ floor, label: FLOOR_LABEL[floor] }));
