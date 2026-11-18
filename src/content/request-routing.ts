import type { RoutingRequest } from '@/dto/request-routing.dto';

export const developmentFlow: RoutingRequest = {
  id: 'development',
  label: '개발 요청',
  lane: 'development',
  quote: '무엇을 바꿀지, 어디까지 되면 끝인지 정해.',
  reason: '작업 범위 결정',
  decision: '화면·데이터·모션 중 손댈 부분에만 담당을 배정해.',
  jobs: {
    primary: '맡은 기능을 만들어.',
    support: '독립된 작업은 나눠서 진행해.',
  },
  work: '각자 맡은 부분을 구현한 뒤 결과를 합쳐.',
  proof: '합친 결과 검토',
  review: '자동 검사와 실제 화면에서 처음 정한 기준을 확인해.',
  issue: {
    owner: 'primary',
    label: '보완이 필요할 때',
    fix: '지적받은 부분 수정',
    back: '문제가 생긴 작업만 담당에게 돌려보내.',
    retry: '같은 조건에서 다시 확인해.',
  },
  finish: '검증한 변경 사항을 전달해.',
};
