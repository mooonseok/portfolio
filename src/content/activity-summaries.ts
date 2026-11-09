import type { ActivityConfig } from '@/dto/activity.dto';

export const activitySummaries: ActivityConfig['commitSummaries'] = {
  portfolio: {
    '행성 재질과 작업 요약 정리': '행성 디자인·작업 설명 개선',
    '홈 작업 탐색과 대체 화면 보완': '최근 작업 더보기·선택 안내 추가',
  },
  'blog-automation': {
    'B안 네이비 테마 통일과 이미지 API 없는 로컬 SVG·PNG 생성 연결':
      '글에 넣을 이미지 생성',
    '본문·요약·표 크기 확대와 이미지 추가 서비스 비용 제한':
      '본문·표 글자 크기 확대',
    '글의 자동 출처·마무리 과제 제거와 이미지 자동화 권장안 정리':
      '불필요한 자동 문구 제거',
  },
  woori_client: {
    '관리자 대시보드 디자인 통일과 반응형 개선': '관리자 화면 모바일 배치 개선',
    '관리자 로그인·인증 화면 디자인 통일': '로그인 화면 디자인 통일',
  },
};
