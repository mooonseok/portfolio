import type { WorkflowRequest } from '@/dto/ai-workflow.dto';

export const buttonLayout: WorkflowRequest = {
  id: 'feature',
  label: '개발',
  exampleLabel: '버튼 배치 변경',
  example: '모바일에서 저장 버튼을 입력란 바로 아래로 옮겨 주세요.',
  workers: [{ id: 'screen', label: '화면', task: '버튼 배치' }],
  stages: [
    {
      label: '요청 확인',
      owner: '요청자와 화면 담당',
      body: '모바일에서 입력을 마친 사람이 바로 저장할 수 있도록 버튼 위치를 바꿉니다.',
    },
    {
      label: '완료 기준',
      owner: '요청자와 화면 담당',
      body: '모바일에서 버튼이 마지막 입력란 아래에 보이고, 키보드로도 입력란에서 버튼으로 이동할 수 있어야 합니다.',
    },
    {
      label: '담당 선택',
      owner: '화면 담당',
      body: '저장 기능은 이미 있습니다. 바꿀 곳은 버튼의 위치뿐이라 화면 담당 한 명이 맡습니다.',
    },
    {
      label: '화면 작업',
      owner: '화면 담당',
      body: '모바일 레이아웃에서 버튼을 입력란 아래에 놓고, 좁은 화면에서도 두 요소 사이에 여백을 둡니다.',
    },
    {
      label: '검사 요청',
      owner: '화면 담당',
      body: '수정한 화면과 버튼이 보여야 할 위치를 검증 담당에게 전달합니다.',
    },
    {
      label: '자동 검사',
      owner: '검증 담당',
      body: '기존 테스트와 빌드를 실행해 버튼 배치를 바꾼 뒤에도 검사를 통과하는지 확인합니다.',
    },
    {
      label: '독립 검토',
      owner: '구현을 맡지 않은 검토자',
      body: '모바일 너비에서 입력란 아래의 버튼을 눌러 봅니다. 키보드로도 같은 순서로 이동해 저장할 수 있는지 확인합니다.',
    },
    {
      label: '결과 전달',
      owner: '화면 담당',
      body: '버튼을 옮긴 화면과 검토한 결과를 요청자에게 보여 줍니다.',
    },
  ],
  issues: [
    {
      id: 'implementation',
      label: '화면 오류',
      source: 6,
      target: 3,
      owner: 'screen',
      reason:
        '좁은 화면에서 저장 버튼이 입력란을 가렸습니다. 화면 담당이 배치를 고치고 같은 너비에서 다시 확인합니다.',
    },
  ],
};
