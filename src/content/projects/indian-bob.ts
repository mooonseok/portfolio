import { CASE_LENGTH, PROJECT_SLUG, PROJECT_TIER } from '@/constants/project';
import { STATUS_KIND } from '@/constants/status';
import { VISUAL_ID } from '@/constants/visual';
import type { Project } from '@/dto/project.dto';
import { indianBobCase } from './indian-bob-case';

const mainVisual = {
  src: '/images/projects/indian-bob/main.jpg',
  alt: '모바일과 관리자 기기의 연결을 표현한 개념 이미지',
  scale: 1.1,
};

export const indianBob: Project = {
  slug: PROJECT_SLUG.INDIAN_BOB,
  num: '04',
  title: 'INDIAN BOB',
  category: 'APP / API / ADMIN',
  period: '2024—2026',
  tier: PROJECT_TIER.FEATURED,
  caseLength: CASE_LENGTH.MEDIUM,
  status: [{ kind: STATUS_KIND.PRODUCT, label: 'PRODUCT WORK' }],
  surfaces: 'App / API / Admin',
  summary:
    'Flutter 앱을 중심으로 NestJS API와 Next.js 관리자 웹까지 같은 제품의 여러 영역을 함께 개발했습니다.',
  home: {
    scope: [
      'Community / Matching',
      'Habit / Event / Reward',
      'Authentication',
      'Notifications',
      'Admin tools',
    ],
    scopeMobile: [
      'Community',
      'Matching',
      'Habit',
      'Event',
      'Reward',
      'Admin tools',
    ],
    flows: [],
    cta: 'CASE STUDY',
  },
  visuals: {
    home: {
      ...mainVisual,
      sizes:
        '(min-width: 1440px) 644px, (min-width: 1024px) calc(50vw - 58px), (min-width: 744px) calc(75vw - 65px), calc(100vw - 40px)',
      id: VISUAL_ID.INDIANBOB_HOME,
      brief: 'INDIAN BOB — mobile + admin surfaces, 4:3',
      pins: [
        {
          label: 'APP',
          x: 12,
          y: 28,
          tablet: { x: 10, y: 26 },
          hideOnMobile: true,
        },
        {
          label: 'ADMIN',
          x: 58,
          y: 62,
          tablet: { x: 56, y: 62 },
          hideOnMobile: true,
        },
      ],
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
