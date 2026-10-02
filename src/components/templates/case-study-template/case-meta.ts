import { has } from '@/lib/has';
import type { CaseMetaRow } from '@/dto/case-template.dto';
import type { Project } from '@/dto/project.dto';
import type { SurfaceLabel } from '@/constants/case';

export function caseMetaRows(
  project: Project,
  _surfaceLabel: SurfaceLabel,
  role?: string
): CaseMetaRow[] {
  const rows: CaseMetaRow[] = [];
  if (role && has(role)) rows.push({ key: 'ROLE', value: role });
  if (has(project.surfaces))
    rows.push({ key: '개발 영역', value: project.surfaces, wide: true });
  if (has(project.period))
    rows.push({ key: '참여 기간', value: project.period });
  const narrow = rows.filter((r) => !r.wide);
  if (narrow.length % 2) narrow[narrow.length - 1].span = true;
  return rows;
}
