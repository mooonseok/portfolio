import { CASE_LENGTH, PROJECT_SLUG, PROJECT_TIER } from '@/constants/project';
import { STATUS_KIND } from '@/constants/status';
import { VISUAL_ID } from '@/constants/visual';
import type { Project } from '@/dto/project.dto';
import { indianBobCase } from './indian-bob-case';

const mainVisual = {
  src: '/images/projects/indian-bob/main-restored.png',
  alt: '모바일과 관리자 기기의 연결을 표현한 개념 이미지',
};

export const indianBob: Project = {
  slug: PROJECT_SLUG.INDIAN_BOB,
  num: '04',
  title: 'INDIAN BOB',
  category: 'APP / API / ADMIN',
  period: '2024—2025',
  tier: PROJECT_TIER.FEATURED,
  caseLength: CASE_LENGTH.MEDIUM,
  status: [{ kind: STATUS_KIND.PRODUCT, label: 'PRODUCT WORK' }],
  surfaces: 'App / API / Admin',
  summary:
    '해빗 기능을 Flutter 앱, 관리자 웹, 서버 API에 걸쳐 개발했습니다. 요구사항과 데이터 구조의 변경을 팀원들과 조율하며 각 영역에 반영했습니다.',
  home: {
    scope: ['Flutter App', 'Habit', 'Admin Web', 'Server API'],
    scopeMobile: ['Flutter', 'Habit', 'Web', 'API'],
    flows: [],
    cta: 'CASE STUDY',
  },
  visuals: {
    home: {
      caption: '앱과 관리자 웹의 연결을 표현한 개념 이미지',
      ...mainVisual,
      sizes:
        '(min-width: 1440px) 644px, (min-width: 1024px) calc(50vw - 58px), (min-width: 744px) calc(75vw - 65px), calc(100vw - 40px)',
      id: VISUAL_ID.INDIANBOB_HOME,
      brief: 'INDIAN BOB — mobile + admin surfaces, 4:3',
    },
    app: {
      ...mainVisual,
      sizes:
        '(min-width: 1440px) 422px, (min-width: 1024px) 33vw, (min-width: 744px) 37.5vw, 50vw',
      position: '0% 60%',
      id: VISUAL_ID.INDIANBOB_APP,
      brief: 'mobile surface, 3:4',
    },
    admin: {
      ...mainVisual,
      sizes:
        '(min-width: 1440px) 756px, (min-width: 1024px) 58.33vw, (min-width: 744px) 62.5vw, 50vw',
      position: '100% 60%',
      id: VISUAL_ID.INDIANBOB_ADMIN,
      brief: 'admin surface, 4:3',
    },
  },
  case: indianBobCase,
};
