import type { AiPractice } from '@/dto/ai-practice.dto';
import { GROUP_ID, GROUP_LABEL } from '@/constants/case';
import { ROUTE } from '@/constants/navigation';
import { aiCheckFlow } from '@/content/ai-practice-checks';

export const aiPractice: AiPractice = {
  title: 'AI 활용 방식',
  description:
    '저장소 지침으로 AI에 작업 범위를 전달하고, lint 기준선과 화면 비교 도구로 작업 결과를 확인합니다.',
  summary:
    '저장소 지침으로 AI에 코딩 규칙과 작업 범위를 전달합니다. lint 기준선과 화면 비교 도구로 AI와 진행한 작업의 결과를 확인합니다.',
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
      summary: '여러 저장소에 함께 적용할 작업 습관을 정합니다.',
      example: '예: 계획 문서는 저장소 밖에 두기',
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

  checks: aiCheckFlow,

  engineeringTitle: '반복 확인을 검사로 옮긴 사례',
  techNotes: [
    {
      id: 'lint-baseline',
      title: 'lint 기준선 — 위반 총수 비교와 단계적 정리',
      fields: [
        {
          label: '상황',
          body: [
            'NestJS API 서버에 기존 lint 위반이 많아, 오류·경고 0건을 즉시 통과 조건으로 삼으면 기존 위반 때문에 검사에 실패하는 상태였습니다. 먼저 위반 총수가 늘어나는 것을 막고, 기존 위반은 단계적으로 정리할 수 있도록 기준선을 두었습니다.',
          ],
        },
        {
          label: '처리',
          body: [
            '전체 lint 정리를 직접 담당했습니다. 처음 집계한 오류·경고 수를 기준선 파일에 기록하고, 지정한 브랜치의 PR 검사에서 기준선을 넘으면 실패하도록 구성했습니다. Claude Code를 활용해 타입을 정리하고 변경 코드를 검토했으며, 정리한 만큼 기준선을 낮춰 허용하는 위반 수를 줄였습니다.',
          ],
        },
        {
          label: '처리 결과',
          body: [
            '기존 오류 2,669건·경고 111건을 모두 정리하고 기준선을 0건으로 낮췄습니다. 이 과정에서 승인 수량이 잘못 표시되거나 검색 결과의 리뷰 통계가 빠지는 문제도 고치고 관련 테스트를 추가했습니다.',
          ],
        },
        {
          label: '검증 범위',
          body: [
            '서버 src 폴더의 ESLint 오류·경고 총수를 비교합니다. 총수만 비교하므로 새로 생긴 위반을 개별로 가려내지는 않습니다.',
          ],
        },
      ],
    },
    {
      id: 'screen-compare',
      title: '화면 비교 — AI의 보고를 비교 결과와 함께 확인',
      fields: [
        {
          label: '상황',
          body: [
            '시안에 맞췄다는 보고만으로는 구현 화면에 어떤 차이가 남아 있는지 판단하기 어려웠습니다.',
          ],
        },
        {
          label: '처리',
          body: [
            '시안과 구현 화면에서 대응하는 요소의 위치·서체·색과 픽셀 차이를 비교하는 도구를 AI와 함께 추가하고, 도구 출력 없이 일치한다고 보고하지 않도록 작업 지침에 적었습니다.',
            '설계 문서의 표와 코드의 화면 문구를 대조하는 검사는 별도로 만들어 lint 명령에 연결했습니다.',
          ],
        },
        {
          label: '처리 결과',
          body: [
            'HTTP 오류나 빈 화면, 대응 요소가 없는 경우를 측정 실패로 구분해, 비교하지 못한 실행을 성공으로 보지 않도록 보완했습니다.',
          ],
        },
        {
          label: '검증 범위',
          body: [
            '로컬에서 실행하는 검사입니다. 화면 비교는 시안과 구현에서 대응하는 요소를 찾은 경우에만 결과를 내고, 문구 검사는 설계 문서가 있는 환경에서만 lint와 함께 실행됩니다.',
          ],
        },
      ],
    },
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
      '개인 공통·저장소·작업별 지침으로 AI에 전달할 맥락과 변경 범위를 정합니다.',
      '필요한 검사를 지정하고, 다른 AI 도구의 리뷰도 실제 코드와 대조합니다.',
      '반복되는 확인은 검사 스크립트와 개인 환경의 훅으로 보완합니다.',
    ],
    link: { label: 'AI 활용 방식 보기', href: ROUTE.AI_PRACTICE },
  },
};
