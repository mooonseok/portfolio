import { CaseStudyTemplate } from '@/components/templates/case-study-template/case-study-template';
import { CaseSectionView } from './components/case-section-view';
import { WorkRowsView } from './components/work-rows-view';
import { ParagraphsView } from './components/paragraphs-view';
import { TechNotes } from '@/components/organisms/tech-notes';
import { CASE_DEPTH, CASE_LAYOUT, TECH_COLS } from '@/constants/case';
import { HabitExplorer } from './components/habit-explorer';
import type { IndianBobCaseViewProps } from '@/dto/case-view.dto';

export function IndianBobCaseView({ p, groups }: IndianBobCaseViewProps) {
  const c = p.case;
  return (
    <CaseStudyTemplate project={p}>
      <CaseSectionView
        group={groups.work}
        depth={CASE_DEPTH.L1}
        title='담당 기능'
      >
        <WorkRowsView items={c.work} />
      </CaseSectionView>
      {c.feature ? (
        <CaseSectionView
          group={groups.system}
          depth={CASE_DEPTH.L2}
          title={c.feature.title}
          titleId='habit'
          layout={CASE_LAYOUT.WIDE}
        >
          <HabitExplorer feature={c.feature} labelId='habit' />
        </CaseSectionView>
      ) : null}
      <CaseSectionView
        group={groups.engineering}
        depth={CASE_DEPTH.L2}
        title='대표 구현 사례'
        layout={CASE_LAYOUT.WIDE}
      >
        <TechNotes notes={c.techNotes} cols={TECH_COLS.TWO} />
      </CaseSectionView>
      <CaseSectionView
        group={groups.currentState}
        depth={CASE_DEPTH.L3}
        title='배운 점'
      >
        <ParagraphsView list={c.currentState} />
      </CaseSectionView>
    </CaseStudyTemplate>
  );
}
