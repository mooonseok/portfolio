import type { CaseContent } from '@/dto/case.dto';
import { indianBobFeature } from './indian-bob-feature';

export const indianBobCase: CaseContent = {
  role: [
    '4인 팀에서 해빗 기능의 앱 화면·관리자 웹·서버 API와 팀 관련 기능을 개발했습니다.',
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
      title: '해빗 이용',
      body: [
        'Flutter 앱에서 해빗을 이용하는 화면과 상태 처리, 단계별 입력 검증을 개발했습니다.',
      ],
    },
    {
      title: '관리자 운영',
      body: [
        '해빗 생성·수정·복제와 이벤트 관리 화면, 기간·숫자·이미지 입력 검증을 개발했습니다.',
      ],
    },
    {
      title: '팀 기능',
      body: [
        '팀 생성·수정과 공개 설정에 따른 가입 처리, 수정 권한을 확인하는 서버 로직을 작업했습니다.',
      ],
    },
  ],
  decisions: [],
  techNotes: [
    {
      id: 'habit-admin-validation',
      title: '해빗 복제와 입력 검증',
      fields: [
        {
          label: '문제',
          body: [
            '해빗 생성과 복제에서는 기간, 숫자와 이미지 입력의 형태를 함께 처리해야 했습니다.',
          ],
        },
        {
          label: '구현',
          body: [
            '관리자 입력 검증에서 이미지 URL과 새 파일 입력을 구분하고 기간·숫자 조건을 확인했습니다. 앱에서는 단계별 입력을 검증했습니다.',
          ],
        },
        {
          label: '범위',
          body: ['이 사례의 범위는 해빗 생성·복제의 입력 검증입니다.'],
        },
      ],
    },
    {
      id: 'requirements-data',
      title: '앱·웹·API의 요구사항과 데이터 정렬',
      fields: [
        {
          label: '상황',
          body: [
            '요구사항을 서로 다르게 이해하거나 DB 설계가 바뀌는 과정에서 화면과 서버의 처리 기준을 다시 확인해야 했습니다.',
          ],
        },
        {
          label: '협업',
          body: [
            '팀원들과 기능 동작과 데이터 구조를 조율하고, 합의한 변경을 앱·관리자 웹·API에 반영했습니다.',
          ],
        },
      ],
    },
  ],

  currentState: [
    '하나의 기능을 여러 영역에서 구현하면서 화면에 필요한 데이터와 서버의 처리 방식이 맞물리는 부분을 함께 살폈습니다.',
  ],
};
