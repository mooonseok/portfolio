import type { WorkflowRequest } from '@/dto/ai-workflow.dto';

export const circuitCopy = {
  title: 'AI와 일하는 방식',
  request: '요청',
  controls: '재생할 요청',
  result: '검토 결과',
  pass: '바로 통과',
  replay: '다시 보기',
  next: '다음 단계',
  pause: '일시정지',
  resume: '계속 재생',
  review: '수정한 결과를 같은 기준으로 다시 검토합니다.',
};

export const workflows: WorkflowRequest[] = [
  {
    id: 'design',
    label: '디자인',
    stages: [
      {
        label: '요청 확인',
        owner: '요청자와 디자인 담당',
        body: '새 화면의 목적과 바꿀 부분을 확인합니다.',
      },
      {
        label: '방향 선택',
        owner: '요청자와 디자인 담당',
        body: '요청자와 디자인 담당이 화면에서 먼저 보여줄 내용을 정합니다.',
      },
      {
        label: '시안 제작',
        owner: '디자인 담당',
        body: '디자인 담당이 선택한 방향으로 화면을 그립니다.',
      },
      {
        label: '시안 검토',
        owner: '검토자',
        body: '시안을 만들지 않은 검토자가 화면을 살펴봅니다.',
      },
      {
        label: '요청자 승인',
        owner: '요청자',
        body: '검토를 마친 시안을 요청자가 보고 확정합니다.',
      },
    ],
    issues: [
      {
        id: 'draft',
        label: '글자 겹침',
        target: 2,
        reason: '겹친 글자를 고치러 시안 제작으로 돌아갑니다.',
      },
      {
        id: 'direction',
        label: '방향 불일치',
        target: 1,
        reason: '강조할 내용을 다시 정하러 방향 선택으로 돌아갑니다.',
      },
    ],
  },
  {
    id: 'feature',
    label: '개발',
    stages: [
      {
        label: '요청 확인',
        owner: '요청자와 개발 담당',
        body: '새 기능이 어떻게 동작해야 하는지 합의합니다.',
      },
      {
        label: '연결 설계',
        owner: '개발 담당',
        body: '개발 담당이 화면과 데이터가 주고받을 값을 정합니다.',
      },
      {
        label: '기능 구현',
        owner: '화면·데이터 담당',
        body: '담당자가 화면과 데이터를 구현해 연결합니다.',
      },
      {
        label: '동작 검토',
        owner: '검토자',
        body: '구현을 맡지 않은 검토자가 실제 화면에서 동작을 확인합니다.',
      },
      {
        label: '기능 확인',
        owner: '개발 담당과 검토자',
        body: '검사를 통과한 기능과 확인 결과를 전달합니다.',
      },
    ],
    issues: [
      {
        id: 'implementation',
        label: '동작 오류',
        target: 2,
        reason: '합의한 동작대로 고치러 기능 구현으로 돌아갑니다.',
      },
      {
        id: 'contract',
        label: '데이터 불일치',
        target: 1,
        reason: '주고받을 값을 다시 맞추러 연결 설계로 돌아갑니다.',
      },
    ],
  },
];
