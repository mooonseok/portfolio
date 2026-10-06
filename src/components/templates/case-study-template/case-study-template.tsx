import { CaseStudyTemplateView } from './case-study-template-view';
import { caseMetaRows } from './case-meta';
import { site } from '@/content/site';
import { getNext, groupsFor } from '@/lib/content';
import { has } from '@/lib/has';
import { boardColumn } from '@/lib/board';
import { BoardDetailView } from '@/components/organisms/whiteboard/board-detail-view';
import type { CaseStudyTemplateProps } from '@/dto/case-template.dto';
import { SURFACE_LABEL } from '@/constants/case';
import { PROJECT_TIER } from '@/constants/project';
import { SIZE } from '@/constants/size';
import { TONE } from '@/constants/tone';

export function CaseStudyTemplate({
  project,
  darkHeader,
  children,
  titleSize = SIZE.LG,
  surfaceLabel = SURFACE_LABEL.SURFACES,
  role,
}: CaseStudyTemplateProps) {
  const next = getNext(project.slug);
  return (
    <CaseStudyTemplateView
      project={project}
      hero={<BoardDetailView column={boardColumn(project)} copy={site.board} />}
      darkHeader={darkHeader}
      titleSize={titleSize}
      titleTone={
        project.tier === PROJECT_TIER.SELECTED ? TONE.SIGNAL : TONE.INK
      }
      showSummary={has(project.summary)}
      meta={caseMetaRows(project, surfaceLabel, role)}
      groups={groupsFor(project)}
      next={{ href: `/work/${next.slug}`, title: next.title, num: next.num }}
    >
      {children}
    </CaseStudyTemplateView>
  );
}
