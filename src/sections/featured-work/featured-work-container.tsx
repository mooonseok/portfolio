import { FeaturedWorkView } from './featured-work-view';
import { requireProject } from '@/lib/content';
import type { Project } from '@/dto/project.dto';
import { PROJECT_SLUG } from '@/constants/project';

const toBlock = (project: Project) => ({
  project,
  href: `/work/${project.slug}`,
});

export function FeaturedWorkContainer() {
  return (
    <FeaturedWorkView
      indianBob={toBlock(requireProject(PROJECT_SLUG.INDIAN_BOB))}
      emosave={toBlock(requireProject(PROJECT_SLUG.EMOSAVE))}
    />
  );
}
