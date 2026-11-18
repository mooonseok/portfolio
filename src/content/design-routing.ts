import type { RoutingRequest } from '@/dto/request-routing.dto';

const buttonPlacement = '버튼 위 배치';

export const designRoutingRequests: RoutingRequest[] = [
  {
    id: 'postal-code',
    label: '우편번호 안내',
    lane: 'design',
    quote: '“우편번호 밑에 ‘형식 오류’라고만 떠. 뭘 고쳐야 하는지 알려줘.”',
    reason: '입력 방법을 알려 주는 문구',
    decision: '안내 위치는 맞아. 몇 자리를 입력해야 하는지만 빠졌어.',
    jobs: { copy: '입력 예시 작성' },
    route: '안내 문구 한 곳을 고쳐.',
    work: '‘형식 오류’를 ‘우편번호 다섯 자리를 입력해 주세요’로 바꿔.',
    proof: '네 자리 우편번호로 확인',
    sample: {
      before: '형식 오류',
      after: '우편번호 다섯 자리를 입력해 주세요',
      input: '1234',
    },
    review: '1234를 입력하고, 안내만 보고 무엇을 고쳐야 할지 확인해.',
    finish: '네 자리를 입력하면 다섯 자리가 필요하다는 안내가 떠.',
  },
  {
    id: 'checkout-total',
    label: '결제 금액 강조',
    lane: 'design',
    quote:
      '“쿠폰을 쓰면 할인액만 눈에 띄어. 결제 누르기 전에 내가 얼마 내는지 바로 보이게 해줘.”',
    reason: '최종 금액의 강조와 위치',
    decision:
      '할인액이 먼저 보이고 최종 금액은 결제 버튼에서 멀리 떨어져 있어.',
    jobs: { hierarchy: '금액 강조', layout: buttonPlacement },
    route: '정보 위계와 화면 배치를 함께 고쳐.',
    work: '최종 금액을 굵게 표시하고 결제 버튼 바로 위에 둬.',
    proof: '쿠폰 적용 후 두 금액 비교',
    review: '쿠폰을 적용한 화면에서 결제 직전에 어느 금액이 먼저 읽히는지 봐.',
    issue: {
      owner: 'hierarchy',
      label: '할인액이 먼저 보임',
      fix: '할인액 굵기 조정',
      back: '금액 위치는 맞아. 글자 굵기를 담당한 정보 위계 단계로 돌아가.',
      repair: '할인액의 굵기를 낮추고 최종 금액에만 강조를 남겨.',
      retry: '같은 쿠폰을 적용한 뒤 두 금액을 다시 비교해.',
    },
    finish: '결제 버튼 위에서 실제로 낼 금액이 가장 먼저 읽혀.',
  },
];
