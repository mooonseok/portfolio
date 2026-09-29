import { CASE_LENGTH, PROJECT_SLUG, PROJECT_TIER } from '@/constants/project';
import { STATUS_KIND } from '@/constants/status';
import { VISUAL_ID } from '@/constants/visual';
import type { Project } from '@/dto/project.dto';
import { farmfamPlusCase } from './farmfam-plus-case';

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
      id: VISUAL_ID.FARMFAM_HOME,
      alt: '상자와 라벨, 재고 태그가 놓인 커머스 정물 — 개념 이미지',
      brief: 'FARMFAM+ — commerce still life, 4:5',
      pins: [
        {
          label: 'ORDER',
          x: 14,
          y: 22,
          tablet: { x: 10, y: 20 },
          mobile: { x: 8, y: 18 },
        },
        {
          label: 'INVENTORY',
          x: 46,
          y: 54,
          tablet: { x: 44, y: 54 },
          mobile: { x: 40, y: 60 },
        },
        {
          label: 'REWARD',
          x: 22,
          y: 78,
          tablet: { x: 18, y: 80 },
          hideOnMobile: true,
        },
      ],
    },
    hero: {
      id: VISUAL_ID.FARMFAM_HERO,
      alt: '커머스 정물 와이드 — 개념 이미지',
      brief: 'FARMFAM+ — wide still life, 3:2',
    },
    detail: {
      id: VISUAL_ID.FARMFAM_DETAIL,
      alt: '라벨과 재고 태그 클로즈업 — 개념 이미지',
      brief: 'FARMFAM+ — label close-up, 4:5',
    },
  },
  case: farmfamPlusCase,
};
