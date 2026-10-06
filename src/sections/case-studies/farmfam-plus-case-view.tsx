import { CaseStudyTemplate } from '@/components/templates/case-study-template/case-study-template';
import { CaseSectionView } from './components/case-section-view';
import { WorkRowsView } from './components/work-rows-view';
import { ParagraphsView } from './components/paragraphs-view';
import { Box } from '@/components/atoms/box';
import { TechNotes } from '@/components/organisms/tech-notes';
import { CASE_DEPTH, CASE_LAYOUT, TECH_COLS } from '@/constants/case';
import { RelationMap } from './components/relation-map';
import { SalesPathsView } from './components/sales-paths-view';
import { Heading } from '@/components/atoms/heading';
import type { FarmFamPlusCaseViewProps } from '@/dto/case-view.dto';
import { HEADING } from '@/constants/tag';

export function FarmFamPlusCaseView({
  p,
  groups,
  relation,
}: FarmFamPlusCaseViewProps) {
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
      <CaseSectionView
        group={groups.system}
        depth={CASE_DEPTH.L2}
        title='판매 방식과 주문의 연결'
        layout={CASE_LAYOUT.WIDE}
      >
        <SalesPathsView items={c.connections ?? []} />
      </CaseSectionView>
      <CaseSectionView
        group={groups.engineering}
        depth={CASE_DEPTH.L2}
        title='대표 구현 사례'
        layout={CASE_LAYOUT.WIDE}
      >
        <TechNotes notes={c.techNotes.slice(0, 1)} cols={TECH_COLS.TWO} />
        {relation ? (
          <Box className='mt-10 flex flex-col gap-6 tab:mt-14'>
            <Heading
              level={HEADING.H3}
              id={relation.map.titleId}
              className='text-d3 font-medium'
            >
              {relation.title}
            </Heading>
            <RelationMap {...relation.map} />
          </Box>
        ) : null}
        <TechNotes notes={c.techNotes.slice(1)} cols={TECH_COLS.TWO} />
      </CaseSectionView>
      {c.currentState.length ? (
        <CaseSectionView
          group={groups.currentState}
          depth={CASE_DEPTH.L3}
          title='결과'
        >
          <ParagraphsView list={c.currentState} />
        </CaseSectionView>
      ) : null}
    </CaseStudyTemplate>
  );
}
