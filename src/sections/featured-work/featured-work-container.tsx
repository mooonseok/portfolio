import { FeaturedWorkView } from './featured-work-view';
import { requireProject } from '@/lib/content';
import { has } from '@/lib/has';
import { surfaceRows } from '@/lib/surfaces';
import type {
  EmosaveBlock,
  FeaturedBlock,
  IndianBobBlock,
} from '@/dto/featured-work.dto';
import type { Project } from '@/dto/project.dto';
import { PROJECT_SLUG } from '@/constants/project';

function toBlock(project: Project): FeaturedBlock {
  return {
    project,
    href: `/work/${project.slug}`,
    meta: [project.period, project.surfaces.toUpperCase()],
  };
}

function toIndianBob(project: Project): IndianBobBlock {
  const surfaces = project.case.roleSurfaces ?? [];
  const relation = project.case.surfaceRelation;
  const rows = surfaceRows(project);
  return {
    ...toBlock(project),
    surfaces,
    relationLabel: relation?.label ?? '',
    rows,
    hasSurfaces: has(surfaces),
    hasRelation: has(rows),
  };
}

function toEmosave(project: Project): EmosaveBlock {
  const example = project.case.stateExample;
  return {
    ...toBlock(project),
    example,
    hasStates: has(example?.states ?? []),
  };
}

export function FeaturedWorkContainer() {
  return (
    <FeaturedWorkView
      indianBob={toIndianBob(requireProject(PROJECT_SLUG.INDIAN_BOB))}
      emosave={toEmosave(requireProject(PROJECT_SLUG.EMOSAVE))}
    />
  );
}
