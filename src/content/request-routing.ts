import type { RoutingRequest } from '@/dto/request-routing.dto';

export const developmentFlow: RoutingRequest = {
  id: 'development',
  label: '개발 요청',
  lane: 'development',
  reason: '전역 지침·프로젝트 규칙 확인',
  decision: '기존 동작과 요청을 비교해 완료 조건을 정해.',
  prepare: '담당 파일과 입출력 규칙 합의',
  jobs: {
    primary: {
      label: '구현 담당',
      action: '기존 호출과 영향 범위 확인',
      finish: '구현 후 관련 테스트 실행',
    },
    support: {
      label: '추가 담당',
      action: '독립된 파일과 작업 인수',
      finish: '병렬 구현 후 자체 검사',
    },
  },
  gather: '변경 사항을 합치고 기존 코드와 연결 확인',
  proof: '테스트·타입·빌드 등 필수 검사',
  review: '화면 변경 시 여러 폭에서 조작 확인',
  decisionTest: '완료 조건과 검사 근거를 충족했어?',
  issue: { owner: 'primary', finding: '구현 결함' },
  planIssue: '입출력 규칙 불일치',
  finish: '검증한 변경을 커밋하고 근거 전달',
};
