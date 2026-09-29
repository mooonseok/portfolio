import { CaseStudyTemplate } from '@/components/templates/case-study-template/case-study-template';
import { CaseSectionView } from './components/case-section-view';
import { ParagraphsView } from './components/paragraphs-view';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import { ConceptFrame } from '@/components/organisms/concept-frame/concept-frame';
import { StateTokens } from '@/components/molecules/state-tokens';
import type { EmosaveCaseViewProps } from '@/dto/case-view.dto';
import {
  CASE_DEPTH,
  CASE_LAYOUT,
  CASE_SPACE,
  SURFACE_LABEL,
} from '@/constants/case';
import { SIZE } from '@/constants/size';
import { HEADING } from '@/constants/tag';

export function EmosaveCaseView({
  p,
  groups,
  showInteraction,
  showWork,
  showCurrent,
  interactionFocus,
  workParagraphs,
}: EmosaveCaseViewProps) {
  const c = p.case;
  return (
    <CaseStudyTemplate
      project={p}
      titleSize={SIZE.SM}
      surfaceLabel={SURFACE_LABEL.SURFACE}
      overviewExtra={<ParagraphsView list={c.role} />}
      hero={
        <Box className='container grid-page [align-items:start] gap-y-7'>
          <Box className='col-[1/-1] tab:col-[1/6] lap:col-[1/8]'>
            <ConceptFrame
              visual={p.visuals.main}
              className='[--ratio:4/5]'
              radius={24}
              parallax={10}
              priority
            />
          </Box>
          {c.stateFlow ? (
            <Column className='col-[1/-1] gap-6 tab:col-[6/-1] tab:mt-30 lap:col-[8/13] lap:mt-40'>
              <StateTokens states={c.stateFlow} size={SIZE.LG} />
              {c.stateFlowNote ? (
                <Text className='text-[15px] leading-[1.6] text-graphite'>
                  {c.stateFlowNote}
                </Text>
              ) : null}
            </Column>
          ) : null}
        </Box>
      }
    >
      {showInteraction ? (
        <CaseSectionView
          group={groups.interaction}
          depth={CASE_DEPTH.L1}
          title='Interaction Focus'
          layout={CASE_LAYOUT.WIDE}
          loose
        >
          <Grid className='grid-cols-[1fr] gap-10 tab:grid-cols-3 tab:gap-(--gutter)'>
            {interactionFocus.map((f) => (
              <Column key={f.title} className='gap-4 tab:nth-2:mt-18'>
                {p.visuals[f.visual] ? (
                  <Box data-reveal-item='visual'>
                    <ConceptFrame
                      visual={p.visuals[f.visual]}
                      className='[--ratio:1/1]'
                      radius={20}
                      parallax={0}
                    />
                  </Box>
                ) : null}
                <Heading
                  level={HEADING.H3}
                  className='text-[20px] font-medium tracking-[-0.01em]'
                >
                  {f.title}
                </Heading>
                <ParagraphsView list={f.body} />
              </Column>
            ))}
          </Grid>
        </CaseSectionView>
      ) : null}
      {showWork ? (
        <CaseSectionView
          group={groups.work}
          depth={CASE_DEPTH.L3}
          title='What I Worked On'
        >
          <ParagraphsView list={workParagraphs} />
        </CaseSectionView>
      ) : null}
      {showCurrent ? (
        <CaseSectionView
          group={groups.currentState}
          depth={CASE_DEPTH.L3}
          title='Current State'
          space={CASE_SPACE.SM}
          loose
        >
          <ParagraphsView list={c.currentState} />
        </CaseSectionView>
      ) : null}
    </CaseStudyTemplate>
  );
}
