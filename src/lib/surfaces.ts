import type { Project } from '@/dto/project.dto';
import type { SurfaceRow } from '@/dto/surface.dto';

export function surfaceRows(p: Project): SurfaceRow[] {
  const surfaces = p.case.roleSurfaces ?? [];
  const sub = (label: string) => surfaces.find((x) => x.label === label)?.sub;
  return (p.case.surfaceRelation?.rows ?? []).map((r) => ({
    ...r,
    sub: sub(r.label),
    branch: r.branch ? { ...r.branch, sub: sub(r.branch.label) } : undefined,
  }));
}
