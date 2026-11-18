import type { RoutingRequest } from '@/dto/request-routing.dto';

export const designFlow: RoutingRequest = {
  id: 'design',
  label: '디자인 요청',
  lane: 'design',
  reason: '디자인 방향 선택',
  decision: '참고 화면을 보고 가장 먼저 보여줄 내용을 정해.',
  jobs: { primary: '고른 방향으로 화면을 그려.' },
  work: '실제 문구와 동작을 넣어 시안을 만들어.',
  proof: '시안 독립 검토',
  review: '다른 검토자가 처음 정한 방향과 사용성을 확인해.',
  issue: {
    owner: 'primary',
    back: '문제가 있으면 시안 담당자가 고쳐서 다시 검토받아.',
  },
  finish: '내가 시안을 확정하면 개발 요청에 따라 구현을 시작해.',
};
