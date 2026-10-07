import { CaseStudyTemplate } from '@/components/templates/case-study-template/case-study-template';
import { CaseSectionView } from './components/case-section-view';
import { ParagraphsView } from './components/paragraphs-view';
import { WorkRowsView } from './components/work-rows-view';
import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { DomainExplorer } from '@/components/organisms/domain-explorer/domain-explorer';
import { ExperimentBlock } from '@/components/organisms/experiment-block';
import { TechNotes } from '@/components/organisms/tech-notes';
import { VisualsNote } from '@/components/organisms/visuals-note';
import type { ApcCaseViewProps } from '@/dto/case-view.dto';
import { CASE_DEPTH, CASE_LAYOUT, TECH_COLS } from '@/constants/case';

export function ApcCaseView({
  p,
  groups,
  domains,
  showDomains,
  showWork,
  showTech,
  showCurrent,
  experimentGroup,
  experimentRail,
}: ApcCaseViewProps) {
  const c = p.case;
  return (
    <CaseStudyTemplate project={p}>
      {showWork ? (
        <CaseSectionView
          group={groups.work}
          depth={CASE_DEPTH.L3}
          title='담당 기능'
        >
          <WorkRowsView items={c.work} />
        </CaseSectionView>
      ) : null}
      {showDomains ? (
        <CaseSectionView
          group={groups.system}
          depth={CASE_DEPTH.L2}
          title={c.domainsTitle}
          layout={CASE_LAYOUT.WIDE}
          loose
        >
          <Box>
            <DomainExplorer {...domains} />
            <VisualsNote />
          </Box>
        </CaseSectionView>
      ) : null}
      {showTech ? (
        <CaseSectionView
          group={groups.engineering}
          depth={CASE_DEPTH.L2}
          title='대표 구현 사례'
          layout={CASE_LAYOUT.WIDE}
          intro={
            c.techIntro ? (
              <Text className='text-[15px] leading-[1.6] text-subtle'>
                {c.techIntro}
              </Text>
            ) : undefined
          }
        >
          <TechNotes notes={c.techNotes} cols={TECH_COLS.THREE} />
        </CaseSectionView>
      ) : null}
      {c.experiment ? (
        <CaseSectionView
          group={experimentGroup}
          railLabel={experimentRail}
          depth={CASE_DEPTH.L2}
          title='OCR Experiment'
          id='ocr-experiment'
          layout={CASE_LAYOUT.WIDE}
          bareMobile
        >
          <ExperimentBlock {...c.experiment} />
        </CaseSectionView>
      ) : null}
      {showCurrent ? (
        <CaseSectionView
          group={groups.currentState}
          depth={CASE_DEPTH.L3}
          title='결과'
          loose
        >
          <ParagraphsView list={c.currentState} />
        </CaseSectionView>
      ) : null}
    </CaseStudyTemplate>
  );
}
