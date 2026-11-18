import type { AiPractice } from '@/dto/ai-practice.dto';
import { ROUTE } from '@/constants/navigation';

export const aiPractice: AiPractice = {
  title: 'AI 활용 방식',
  description:
    '디자인·개발 요청에 따라 AI와 작업을 나누는 방법, 검토 결과를 담당자에게 돌려보내고 다시 확인하는 과정을 소개합니다.',
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
