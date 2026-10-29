import type { ActivitySnapshot } from '@/dto/activity.dto';

export const activitySnapshot: ActivitySnapshot = {
  asOf: '2026-10-29',
  live: false,
  repos: [
    {
      name: 'portfolio',
      private: false,
      count: 76,
      last: '2026-10-29',
      commits: [
        {
          date: '2026-10-29',
          title: '개편 작업용 진행표와 검토 에이전트 추가',
        },
        { date: '2026-10-29', title: '경로별 첫 로딩 JS 크기 예산 검사 추가' },
        { date: '2026-10-29', title: '커밋 메시지 규칙 검사 훅 추가' },
      ],
    },
    {
      name: 'blog-automation',
      private: false,
      count: 26,
      last: '2026-10-29',
      commits: [
        {
          date: '2026-10-29',
          title:
            'B안 네이비 테마 통일과 이미지 API 없는 로컬 SVG·PNG 생성 연결',
        },
        {
          date: '2026-10-29',
          title: '본문·요약·표 크기 확대와 이미지 추가 서비스 비용 제한',
        },
        {
          date: '2026-10-29',
          title: '글의 자동 출처·마무리 과제 제거와 이미지 자동화 권장안 정리',
        },
      ],
    },
    {
      name: 'woori_client',
      private: false,
      count: 41,
      last: '2026-10-26',
      commits: [
        {
          date: '2026-10-26',
          title: '관리자 대시보드 디자인 통일과 반응형 개선',
        },
        { date: '2026-10-22', title: '관리자 로그인·인증 화면 디자인 통일' },
      ],
    },
    {
      name: 'woori_server',
      private: false,
      count: 39,
      last: '2026-10-26',
      commits: [
        {
          date: '2026-10-26',
          title: 'pre-push 경량화와 PR 전체 품질 검사 유지',
        },
        { date: '2026-10-21', title: '터미널 배포 시 검증된 이미지 재사용' },
      ],
    },
    {
      name: 'auto-trading',
      private: true,
      count: 1,
      last: '2026-10-29',
      commits: [
        { date: '2026-10-29', title: '자동매매 연구 시스템 저장소 시작' },
      ],
    },
  ],
};
