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
        '팀 생성·수정과 자동 승인 여부에 따른 가입 처리, 설정 변경 권한을 확인하는 서버 로직을 작업했습니다.',
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
            '기존 해빗을 복제할 때 이미지 URL을 유지하는 입력과 새 이미지 파일을 올리는 입력을 모두 처리해야 했습니다.',
          ],
        },
        {
          label: '구현',
          body: [
            '기존 이미지 URL은 재사용하고 새 파일만 업로드한 뒤 생성 요청에 URL을 넣었습니다. 기간·숫자 필수값과 종료일이 시작일보다 뒤인지도 검증했습니다.',
          ],
        },
        {
          label: '처리 결과',
          body: [
            '기존 이미지를 유지하거나 교체하면서 해빗을 복제할 수 있도록 입력을 생성 API 형식으로 변환했습니다. 카테고리 미선택과 잘못된 기간 입력은 제출 전에 안내했습니다.',
          ],
        },
      ],
    },
    {
      id: 'requirements-data',
      title: '팀 가입 정책과 설정 권한',
      fields: [
        {
          label: '상황',
          body: [
            '팀 공개 여부와 가입 승인 방식은 별도 설정입니다. 가입 요청은 승인 정책에 맞게 처리하고, 설정 변경은 리더 권한을 확인해야 했습니다.',
          ],
        },
        {
          label: '처리',
          body: [
            '자동 승인 팀은 정원을 확인한 뒤 회원으로 등록하고, 수동 승인 팀은 가입 요청을 저장합니다. 기존 회원과 중복 요청을 확인하고, 설정 변경 시 리더 권한을 검사합니다.',
          ],
        },
      ],
    },
  ],

  currentState: [
    '하나의 기능을 여러 영역에서 구현하면서 화면에 필요한 데이터와 서버의 처리 방식이 맞물리는 부분을 함께 살폈습니다.',
  ],
};
