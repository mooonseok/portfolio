import { CaseSectionView } from './components/case-section-view';
import { ControlConditions } from './components/control-conditions';
import { ControlMarkView, headTitle } from './smart-farm-marks-view';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Heading } from '@/components/atoms/heading';
import { StatusLabel } from '@/components/atoms/status-label';
import { Text } from '@/components/atoms/text';
import { FieldRows } from '@/components/molecules/field-rows';
import { ConceptFrame } from '@/components/organisms/concept-frame/concept-frame';
import type { CaseViewModel } from '@/dto/case-view.dto';
import { CASE_DEPTH, CASE_LAYOUT, CASE_SPACE } from '@/constants/case';
import { RULE } from '@/constants/rule';
import { STATUS_KIND } from '@/constants/status';
import { HEADING, TAG } from '@/constants/tag';
import { TONE } from '@/constants/tone';

export function SmartFarmControlView({ p, groups }: CaseViewModel) {
  const c = p.case.controlExperiment;
  if (!c) return null;
  return (
    <CaseSectionView
      group={groups.engineering}
      id='control'
      depth={CASE_DEPTH.L2}
      layout={CASE_LAYOUT.FREE}
      space={CASE_SPACE.LG}
      rule={RULE.NONE}
      mark={<ControlMarkView />}
    >
      <Column className='gap-8 px-5 py-6 [border:1px_dashed_var(--ink)] tab:p-10 lap:gap-10 lap:px-10 lap:pt-12 lap:pb-14'>
        <Grid className='grid-cols-[1fr] gap-y-8 lap:grid-cols-10 lap:[align-items:start] lap:gap-x-(--gutter)'>
          <Column className='min-w-0 gap-8 lap:col-[1/6] lap:gap-10'>
            <Column className='items-start gap-3.5'>
              <StatusLabel
                kind={STATUS_KIND.EXPERIMENT}
                label='EXPERIMENT'
                tone={TONE.INK}
              />
              <Heading
                level={HEADING.H2}
                className={headTitle}
                data-reveal-item='title'
              >
                {c.title}{' '}
                <Text
                  as={TAG.SPAN}
                  className='block text-[length:clamp(17px,4.6vw,20px)] leading-[1.4] text-subtle'
                >
                  {c.subtitle}
                </Text>
              </Heading>
            </Column>
            <FieldRows rows={c.rows} />
          </Column>
          {p.visuals.equipment ? (
            <Box className='lap:col-[7/11]' data-reveal-item='visual'>
              <ConceptFrame
                visual={p.visuals.equipment}
                className='[--ratio:4/5]'
                parallax={0}
              />
            </Box>
          ) : null}
        </Grid>
        <ControlConditions c={c} />
      </Column>
    </CaseSectionView>
  );
}
