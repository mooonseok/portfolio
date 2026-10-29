import type { ActivityCopy } from '@/dto/activity-copy.dto';

export const activity: ActivityCopy = {
  label: 'GITHUB ACTIVITY',
  summary: 'GitHub 레포별 최근 커밋입니다.',
  legend:
    '달에 가까울수록 마지막 커밋이 최근이고 크게 보일수록 최근 30일 커밋이 많은 레포입니다.',
  asOf: '기준',
  commitCount: '최근 30일 커밋',
  commitUnit: '개',
  lastCommit: '마지막 커밋',
  open: 'GitHub에서 열기',
  newTab: '새 탭',
  privateLabel: '비공개 레포',
  privateNote: '비공개 레포라 이름과 마지막 커밋 날짜만 보여 줍니다.',
  skip: '건너뛰기',
  skipLabel: '인트로 건너뛰기',
  loading: '궤도 화면을 준비하는 중입니다.',
  stale:
    'GitHub에서 최신 커밋을 가져오지 못했습니다. 표시된 기준 날짜의 기록입니다.',
  empty:
    '최근 30일 동안 올린 커밋이 없습니다. 지난 작업은 이력 페이지에서 볼 수 있습니다.',
  listHeading: '최근 커밋한 레포',
  history: { label: '이력 보러 가기', href: '/portfolio' },
};
