import { SmartFarmCaseView } from './smart-farm-case-view';
import { caseGroupTags } from './case-group-tags';
import { has } from '@/lib/has';
import type { Project } from '@/dto/project.dto';
import { WORK_TRACK } from '@/constants/project';

export function SmartFarmCase({ p }: { p: Project }) {
  const c = p.case;
  const monitoringWork = c.work.filter(
    (w) => w.track === WORK_TRACK.MONITORING
  );
  const controlWork = c.work.filter((w) => w.track === WORK_TRACK.CONTROL);
  const tracks = c.currentStateTracks;
  const showCurrentMonitoring = !!tracks && has(tracks.monitoring);
  const showCurrentControl = !!tracks && has(tracks.control);
  return (
    <SmartFarmCaseView
      p={p}
      groups={caseGroupTags(p)}
      monitoringWork={monitoringWork}
      controlWork={controlWork}
      showWork={has(c.work)}
      showMonitoringWork={has(monitoringWork)}
      showControlWork={has(controlWork)}
      showCurrent={showCurrentMonitoring || showCurrentControl}
      showCurrentMonitoring={showCurrentMonitoring}
      showCurrentControl={showCurrentControl}
      currentMonitoring={tracks?.monitoring ?? []}
      currentControl={tracks?.control ?? []}
    />
  );
}
