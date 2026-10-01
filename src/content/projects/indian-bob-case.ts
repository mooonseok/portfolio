import type { CaseContent } from '@/dto/case.dto';
import { indianBobFeature } from './indian-bob-feature';

export const indianBobCase: CaseContent = {
  role: [
    '4인 팀에서 해빗 기능의 앱 화면, 관리자 웹, 서버 API 개발을 맡았습니다.',
  ],
  roleSurfaces: [
    { label: 'APP', sub: 'Flutter' },
    { label: 'API', sub: 'NestJS' },
    { label: 'ADMIN', sub: 'Next.js' },
  ],
  contextProblem: [
    '같은 요구사항을 서로 다르게 이해하거나 DB 설계가 변경되는 과정에서, 팀원들과 기능의 동작과 데이터 구조를 다시 확인했습니다. 합의한 내용을 앱·관리자 웹·서버에 반영하며 개발을 진행했습니다.',
  ],
  systemFlows: [],
  feature: indianBobFeature,
  surfaceRelation: {
    label: 'USER → MOBILE APP → API → DATA, ADMIN connected to API',
    rows: [
      { label: 'USER' },
      { label: 'APP', wide: 'MOBILE APP' },
      { label: 'API', branch: { label: 'ADMIN' } },
      { label: 'DATA' },
    ],
  },
  work: [
    {
      title: 'Flutter App',
      body: [
        '사용자가 해빗 기능을 이용하는 앱 화면과 상태 처리를 개발했습니다.',
      ],
    },
    {
      title: 'Admin Web',
      body: ['해빗 기능을 관리하는 웹 화면을 개발했습니다.'],
    },
    {
      title: 'Server API',
      body: ['앱과 관리자 웹에 필요한 해빗 API와 데이터 처리를 개발했습니다.'],
    },
  ],
  decisions: [],
  techNotes: [],

  currentState: [
    '하나의 기능을 여러 영역에서 구현하면서 화면에 필요한 데이터와 서버의 처리 방식이 맞물리는 부분을 함께 살폈습니다.',
  ],
};
