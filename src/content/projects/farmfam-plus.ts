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
  period: '2025—2026 중 참여',
  tier: PROJECT_TIER.SELECTED,
  caseLength: CASE_LENGTH.FULL,
  status: [{ kind: STATUS_KIND.PRODUCT, label: 'PRODUCT WORK' }],
  surfaces: 'Web / API / DB',
  summary:
    '주문 취소에 맞춰 공동구매 수량과 재고를 정정하는 흐름을 보완했습니다. 취소 정책과 재고 기준을 담당자와 조율하고, 테스트 결제로 동작을 확인했습니다.',
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
        sub: '주문',
        title: '취소 처리의 진입점',
        body: '주문 취소와 연결된 공동구매 수량·상태 정정과 재고 복원 처리를 보완했습니다.',
        related: ['공동구매', '재고', '사은품 · 정산'],
        to: { label: 'Context / Problem', target: 'context' },
      },
      {
        id: 'group-purchase',
        label: 'GROUP PURCHASE',
        sub: '공동구매',
        title: '진행 수량과 상태 일관성',
        body: '취소에 따른 공동구매 수량·상태 정정을 보완했습니다. 처리 기준은 담당자와 확인하며 운영 조건에 맞춰 조정했습니다.',
        related: ['주문', '진행 수량', '다단계 보상'],
        to: {
          label: '취소 정책과 처리 기준',
          target: 'transaction-boundaries',
        },
      },
      {
        id: 'inventory',
        label: 'INVENTORY',
        sub: '재고',
        title: '취소 시 복원과 회귀 검증',
        body: '재고 복원이 주문 취소와 같은 경로에서 처리되도록 연결했습니다. 상태가 연결된 영역이라, 변경한 취소 경로에는 관련 회귀 테스트를 함께 두었습니다.',
        related: ['주문 취소', '공동구매 정정'],
        to: { label: '취소 동작 확인', target: 'regression-protection' },
      },
    ],
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
