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
    flows: [],
    areas: [
      {
        id: 'order',
        label: 'ORDER',
        sub: '주문·취소',
        title: '취소 이후의 상태까지',
        body: '주문 취소 경로에 공동구매 상태 정정과 재고 복원을 연결했습니다.',
        related: ['공동구매', '재고'],
      },
      {
        id: 'group-purchase',
        label: 'GROUP PURCHASE',
        sub: '공동구매',
        title: '함께 바뀌는 진행 상태',
        body: '활성 공동구매와 수량 진행 상태를 같은 트랜잭션 범위에서 처리하는 구현을 사용했습니다.',
        related: ['주문', '진행 수량'],
      },
      {
        id: 'inventory',
        label: 'INVENTORY',
        sub: '재고',
        title: '취소 경로에 연결된 재고 복원',
        body: '주문 취소 서비스의 취소 경로에 재고 복원을 연결하고, 관련 회귀 테스트도 함께 변경했습니다.',
        related: ['주문 취소', '데이터 일관성'],
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
