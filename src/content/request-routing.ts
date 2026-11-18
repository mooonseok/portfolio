import type { RoutingRequest } from '@/dto/request-routing.dto';

export const developmentFlow: RoutingRequest = {
  id: 'development',
  label: '개발 요청',
  lane: 'development',
  reason: '작업 범위 결정',
  decision: '화면·데이터·모션 중 손댈 부분에만 담당을 배정해.',
  jobs: {
    primary: '맡은 기능을 만들어.',
    support: '따로 진행할 수 있을 때 나눠 맡아.',
  },
  work: '각자 맡은 부분을 구현한 뒤 결과를 합쳐.',
  proof: '합친 결과 검토',
  review: '자동 검사와 실제 화면으로 동작을 확인해.',
  issue: {
    owner: 'primary',
    back: '문제가 생긴 부분은 담당자가 고쳐서 다시 검토받아.',
  },
  finish: '검증한 변경 사항을 전달해.',
};
