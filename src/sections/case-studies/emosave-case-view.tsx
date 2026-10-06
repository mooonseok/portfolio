import { CaseStudyTemplate } from '@/components/templates/case-study-template/case-study-template';
import { CaseSectionView } from './components/case-section-view';
import { WorkRowsView } from './components/work-rows-view';
import { ParagraphsView } from './components/paragraphs-view';
import { Box } from '@/components/atoms/box';
import { TechNotes } from '@/components/organisms/tech-notes';
import { CASE_DEPTH, CASE_LAYOUT, TECH_COLS } from '@/constants/case';
import { FocusCardView } from './components/focus-card-view';
import { StateComparisonView } from './components/state-comparison-view';
import type { EmosaveCaseViewProps } from '@/dto/case-view.dto';
import { SIZE } from '@/constants/size';

export function EmosaveCaseView({
  p,
  groups,
  lead,
  rest,
}: EmosaveCaseViewProps) {
  const c = p.case;
  return (
    <CaseStudyTemplate project={p} titleSize={SIZE.SM}>
      <CaseSectionView
        group={groups.work}
        depth={CASE_DEPTH.L1}
        title='담당 기능'
      >
        <WorkRowsView items={c.work} />
      </CaseSectionView>
      <CaseSectionView
        group={groups.interaction}
        depth={CASE_DEPTH.L2}
        title='편집 상태를 화면에 반영'
        layout={CASE_LAYOUT.WIDE}
      >
        {lead ? (
          <FocusCardView focus={lead} className='work-sheet max-w-[600px]' />
        ) : null}
        {c.stateExample ? (
          <StateComparisonView example={c.stateExample} />
        ) : null}
        <Box className='mt-8 grid grid-cols-1 gap-8 tab:grid-cols-2'>
          {rest.map((focus) => (
            <FocusCardView key={focus.title} focus={focus} />
          ))}
        </Box>
      </CaseSectionView>
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
