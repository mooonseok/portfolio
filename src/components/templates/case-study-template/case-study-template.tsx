import { CaseStudyTemplateView } from './case-study-template-view';
import { caseMetaRows } from './case-meta';
import { site } from '@/content/site';
import { getNext, groupsFor } from '@/lib/content';
import { has } from '@/lib/has';
import { ProjectScopeListView } from '@/components/organisms/project-scope-list-view';
import type { CaseStudyTemplateProps } from '@/dto/case-template.dto';
import { SURFACE_LABEL } from '@/constants/case';
import { PROJECT_TIER } from '@/constants/project';
import { TONE } from '@/constants/tone';

export function CaseStudyTemplate({
  project,
  darkHeader,
  children,
  surfaceLabel = SURFACE_LABEL.SURFACES,
  role,
}: CaseStudyTemplateProps) {
  const next = getNext(project.slug);
  return (
    <CaseStudyTemplateView
      project={project}
      hero={
        <ProjectScopeListView
          layers={project.layers}
          label={`${project.title} ${site.board.label}`}
          experimentLabel={site.board.experiment}
        />
      }
      darkHeader={darkHeader}
      titleTone={
        project.tier === PROJECT_TIER.SELECTED ? TONE.SIGNAL : TONE.INK
      }
      showSummary={has(project.summary)}
      meta={caseMetaRows(project, surfaceLabel, role)}
      groups={groupsFor(project)}
      next={{ href: `/work/${next.slug}`, title: next.title }}
    >
      {children}
    </CaseStudyTemplateView>
  );
}
