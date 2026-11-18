import type { RoutingRequest } from '@/dto/request-routing.dto';

export const routingRequests: RoutingRequest[] = [
  {
    id: 'detail-panel',
    label: '상세 패널',
    lane: 'development',
    quote: '“항목을 누르면 상세 정보를 부드럽게 펼쳐줘.”',
    reason: '패널 배치 · 항목 조회 · 펼침 효과',
    decision:
      '상세 정보를 놓을 자리, 선택한 항목의 값, 펼치는 움직임이 필요해.',
    jobs: { screen: '패널 배치', data: '항목 조회', motion: '펼침 효과' },
    route:
      '패널은 화면 담당, 항목 조회는 데이터 담당, 펼침 효과는 모션 담당이 맡아.',
    work: '세 담당이 동시에 작업해.',
    proof: '같은 항목을 눌러 상세 정보 대조',
    review: '목록에서 고른 항목과 열린 패널의 정보가 일치하는지 확인해.',
    issue: {
      owner: 'data',
      label: '다른 항목의 정보가 뜸',
      fix: '조회 값 수정',
      finding: '패널은 잘 열리는데 다른 항목의 정보가 떠.',
      back: '데이터 담당에게 조회한 항목을 다시 확인해 달라고 해.',
      repair: '선택한 항목의 값을 가져오도록 고쳐.',
      retry: '같은 항목을 다시 눌러 상세 정보를 대조해.',
    },
    finish: '선택한 항목과 패널의 상세 정보가 일치해.',
  },
  {
    id: 'button-layout',
    label: '저장 버튼 위치',
    lane: 'development',
    quote:
      '“폰에서 배송지를 고치면 저장하려고 맨 위까지 다시 올라가야 해. 마지막 입력칸 바로 아래에서 저장하게 해줘.”',
    reason: '저장 버튼 위치만 변경',
    decision: '저장 기능은 이미 있어. 화면에서 버튼의 위치만 옮기면 돼.',
    jobs: { screen: '버튼 배치' },
    route: '화면 담당에게 버튼 배치를 맡겨.',
    work: '저장 버튼을 마지막 입력칸 아래로 옮겨.',
    proof: '휴대폰에서 배송지 수정 후 저장',
    review: '휴대폰에서 배송지를 고친 뒤 마지막 입력칸 아래에서 저장해 봐.',
    finish: '화면 위로 돌아가지 않고 입력칸 바로 아래에서 저장돼.',
  },
];
