import { CaseSectionView } from './components/case-section-view';
import { headTitle, MonitoringMarkView } from './smart-farm-marks-view';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Heading } from '@/components/atoms/heading';
import { StatusLabel } from '@/components/atoms/status-label';
import { FlowDiagram } from '@/components/molecules/flow-diagram';
import { VisualsNote } from '@/components/organisms/visuals-note';
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
          <Grid className='work-sheet grid-cols-[minmax(0,1fr)]'>
            <Column className='gap-8 lap:gap-10'>
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
                  센서 측정과 관측 흐름
                </Heading>
              </Column>
              <FlowDiagram
                nodes={c.monitoringFlow.nodes}
                orient={FLOW_ORIENT.VERTICAL}
                role={FLOW_ROLE.STATIC}
                label='Monitoring flow'
              />
            </Column>
          </Grid>
          <VisualsNote />
        </CaseSectionView>
      ) : null}
    </>
  );
}
