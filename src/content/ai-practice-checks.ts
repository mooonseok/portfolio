import type { AiCheckFlow } from '@/dto/ai-practice.dto';
import { AI_CHECK_KIND } from '@/constants/ai-practice';

export const aiCheckFlow: AiCheckFlow = {
  title: '요청에서 지침 반영까지',
  loopLabel: '다음 요청의 지침으로',
  stages: [
    {
      id: 'request',
      label: '요청',
      body: '저장소 지침과 이번 작업의 지시를 함께 전달합니다.',
      device: {
        kind: AI_CHECK_KIND.GUIDE,
        name: '작업 지침',
        items: [
          '개인 공통 — 계획 문서는 저장소 밖에 두기',
          '저장소 — 계층별 금지 사항, 요청·응답 DTO 분리, 검사 명령',
          '작업별 — 변경 범위와 완료 기준',
        ],
      },
    },
    {
      id: 'plan',
      label: '계획·진단',
      body: '영향 범위가 큰 변경은 계획과 선택지를 먼저 받고, 원인이 불분명한 문제는 수정 전에 원인과 근거부터 확인합니다.',
      device: {
        kind: AI_CHECK_KIND.DECISION,
        name: '진행 전 판단',
        items: [
          '계획과 선택지를 보고 진행 여부 결정',
          '원인과 근거를 확인한 뒤에 수정',
        ],
      },
    },
    {
      id: 'build',
      label: '구현',
      body: '정한 범위 안에서 구현을 요청합니다. 명령이 실행되기 전에 개인 환경에 등록한 훅이 먼저 확인합니다.',
      device: {
        kind: AI_CHECK_KIND.HOOK,
        name: '실행 전 훅',
        items: [
          '공용 브랜치에서 커밋하면 멈추고 작업 브랜치를 안내 (Claude Code)',
          '환경설정 파일(.env) 수정 차단 (Claude Code)',
          '비밀값으로 보이는 문자열, 삭제·초기화 같은 위험 명령 차단 (Codex)',
        ],
      },
    },
    {
      id: 'check',
      label: '검사',
      body: '필요한 lint·타입 검사·테스트·빌드를 지정하고, 실행 결과와 확인하지 못한 범위를 함께 봅니다.',
      device: {
        kind: AI_CHECK_KIND.CHECK,
        name: '검사 결과',
        items: [
          'lint·타입 검사·테스트·빌드 실행 결과',
          'PR 검사의 lint 기준선 (NestJS API 서버)',
          '시안과 구현 화면 비교 도구 (로컬)',
        ],
      },
    },
    {
      id: 'review',
      label: '교차 검토',
      body: '다른 AI 도구의 리뷰를 받고, 지적마다 실제 코드와 대조한 뒤 반영합니다.',
      device: {
        kind: AI_CHECK_KIND.REVIEW,
        name: '리뷰와 대조',
        items: [
          '다른 AI 도구의 리뷰',
          '지적을 실제 코드와 대조해 반영 여부 결정',
        ],
      },
    },
    {
      id: 'feedback',
      label: '지침 반영',
      body: '반복되는 수정 사항은 작업 지침에 추가하고, 반복되는 확인은 검사로 옮겨 다음 요청부터 적용합니다.',
      device: {
        kind: AI_CHECK_KIND.FEEDBACK,
        name: '다음 요청으로',
        items: [
          '반복되는 수정 → 작업 지침',
          '반복되는 확인 → 검사 스크립트 (아래 사례)',
        ],
      },
    },
  ],
};
