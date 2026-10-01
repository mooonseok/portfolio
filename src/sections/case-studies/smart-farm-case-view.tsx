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
import { StatusLabel } from '@/components/atoms/status-label';
import { Text } from '@/components/atoms/text';
import { ConceptFrame } from '@/components/organisms/concept-frame/concept-frame';
import type { SmartFarmCaseViewProps } from '@/dto/case-view.dto';
import { CASE_DEPTH } from '@/constants/case';
import { SIZE } from '@/constants/size';
import { STATUS_KIND } from '@/constants/status';
import { TAG } from '@/constants/tag';
import { TONE } from '@/constants/tone';
import { IMAGE_SIZES } from '@/constants/visual';

export function SmartFarmCaseView({
  p,
  groups,
  monitoringWork,
  controlWork,
  showContext,
  showWork,
  showMonitoringWork,
  showControlWork,
  showCurrent,
  showCurrentMonitoring,
  showCurrentControl,
  currentMonitoring,
  currentControl,
}: SmartFarmCaseViewProps) {
  const c = p.case;
  return (
    <CaseStudyTemplate
      project={p}
      titleSize={SIZE.MD}
      hero={
        <Box className='container'>
          <ConceptFrame
            visual={p.visuals.hero}
            className='[--ratio:4/5] tab:[--ratio:16/9] lap:[--ratio:21/9]'
            parallax={10}
            priority
            sizes={IMAGE_SIZES.FULL}
          />
        </Box>
      }
    >
      {c.roleTracks ? (
        <CaseSectionView
          depth={CASE_DEPTH.L1}
          title='Status / Scope'
          id='scope'
        >
          <Box className={tracksClass}>
            {c.roleTracks.map((t) => (
              <Box
                key={t.label}
                className={trackCol(t.kind)}
                data-kind={t.kind}
              >
                <StatusLabel
                  kind={t.kind}
                  label={t.label}
                  tone={t.kind === STATUS_KIND.PRODUCT ? TONE.SIGNAL : TONE.INK}
                />
                <Text as={TAG.SPAN} className='muted'>
                  {t.note}
                </Text>
                <ParagraphsView list={t.body} />
              </Box>
            ))}
          </Box>
        </CaseSectionView>
      ) : null}
      {showContext ? (
        <CaseSectionView
          depth={CASE_DEPTH.L1}
          title='Context / Problem'
          id='context'
        >
          <ParagraphsView list={c.contextProblem} />
        </CaseSectionView>
      ) : null}
      <SmartFarmSystemView p={p} groups={groups} />
      {showWork ? (
        <CaseSectionView
          group={groups.work}
          depth={CASE_DEPTH.L3}
          title='What I Worked On'
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
      <SmartFarmControlView p={p} groups={groups} />
      {showCurrent ? (
        <CaseSectionView
          group={groups.currentState}
          depth={CASE_DEPTH.L3}
          title='Current State'
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
