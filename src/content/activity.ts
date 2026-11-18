import type { ActivityCopy } from '@/dto/activity-copy.dto';
import { ORBIT } from '@/constants/orbit';

export const activity: ActivityCopy = {
  heading: '박문석이 지금 작업 중인 프로젝트',
  close: '닫기',
  panelLabel: '선택한 프로젝트',
  instruction: '행성을 선택해 최근 작업 보기',
  fallbackInstruction: '프로젝트를 선택해 최근 작업 보기',
  recentWork: '최근 작업',
  moreWork: '최근 작업 더 보기',
  lessWork: '최근 작업 접기',
  lastCommit: '마지막 커밋',
  repo: '레포',
  open: 'GitHub에서 열기',
  repoSuffix: '레포',
  newTab: '새 탭',
  privateNote: '비공개 레포라 링크가 없습니다',
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
