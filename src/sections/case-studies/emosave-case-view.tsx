import { CaseStudyTemplate } from '@/components/templates/case-study-template/case-study-template';
import { CaseSectionView } from './components/case-section-view';
import { FocusCardView } from './components/focus-card-view';
import { ParagraphsView } from './components/paragraphs-view';
import { StateExample } from './components/state-example';
import { Box } from '@/components/atoms/box';
import { Grid } from '@/components/atoms/grid';
import { ConceptFrame } from '@/components/organisms/concept-frame/concept-frame';
import type { EmosaveCaseViewProps } from '@/dto/case-view.dto';
import { SIZE } from '@/constants/size';
import {
  CASE_DEPTH,
  CASE_LAYOUT,
  CASE_SPACE,
  SURFACE_LABEL,
} from '@/constants/case';

export function EmosaveCaseView({
  p,
  groups,
  showInteraction,
  showWork,
  showCurrent,
  lead,
  rest,
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
          {lead ? (
            <Grid className='grid-cols-[1fr] gap-8 tab:grid-cols-6 tab:[align-items:start] tab:gap-x-(--gutter) lap:grid-cols-9'>
              <FocusCardView
                focus={lead}
                visual={p.visuals[lead.visual]}
                className='tab:col-[1/4] lap:col-[1/4]'
              />
              {c.stateExample ? (
                <Box className='tab:col-[4/7] lap:col-[5/10]'>
                  <StateExample example={c.stateExample} />
                </Box>
              ) : null}
            </Grid>
          ) : null}
          <Grid className='grid-cols-[1fr] gap-10 tab:mt-10 tab:grid-cols-3 tab:gap-(--gutter) lap:mt-16 tab:[&>:first-child]:col-start-2'>
            {rest.map((f) => (
              <FocusCardView
                key={f.title}
                focus={f}
                visual={p.visuals[f.visual]}
              />
            ))}
          </Grid>
        </CaseSectionView>
      ) : null}
      {showWork ? (
        <CaseSectionView
          group={groups.work}
          depth={CASE_DEPTH.L3}
          title='What I Worked On'
          space={CASE_SPACE.SM}
        >
          <ParagraphsView list={workParagraphs} />
        </CaseSectionView>
      ) : null}
      {showCurrent ? (
        <CaseSectionView
          group={groups.currentState}
          depth={CASE_DEPTH.L3}
          title='배운 점'
          space={CASE_SPACE.SM}
        >
          <ParagraphsView list={c.currentState} />
        </CaseSectionView>
      ) : null}
    </CaseStudyTemplate>
  );
}
