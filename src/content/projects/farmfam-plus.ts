import { FLOOR } from '@/constants/floor';
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
  boardService: '농산물 커머스',
  layers: [
    {
      floor: FLOOR.ADMIN,
      summary: '관리자 판매 설정',
      lines: [
        '상품 이미지·가격·판매 기간·공동구매 목표 수량을 설정하고 수정하는 기능을 개발했습니다.',
      ],
    },
    {
      floor: FLOOR.API,
      summary: '판매 진행·가격·주문 취소',
      lines: [
        '공동구매의 목표 수량·진행 상태·만료 후 종료 처리를 개발하고 다단계 공동구매 요구사항을 반영했습니다.',
        '접속 시점과 경과 시간에 따른 시크릿딜 가격을 계산하고 주문 생성 시 판매 조건과 가격·수량을 다시 확인했습니다.',
        '주문 취소 경로의 공동구매 상태·재고 정정, Redis 잠금과 관련 테스트를 보완했습니다.',
      ],
    },
    {
      floor: FLOOR.DB,
      summary: '공동구매 수량 정정',
      lines: [
        '활성 공동구매와 진행 수량 정정을 같은 트랜잭션에서 처리했습니다.',
      ],
    },
  ],
  summary: '공동구매와 시크릿딜로 농산물을 판매하는 서비스입니다.',
  home: {
    features: [
      {
        title: '공동구매',
        body: [
          '목표 수량과 진행 상태, 만료 후 종료 처리를 개발하고 다단계 공동구매 요구사항을 반영했습니다.',
        ],
      },
      {
        title: '시크릿딜',
        body: [
          '접속 시점과 경과 시간에 따라 가격을 계산하고, 주문 생성 시 가격과 수량을 다시 확인했습니다.',
        ],
      },
      {
        title: '판매 설정',
        body: [
          '관리자에서 상품 이미지·가격·판매 기간과 공동구매 목표 수량을 설정하는 기능을 개발했습니다.',
        ],
      },
      {
        title: '주문 취소',
        body: [
          '공동구매 진행 상태와 재고를 정정하는 취소 경로, Redis 잠금과 관련 테스트를 보완했습니다.',
        ],
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
