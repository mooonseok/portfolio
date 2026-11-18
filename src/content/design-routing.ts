import type { RoutingRequest } from '@/dto/request-routing.dto';

export const designFlow: RoutingRequest = {
  id: 'design',
  label: '디자인 요청',
  lane: 'design',
  quote: '누가 쓸 화면인지, 무엇을 쉽게 할지 정해.',
  reason: '디자인 방향 선택',
  decision: '참고 화면을 보고 가장 먼저 보여줄 내용을 정해.',
  jobs: { primary: '고른 방향으로 화면을 그려.' },
  work: '실제 문구와 동작을 넣어 시안을 만들어.',
  proof: '시안 독립 검토',
  review: '다른 검토자가 처음 정한 방향과 사용성을 확인해.',
  issue: {
    owner: 'primary',
    label: '보완이 필요할 때',
    fix: '지적받은 부분 수정',
    back: '고칠 부분을 시안 담당에게 돌려보내.',
    retry: '같은 화면에서 다시 확인해.',
  },
  finish: '내가 시안을 보고 확정해. 개발도 요청했다면 구현으로 이어져.',
};
