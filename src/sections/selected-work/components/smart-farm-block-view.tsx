import { ProjectSummaryView } from '@/components/organisms/project-summary-view';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { SmartFarmWorkBlock } from '@/dto/selected-work.dto';
import { TAG } from '@/constants/tag';

export function SmartFarmBlockView({ project, href }: SmartFarmWorkBlock) {
  return (
    <ScrollScene
      as={TAG.ARTICLE}
      id={project.slug}
      steps={false}
      className='container py-14 tab:py-24 lap:py-30'
    >
      <ProjectSummaryView project={project} href={href} />
    </ScrollScene>
  );
}
