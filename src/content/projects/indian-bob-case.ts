import type { CaseContent } from '@/dto/case.dto';

export const indianBobCase: CaseContent = {
  role: [
    'Flutter 앱에서 커뮤니티·매칭·해빗·이벤트·프로필·알림 등의 기능을 작업했습니다.',
    'NestJS API에서는 부족·해빗·이벤트·인증·알림 관련 기능을 작업했고, Next.js 관리자에서는 해빗·이벤트·사용자·배너 운영 기능을 작업했습니다.',
  ],
  roleSurfaces: [
    { label: 'APP', sub: 'Flutter' },
    { label: 'API', sub: 'NestJS' },
    { label: 'ADMIN', sub: 'Next.js' },
  ],
  contextProblem: [
    'IndianBob는 사용자용 모바일 앱만으로 끝나는 서비스가 아니라, 앱에서 사용하는 기능을 제공하는 API와 운영자가 사용하는 관리자 웹이 함께 존재하는 제품이었습니다.',
    '따라서 하나의 기능을 구현할 때 사용자 앱, 서버의 데이터·비즈니스 로직, 관리자에서 설정하고 관리하는 흐름을 함께 다루는 경우가 있었습니다.',
  ],
  systemFlows: [],
  featureFlow: {
    id: 'habit',
    label: 'HABIT',
    nodes: [
      { label: 'ADMIN', sub: 'Habit 설정' },
      { label: 'API', sub: '해빗 / 이벤트 데이터 및 관련 로직' },
      { label: 'MOBILE', sub: '사용자 참여' },
      { label: 'REWARD / SCORE', sub: '보상 및 활동 점수 처리' },
    ],
  },
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
      title: 'Community / Matching',
      body: [
        '모바일 앱의 부족 커뮤니티, 매칭 및 관련 UI와 서버 API를 작업했습니다.',
      ],
    },
    {
      title: 'Habit / Event',
      body: [
        '모바일 앱의 해빗·이벤트 기능, NestJS API의 관련 로직, Next.js 관리자에서 해빗 생성·수정·복제와 이벤트 관리 기능을 작업했습니다.',
      ],
    },
    {
      title: 'Reward / Score',
      body: [
        '해빗 보상 처리 및 아동 활동 점수 누적/upsert와 관련된 서버 작업을 수행했습니다.',
      ],
    },
    {
      title: 'Authentication',
      body: [
        '앱 초기 인증 연결과 서버 인증 개선, 자동 부족 가입 등 인증 흐름을 작업했습니다.',
      ],
    },
    {
      title: 'Notifications',
      body: ['모바일 알림 UI와 서버 알림 관련 기능을 작업했습니다.'],
    },
    {
      title: 'Admin Tools',
      body: [
        '해빗·이벤트·키트·사용자·배너 관리자 기능과 기간·숫자 입력 검증, 이벤트 페이지 QA/리팩터링 등을 작업했습니다.',
      ],
    },
  ],
  decisions: [],
  techNotes: [],
  engineeringNote: {
    title: 'Apple Sign-in — Android integration',
    flow: [
      { label: 'APPLE CALLBACK' },
      { label: 'SERVER' },
      { label: 'ANDROID INTENT' },
      { label: 'APP' },
    ],
    fields: [
      {
        label: 'Context',
        body: [
          'Android 환경에서 Apple 로그인 callback 결과를 앱으로 다시 전달해야 하는 연동 흐름이 필요했습니다.',
        ],
      },
      {
        label: 'Handling',
        body: [
          'Node.js/Express 기반 보조 서버에서 Apple callback을 받은 뒤 Android intent deep link로 앱에 전달하고 code exchange를 처리하는 흐름을 작업했습니다.',
        ],
      },
      { label: 'Scope', body: ['이 구현은 예제 기반 보조 서버입니다.'] },
    ],
  },
  currentState: [
    'Flutter 앱, NestJS API, Next.js 관리자 웹에서 각각 작업 이력이 존재하며 2024년부터 2026년까지 기능 개발과 QA/유지보수 작업이 이어졌습니다.',
  ],
};
