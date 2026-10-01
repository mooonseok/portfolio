import { CaseSectionView } from './components/case-section-view';
import { headTitle, MonitoringMarkView } from './smart-farm-marks-view';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Heading } from '@/components/atoms/heading';
import { StatusLabel } from '@/components/atoms/status-label';
import { FlowDiagram } from '@/components/molecules/flow-diagram';
import { ConceptFrame } from '@/components/organisms/concept-frame/concept-frame';
import type { CaseViewModel } from '@/dto/case-view.dto';
import { CASE_DEPTH, CASE_LAYOUT, CASE_SPACE } from '@/constants/case';
import { FLOW_ORIENT, FLOW_ROLE } from '@/constants/flow';
import { STATUS_KIND } from '@/constants/status';
import { HEADING } from '@/constants/tag';

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
                <StatusLabel
                  kind={STATUS_KIND.EXPERIMENT}
                  label='OFFICE PROTOTYPE'
                />
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
                orient={FLOW_ORIENT.VERTICAL}
                role={FLOW_ROLE.STATIC}
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
    </>
  );
}
