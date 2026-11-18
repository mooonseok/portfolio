import type { AiCheckFlow } from '@/dto/ai-practice.dto';

export const aiCheckFlow: AiCheckFlow = {
  title: '광장 이름표가 가려졌을 때',
  loopLabel: '다시 검사',
  stages: [
    {
      id: 'request',
      label: '기준 정하기',
      body: '어느 단말을 눌러도 네 프로젝트의 이름을 읽을 수 있어야 했습니다.',
      evidence: ['휴대폰에서도 체스판 타일의 가로·세로 비율은 2:1'],
    },
    {
      id: 'plan',
      label: '시안 고르기',
      body: '세 가지 시안을 비교해 광장을 골랐습니다. 휴대폰에서 길게 늘어진 타일은 실제 화면에 적용하기 전에 바로잡았습니다.',
      evidence: [],
    },
    {
      id: 'build',
      label: '나눠 만들기',
      body: '홈의 체스판과 선택 패널은 한 담당에게, 이력과 상세 화면은 다른 담당에게 맡겼습니다.',
      evidence: ['두 작업은 같은 헤더와 색을 사용'],
    },
    {
      id: 'check',
      label: '가림 찾기',
      body: '구현을 맡지 않은 검토자가 데스크톱에서 패널을 열어 보니 ‘블로그 자동화’ 이름표 끝이 가려졌습니다.',
      evidence: ['1280px와 1440px에서 재현 · 전체 선택 상태 44개 중 5개'],
    },
    {
      id: 'repair',
      label: '패널 옮기기',
      body: '문제가 생긴 화면과 너비를 홈 담당에게 돌려보냈습니다. 패널을 열 때만 오른쪽에 자리를 내고, 휴대폰에서는 체스판 아래에 놓았습니다.',
      evidence: [],
    },
    {
      id: 'verify',
      label: '다시 확인하기',
      body: '11개 화면 너비에서 네 단말을 하나씩 다시 눌렀습니다. 44가지 조합 모두에서 이름표와 패널이 겹치지 않았습니다.',
      evidence: ['Escape로 패널을 닫으면 선택한 단말로 키보드 초점 복귀'],
    },
  ],
};

export const plazaExampleCopy = {
  label: '블로그 자동화',
  panel: '최근 작업',
  idle: '광장 위 블로그 자동화 단말과 이름표',
  overlap: '패널을 열자 이름표의 오른쪽이 가려진 모습',
  fixed: '단말과 패널의 자리를 나눠 이름표 전체가 보이는 모습',
};
