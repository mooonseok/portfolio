import { CaseSectionView } from './components/case-section-view';
import {
  ControlMarkView,
  headTitle,
  MonitoringMarkView,
} from './smart-farm-marks-view';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Heading } from '@/components/atoms/heading';
import { StatusLabel } from '@/components/atoms/status-label';
import { FieldRows } from '@/components/molecules/field-rows';
import { FlowDiagram } from '@/components/molecules/flow-diagram';
import { ConceptFrame } from '@/components/organisms/concept-frame/concept-frame';
import type { CaseViewModel } from '@/dto/case-view.dto';
import { CASE_DEPTH, CASE_LAYOUT, CASE_SPACE } from '@/constants/case';
import { FLOW_ORIENT } from '@/constants/flow';
import { RULE } from '@/constants/rule';
import { STATUS_KIND } from '@/constants/status';
import { HEADING } from '@/constants/tag';
import { TONE } from '@/constants/tone';

export function SmartFarmSystemView({ p, groups }: CaseViewModel) {
  const c = p.case;
  return (
    <>
      {c.monitoringFlow ? (
        <CaseSectionView
          group={groups.system}
          id='monitoring'
          depth={CASE_DEPTH.L2}
          layout={CASE_LAYOUT.FREE}
          space={CASE_SPACE.LG}
          loose
          mark={<MonitoringMarkView />}
        >
          <Grid className='grid-cols-[1fr] [align-items:start] gap-y-10 lap:grid-cols-10 lap:gap-x-(--gutter)'>
            <Column className='gap-8 lap:col-[1/5] lap:gap-10'>
              <Column className='items-start gap-3.5'>
                <StatusLabel kind={STATUS_KIND.PRODUCT} label='PRODUCT WORK' />
                <Heading
                  level={HEADING.H2}
                  className={headTitle}
                  data-reveal-item='title'
                >
                  Monitoring System
                </Heading>
              </Column>
              <FlowDiagram
                nodes={c.monitoringFlow.nodes}
                orient={FLOW_ORIENT.AUTO}
                label='Monitoring flow'
              />
            </Column>
            <Grid
              className='grid-cols-2 [align-items:start] gap-4 lap:col-[6/11] lap:gap-(--gutter) [&>:last-child]:mt-10 lap:[&>:last-child]:mt-16'
              data-reveal-item='visual'
            >
              {p.visuals.sensor ? (
                <ConceptFrame
                  visual={p.visuals.sensor}
                  className='[--ratio:1/1]'
                  parallax={0}
                />
              ) : null}
              {p.visuals.monitor ? (
                <ConceptFrame
                  visual={p.visuals.monitor}
                  className='[--ratio:1/1]'
                  parallax={0}
                />
              ) : null}
            </Grid>
          </Grid>
        </CaseSectionView>
      ) : null}
      {c.controlExperiment ? (
        <CaseSectionView
          id='control'
          depth={CASE_DEPTH.L2}
          layout={CASE_LAYOUT.FREE}
          rule={RULE.NONE}
          mark={<ControlMarkView />}
        >
          <Grid className='grid-cols-[1fr] gap-y-8 px-5 py-6 [border:1px_dashed_var(--ink)] tab:p-10 lap:grid-cols-10 lap:[align-items:start] lap:gap-x-(--gutter) lap:px-10 lap:pt-12 lap:pb-14'>
            <Column className='min-w-0 gap-8 lap:col-[1/6] lap:gap-10 mob:[--flow-gap:20px]'>
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
                  Control Experiment
                </Heading>
              </Column>
              <FlowDiagram
                nodes={c.controlExperiment.flow}
                orient={FLOW_ORIENT.AUTO}
                label='Control experiment flow'
              />
              <FieldRows rows={c.controlExperiment.rows} />
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
        </CaseSectionView>
      ) : null}
    </>
  );
}
