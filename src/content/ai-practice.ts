import type { AiPractice } from '@/dto/ai-practice.dto';
import { GROUP_ID, GROUP_LABEL } from '@/constants/case';
import { ROUTE } from '@/constants/navigation';

export const aiPractice: AiPractice = {
  title: 'AI 활용 방식',
  description:
    '디자인·개발 요청에 따라 AI와 작업을 나누는 방법, 검토 결과를 담당자에게 돌려보내고 다시 확인하는 과정을 소개합니다.',
  summary:
    '시안의 방향과 기능의 완료 기준은 제가 정합니다. AI에게는 만드는 일과 검토하는 일을 나눠 맡깁니다. 검토에서 문제가 나오면 어떤 조건에서 생겼는지 확인하고 담당자에게 돌려보냅니다.',
  meta: [
    { key: 'TOOLS', value: 'Claude Code, Codex, Claude Design' },
    {
      key: 'SCOPE',
      value: '업무 저장소(앱·관리자 웹·서버), 개인 개발 환경',
    },
    {
      key: 'ROLE',
      value: '작업 지침·검사 도구 구성, lint 전체 정리, 결과 검토',
    },
  ],

  rulesLabel: '작업 지침의 적용 범위',
  rules: [
    {
      title: '개인 공통',
      summary:
        '여러 프로젝트에서 작업을 나누고 결과를 검토하는 순서를 정합니다.',
      example:
        '예: 검토에서 문제가 나오면 재현 조건과 함께 담당자에게 돌려보내기',
    },
    {
      title: '저장소',
      summary: '팀의 코딩 규칙과 컨벤션을 작업 지침으로 옮깁니다.',
      example: '예: 계층별 금지 사항, 요청·응답 DTO 분리, 검사 명령',
    },
    {
      title: '작업별 지시',
      summary: '이번 작업의 범위와 완료 기준을 정합니다.',
      example: '예: 변경 범위, 실행할 검사, 직접 적용할 작업',
    },
  ],
  rulesNote: [
    '개인 Claude Code 환경에는 명령 실행 전에 자동으로 확인하는 스크립트(훅)를 등록했습니다. 현재 브랜치가 지정한 공용 브랜치이면 커밋 명령을 멈추고 작업 브랜치를 만들도록 안내합니다.',
  ],

  collaborationTitle: GROUP_LABEL[GROUP_ID.COLLABORATION],
  collaboration: [
    'Claude Design과 Claude Code로 업무용 MVP 목업을 만들고, 디자인팀의 도구 사용을 위한 온보딩을 진행했습니다.',
  ],

  next: {
    href: '/portfolio#work',
    title: '참여 프로젝트',
    navLabel: '참여 프로젝트로 이동',
  },

  home: {
    title: 'AI 활용 방식',
    items: [
      '공통 작업 순서에 프로젝트별 검사 기준을 더합니다.',
      '화면 구현과 검토를 나눠 맡기고 문제가 나온 조건에서 다시 확인합니다.',
      '반복되는 확인은 검사 스크립트와 개인 환경의 훅으로 보완합니다.',
    ],
    link: { label: 'AI 활용 방식 보기', href: ROUTE.AI_PRACTICE },
  },
};
