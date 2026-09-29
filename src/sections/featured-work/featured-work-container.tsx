import { FeaturedWorkView } from './featured-work-view';
import { requireProject } from '@/lib/content';
import { has } from '@/lib/has';
import type {
  EmosaveBlock,
  FeaturedBlock,
  IndianBobBlock,
} from '@/dto/featured-work.dto';
import type { Project } from '@/dto/project.dto';
import type { SurfaceRow } from '@/dto/surface.dto';
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
  const sub = (label: string) => surfaces.find((x) => x.label === label)?.sub;
  const rows: SurfaceRow[] = [
    { label: 'USER' },
    { label: 'APP', wide: 'MOBILE APP', sub: sub('APP') },
    {
      label: 'API',
      sub: sub('API'),
      branch: { label: 'ADMIN', sub: sub('ADMIN') },
    },
    { label: 'DATA' },
  ];
  return {
    ...toBlock(project),
    surfaces,
    rows,
    hasSurfaces: surfaces.length > 0,
  };
}

function toEmosave(project: Project): EmosaveBlock {
  const states = project.case.stateFlow ?? [];
  return { ...toBlock(project), states, hasStates: has(states) };
}

export function FeaturedWorkContainer() {
  return (
    <FeaturedWorkView
      indianBob={toIndianBob(requireProject(PROJECT_SLUG.INDIAN_BOB))}
      emosave={toEmosave(requireProject(PROJECT_SLUG.EMOSAVE))}
    />
  );
}
