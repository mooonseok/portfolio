import type { RoutingRequest } from '@/dto/request-routing.dto';

const buttonPlacement = '버튼 위 배치';

export const designRoutingRequests: RoutingRequest[] = [
  {
    id: 'checkout-total',
    lane: 'design',
    quote:
      '“쿠폰을 쓰면 할인액만 눈에 띄어. 결제 누르기 전에 내가 얼마 내는지 바로 보이게 해줘.”',
    reason: '최종 금액의 강조와 위치',
    decision:
      '할인액이 먼저 눈에 들어오고, 최종 금액은 결제 버튼에서 멀리 떨어져 있습니다.',
    jobs: { hierarchy: '금액 강조', layout: buttonPlacement },
    route: '정보 위계와 화면 배치, 두 곳을 고칩니다.',
    work: '최종 금액은 굵게 표시하고, 결제 버튼 바로 위에 놓습니다.',
    review: '쿠폰을 적용한 화면에서 최종 금액이 먼저 읽히는지 봅니다.',
    issue: {
      owner: 'hierarchy',
      label: '할인액이 먼저 보임',
      fix: '글자 굵기 조정',
      back: '금액은 버튼 위에 잘 놓였습니다. 그런데 할인액 글씨도 똑같이 굵어 여전히 먼저 읽힙니다.',
      repair:
        '배치는 그대로 두고 할인액의 굵기를 낮춥니다. 최종 금액에만 강조를 남깁니다.',
      retry:
        '같은 쿠폰을 적용하고 결제 직전에 보이는 두 금액을 다시 비교합니다.',
    },
    finish: '결제 버튼 위에서 실제로 낼 금액이 가장 먼저 읽힙니다.',
  },
  {
    id: 'postal-code',
    lane: 'design',
    quote: '“우편번호 밑에 ‘형식 오류’라고만 떠. 뭘 고쳐야 하는지 알려줘.”',
    reason: '입력 방법을 알려 주는 문구',
    decision:
      '안내는 이미 우편번호 바로 아래에 있습니다. 몇 자리를 써야 하는지만 빠져 있습니다.',
    jobs: { copy: '입력 예시 작성' },
    route: '입력란과 배치는 그대로 두고 안내 문구만 고칩니다.',
    work: '‘형식 오류’를 ‘우편번호 다섯 자리를 입력해 주세요’로 바꿉니다.',
    review:
      '네 자리만 입력했을 때 다음에 무엇을 해야 할지 문구만 보고 알 수 있는지 확인합니다.',
    finish:
      '입력란을 옮기지 않아도 다섯 자리를 써야 한다는 점이 분명해졌습니다.',
  },
];
