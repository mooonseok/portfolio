import type { RoutingRequest } from '@/dto/request-routing.dto';

export const designFlow: RoutingRequest = {
  id: 'design',
  label: '디자인 요청',
  lane: 'design',
  reason: '제품·디자인 지침과 요청 범위 확인',
  decision: '목적과 제약을 정하고 이미 승인한 방향은 재사용해.',
  prepare: '새 방향이 필요하면 시안을 비교해 요청자가 선택',
  jobs: {
    primary: {
      label: '시안 담당',
      action: '선택한 방향의 상태·모션 확정',
      finish: '조작 가능한 시안 제작',
    },
  },
  gather: '화면 폭·조작 상태별로 시안 검증',
  proof: 'Unslop으로 점검하고 필요한 부분 보완',
  review: '바뀐 부분을 같은 조건에서 다시 검증',
  decisionTest: '독립 검토에서 필수 결함 없이 통과했어?',
  issue: { owner: 'primary', finding: '시안 결함' },
  planIssue: '방향 변경',
  finish: '요청자가 시안을 확정',
  handoff: '구현까지 요청했다면 개발 절차로 이어져.',
};
