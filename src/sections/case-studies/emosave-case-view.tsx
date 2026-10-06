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
          <FocusCardView
            focus={lead}
            visual={p.visuals[lead.visual]}
            className='max-w-[600px] tab:grid tab:grid-cols-2 tab:items-start tab:[&>div:first-child]:row-span-2 tab:[&>div:last-child]:col-2 tab:[&>h3]:col-2 tab:[&>h3]:row-1'
          />
        ) : null}
        {c.stateExample ? (
          <StateComparisonView example={c.stateExample} />
        ) : null}
        <Box className='mt-8 grid grid-cols-1 gap-8 tab:grid-cols-2 [&_[data-reveal-item=visual]]:max-w-[320px]'>
          {rest.map((focus) => (
            <FocusCardView
              key={focus.title}
              focus={focus}
              visual={p.visuals[focus.visual]}
            />
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
