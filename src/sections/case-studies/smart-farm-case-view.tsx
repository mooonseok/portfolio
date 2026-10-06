import { CaseStudyTemplate } from '@/components/templates/case-study-template/case-study-template';
import { CaseSectionView } from './components/case-section-view';
import { ParagraphsView } from './components/paragraphs-view';
import { WorkRowsView } from './components/work-rows-view';
import {
  ControlMarkView,
  MonitoringMarkView,
  trackCol,
  tracksClass,
} from './smart-farm-marks-view';
import { SmartFarmControlView } from './smart-farm-control-view';
import { SmartFarmSystemView } from './smart-farm-system-view';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import type { SmartFarmCaseViewProps } from '@/dto/case-view.dto';
import { CASE_DEPTH } from '@/constants/case';
import { STATUS_KIND } from '@/constants/status';

export function SmartFarmCaseView({
  p,
  groups,
  monitoringWork,
  controlWork,
  showWork,
  showMonitoringWork,
  showControlWork,
  showCurrent,
  showCurrentMonitoring,
  showCurrentControl,
  currentMonitoring,
  currentControl,
}: SmartFarmCaseViewProps) {
  return (
    <CaseStudyTemplate project={p}>
      {showWork ? (
        <CaseSectionView
          group={groups.work}
          depth={CASE_DEPTH.L3}
          title='담당 기능'
        >
          <Column className='gap-10'>
            {showMonitoringWork ? (
              <Column className='items-start gap-3 [&>dl]:self-stretch'>
                <MonitoringMarkView />
                <WorkRowsView items={monitoringWork} />
              </Column>
            ) : null}
            {showControlWork ? (
              <Column className='items-start gap-3 [&>dl]:self-stretch'>
                <ControlMarkView />
                <WorkRowsView items={controlWork} />
              </Column>
            ) : null}
          </Column>
        </CaseSectionView>
      ) : null}
      <SmartFarmSystemView p={p} groups={groups} />
      <SmartFarmControlView p={p} groups={groups} />
      {showCurrent ? (
        <CaseSectionView
          group={groups.currentState}
          depth={CASE_DEPTH.L3}
          title='결과'
          loose
        >
          <Box className={tracksClass}>
            {showCurrentMonitoring ? (
              <Box
                className={trackCol(STATUS_KIND.EXPERIMENT)}
                data-kind={STATUS_KIND.EXPERIMENT}
              >
                <MonitoringMarkView />
                <ParagraphsView list={currentMonitoring} />
              </Box>
            ) : null}
            {showCurrentControl ? (
              <Box
                className={trackCol(STATUS_KIND.EXPERIMENT)}
                data-kind={STATUS_KIND.EXPERIMENT}
              >
                <ControlMarkView />
                <ParagraphsView list={currentControl} />
              </Box>
            ) : null}
          </Box>
        </CaseSectionView>
      ) : null}
    </CaseStudyTemplate>
  );
}
