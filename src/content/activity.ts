import type { ActivityCopy } from '@/dto/activity-copy.dto';
import { ORBIT } from '@/constants/orbit';

export const activity: ActivityCopy = {
  heading: '박문석이 지금 작업 중인 프로젝트',
  panelLabel: '선택한 프로젝트',
  lastCommit: '마지막 커밋',
  recent: '최근 30일',
  countPrefix: '커밋 ',
  countSuffix: '개',
  repo: '레포',
  open: 'GitHub에서 열기',
  repoSuffix: '레포',
  newTab: '새 탭',
  privateNote: '비공개 레포라 링크가 없습니다',
  stale: 'GitHub 기록을 새로 가져오지 못해 이 날짜 기준으로 보여 줍니다:',
  empty:
    '최근 30일 동안 올린 커밋이 없습니다. 지난 작업은 이력 페이지에서 볼 수 있습니다.',
  history: { label: '이력 보러 가기', href: ORBIT.HISTORY_HREF },
  opener: {
    label: '앱부터 웹 서버까지, 개발자 박문석 포트폴리오',
    line: ['앱부터', '웹', '서버까지,'],
    kicker: '개발자',
    name: ['박', '문', '석'],
    tag: '포트폴리오',
    skip: '건너뛰기',
  },
};
