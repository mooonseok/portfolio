import type { AiCheckFlow } from '@/dto/ai-practice.dto';

export const aiCheckFlow: AiCheckFlow = {
  title: '요청에서 지침 반영까지',
  loopLabel: '다음 요청의 지침으로',
  stages: [
    {
      id: 'request',
      label: '요청',
      body: '바꿀 범위와 완료 기준을 정해 전달합니다.',
      evidence: ['공통·저장소 지침을 이번 요청에 함께 적용'],
    },
    {
      id: 'plan',
      label: '계획·진단',
      body: '영향이 큰 변경은 선택지를 보고 진행 여부를 정합니다.',
      evidence: ['원인이 불분명하면 수정 전에 코드와 근거부터 확인'],
    },
    {
      id: 'build',
      label: '구현',
      body: '정한 범위 안에서 구현하고, 실행 전 훅으로 위험한 변경을 막습니다.',
      evidence: [
        'Claude Code: 공용 브랜치 커밋 중단·작업 브랜치 안내, .env 수정 차단',
        'Codex: 비밀값 의심 문자열과 삭제·초기화 명령 차단',
      ],
    },
    {
      id: 'check',
      label: '검사',
      body: '검사 결과와 확인하지 못한 범위를 함께 확인합니다.',
      evidence: [
        'lint·타입 검사·테스트·빌드 결과',
        'API 서버 PR의 lint 기준선과 로컬 화면 비교 도구',
      ],
    },
    {
      id: 'review',
      label: '교차 검토',
      body: '다른 AI의 지적을 실제 코드와 대조하고 반영 여부를 정합니다.',
      evidence: [],
    },
    {
      id: 'feedback',
      label: '지침 반영',
      body: '반복된 수정은 지침으로, 반복된 확인은 검사로 옮깁니다.',
      evidence: [],
    },
  ],
};
