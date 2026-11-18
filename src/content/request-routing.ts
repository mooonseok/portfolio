import type { RoutingPhase, RoutingRequest } from '@/dto/request-routing.dto';

export const routingRequests: RoutingRequest[] = [
  {
    id: 'button-layout',
    lane: 'development',
    quote:
      '“폰에서 배송지를 고치면 저장하려고 맨 위까지 다시 올라가야 해. 마지막 입력칸 바로 아래에서 저장하게 해줘.”',
    reason: '기존 버튼의 위치만 변경',
    decision: '저장은 이미 됩니다. 입력란과 버튼의 위치만 바꾸면 됩니다.',
    jobs: { screen: '버튼 배치' },
    route: '화면 담당에게 버튼 배치를 맡깁니다.',
    work: '화면 담당이 저장 버튼을 옮깁니다.',
    review: '바뀐 버튼 위치를 검토합니다.',
    finish: '입력란 아래에 버튼이 보입니다. 검토를 마쳤습니다.',
  },
  {
    id: 'detail-panel',
    lane: 'development',
    quote: '“항목을 누르면 상세 정보를 부드럽게 펼쳐줘.”',
    reason: '패널 배치 · 항목 조회 · 펼침 효과',
    decision: '정보를 놓을 자리, 가져올 값, 펼치는 움직임이 각각 필요합니다.',
    jobs: { screen: '패널 배치', data: '항목 조회', motion: '펼침 효과' },
    route: '세 작업을 나눠 맡깁니다.',
    work: '세 담당이 동시에 작업합니다.',
    review: '세 결과가 모이면 함께 검토합니다.',
    issue: {
      owner: 'data',
      label: '항목 정보 불일치',
      fix: '조회 값 수정',
      finding: '다른 항목의 정보가 보입니다. 조회한 값을 확인해야 합니다.',
      back: '데이터 담당만 조회 값을 다시 확인합니다.',
      repair: '화면과 모션은 완료 상태로 두고 조회 값을 고칩니다.',
      retry: '고친 값을 같은 항목으로 다시 검사합니다.',
    },
    finish: '같은 항목을 다시 눌러 상세 정보가 맞는지 확인했습니다.',
  },
];

export function routingCaption(
  request: RoutingRequest,
  phase: RoutingPhase,
  reduced: boolean
) {
  const issue = request.issue;
  if (reduced) {
    if (request.lane === 'design')
      return issue ? request.decision + ' ' + issue.repair : request.work;
    return issue
      ? request.decision + ' ' + issue.back + ' ' + issue.retry
      : request.decision;
  }
  switch (phase) {
    case 'request':
      return request.lane === 'design'
        ? '요청에서 사용자가 막힌 지점을 찾습니다.'
        : '요청이 들어왔습니다.';
    case 'judge':
    case 'outlet':
      return request.decision;
    case 'route':
      return request.route;
    case 'work':
      return request.work;
    case 'join':
      return request.review;
    case 'issue':
      return issue?.finding ?? issue?.back ?? request.review;
    case 'back':
      return issue?.back ?? request.decision;
    case 'fix':
      return issue?.repair ?? request.work;
    case 'retry':
      return issue?.retry ?? request.decision;
    case 'done':
      return request.finish;
  }
}
