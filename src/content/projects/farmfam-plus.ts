import { CASE_LENGTH, PROJECT_SLUG, PROJECT_TIER } from '@/constants/project';
import { STATUS_KIND } from '@/constants/status';
import { VISUAL_ID } from '@/constants/visual';
import type { Project } from '@/dto/project.dto';
import { farmfamPlusCase } from './farmfam-plus-case';

const mainVisual = {
  src: '/images/projects/farmfam/main.jpg',
  alt: '농산물 포장과 재고를 표현한 개념 이미지',
};

export const farmfamPlus: Project = {
  slug: PROJECT_SLUG.FARMFAM_PLUS,
  num: '01',
  title: 'FARMFAM+',
  category: 'COMMERCE SYSTEM',
  period: '2025—2026',
  tier: PROJECT_TIER.SELECTED,
  caseLength: CASE_LENGTH.FULL,
  status: [{ kind: STATUS_KIND.PRODUCT, label: 'PRODUCT WORK' }],
  surfaces: 'Web / API / DB',
  summary:
    '상품, 주문, 공동구매, 재고, 프로모션처럼 서로 연결된 커머스 상태를 웹·API·DB 전반에서 개발했습니다.',
  home: {
    scope: [
      'Product',
      'Order',
      'Inventory',
      'Group Purchase',
      'Promotion',
      'Admin',
    ],
    scopeMobile: ['Product', 'Order', 'Inventory', 'Group Purchase'],
    flows: [
      {
        id: 'commerce',
        nodes: [
          { label: 'ORDER' },
          { label: 'GROUP PURCHASE', hideOnMobile: true },
          { label: 'INVENTORY' },
          { label: 'REWARD' },
          { label: 'SETTLEMENT', hideOnMobile: true },
        ],
      },
    ],
    cta: 'CASE STUDY',
  },
  visuals: {
    home: {
      ...mainVisual,
      sizes:
        '(min-width: 1440px) 644px, (min-width: 1024px) calc(50vw - 58px), (min-width: 744px) calc(62.5vw - 57.5px), 100vw',
      id: VISUAL_ID.FARMFAM_HOME,
      brief: 'FARMFAM+ — commerce still life, 4:5',
    },
    hero: {
      ...mainVisual,
      sizes: '100vw',
      position: '50% 65%',
      id: VISUAL_ID.FARMFAM_HERO,
      brief: 'FARMFAM+ — wide still life, 3:2',
    },
    detail: {
      ...mainVisual,
      sizes: '(min-width: 1024px) 40vw, (min-width: 744px) 50vw, 100vw',
      position: '50% 70%',
      id: VISUAL_ID.FARMFAM_DETAIL,
      brief: 'FARMFAM+ — label close-up, 4:5',
    },
  },
  case: farmfamPlusCase,
};
