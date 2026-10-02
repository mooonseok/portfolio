import { SelectedWorkView } from './selected-work-view';
import { requireProject } from '@/lib/content';
import type { Project } from '@/dto/project.dto';
import { SELECTED_SLUGS } from '@/constants/selected-work';

const toBlock = (project: Project) => ({
  project,
  href: `/work/${project.slug}`,
});
const toEntry = (project: Project) => ({
  slug: project.slug,
  href: `#${project.slug}`,
  num: project.num,
  title: project.title,
});

export function SelectedWorkContainer() {
  const [farmfam, apc, smartFarm] = SELECTED_SLUGS.map(requireProject);
  return (
    <SelectedWorkView
      index={[farmfam, apc].map(toEntry)}
      farmfam={toBlock(farmfam)}
      apc={toBlock(apc)}
      smartFarm={toBlock(smartFarm)}
    />
  );
}
