import { has } from '@/lib/has';
import type { CaseMetaRow } from '@/dto/case-template.dto';
import type { Project } from '@/dto/project.dto';
import type { SurfaceLabel } from '@/constants/case';
import { STATUS_KIND } from '@/constants/status';

const statusText = (label: string) =>
  label.charAt(0) + label.slice(1).toLowerCase();

export function caseMetaRows(
  project: Project,
  surfaceLabel: SurfaceLabel,
  role?: string
): CaseMetaRow[] {
  const rows: CaseMetaRow[] = [];
  if (role && has(role)) rows.push({ key: 'ROLE', value: role });
  if (project.status.some((st) => st.kind === STATUS_KIND.EXPERIMENT)) {
    project.status.forEach((st) =>
      rows.push({
        key: st.kind === STATUS_KIND.PRODUCT ? 'PRODUCT WORK' : 'EXPERIMENT',
        value: statusText(st.label),
        status: st.kind,
      })
    );
  } else if (has(project.surfaces)) {
    rows.push({ key: surfaceLabel, value: project.surfaces, wide: true });
  }
  if (has(project.period)) rows.push({ key: 'PERIOD', value: project.period });
  const narrow = rows.filter((r) => !r.wide);
  if (narrow.length % 2) narrow[narrow.length - 1].span = true;
  return rows;
}
