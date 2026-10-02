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
  num: '03',
  title: 'FARMFAM+',
  category: 'COMMERCE SYSTEM',
  period: '2025—2026 중 참여',
  tier: PROJECT_TIER.SELECTED,
  caseLength: CASE_LENGTH.FULL,
  status: [{ kind: STATUS_KIND.PRODUCT, label: 'PRODUCT WORK' }],
  surfaces: 'Web / API / DB',
  summary:
    '공동구매와 시크릿딜을 제공하는 농산물 커머스입니다. 판매 설정, 가격·수량 처리와 주문 변경 흐름을 개발했습니다.',
  home: {
    features: [
      {
        title: '공동구매',
        body: ['목표 수량·진행 상태·종료 처리와 판매 설정'],
      },
      {
        title: '시크릿딜',
        body: ['시간에 따른 가격 구간과 주문 시 가격 재확인'],
      },
      {
        title: '주문·판매 운영',
        body: ['관리자 판매 설정과 취소 시 공동구매·재고 정정'],
      },
    ],
    scope: [
      'Product',
      'Order',
      'Inventory',
      'Group Purchase',
      'Promotion',
      'Admin',
    ],
    scopeMobile: ['Product', 'Order', 'Inventory', 'Group Purchase'],
    flows: [],
    cta: 'CASE STUDY',
  },
  visuals: {
    home: {
      caption: '농산물 커머스를 표현한 개념 이미지',
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
