import { CASE_LENGTH, PROJECT_SLUG, PROJECT_TIER } from '@/constants/project';
import { STATUS_KIND } from '@/constants/status';
import { VISUAL_ID } from '@/constants/visual';
import type { Project } from '@/dto/project.dto';
import { indianBobCase } from './indian-bob-case';

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
      id: VISUAL_ID.INDIANBOB_HOME,
      alt: '모바일 화면과 관리자 화면이 겹쳐 놓인 추상 구성 — 개념 이미지',
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
      id: VISUAL_ID.INDIANBOB_APP,
      alt: '모바일 서피스 추상 — 개념 이미지',
      brief: 'mobile surface, 3:4',
    },
    admin: {
      id: VISUAL_ID.INDIANBOB_ADMIN,
      alt: '관리자 서피스 추상 — 개념 이미지',
      brief: 'admin surface, 4:3',
    },
  },
  case: indianBobCase,
};
