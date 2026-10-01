import { CASE_LENGTH, PROJECT_SLUG, PROJECT_TIER } from '@/constants/project';
import { STATUS_KIND } from '@/constants/status';
import { VISUAL_ID } from '@/constants/visual';
import type { Project } from '@/dto/project.dto';
import { apcCase } from './apc-case';

const mainVisual = {
  src: '/images/projects/apc/main.jpg',
  alt: '농산물 처리 및 물류 환경을 표현한 개념 이미지',
};

export const apc: Project = {
  slug: PROJECT_SLUG.APC,
  num: '02',
  title: 'APC',
  category: 'OPERATIONS SYSTEM',
  period: '2025—2026 중 참여',
  tier: PROJECT_TIER.SELECTED,
  caseLength: CASE_LENGTH.FULL,
  status: [{ kind: STATUS_KIND.PRODUCT, label: 'PRODUCT WORK' }],
  surfaces: 'App / Web / API / DB',
  summary:
    '수기로 진행하던 결재 업무를 시스템에서 처리할 수 있도록 기존 APC에 전자결재 기능을 추가했습니다.',
  home: {
    scope: [
      'Receiving',
      'Processing',
      'LOT / Batch',
      'Inventory',
      'Attendance',
      'Approval',
    ],
    flows: [],
    cta: 'CASE STUDY',
  },
  visuals: {
    home: {
      caption: '농산물 물류 환경을 표현한 개념 이미지',
      ...mainVisual,
      sizes: '100vw',
      id: VISUAL_ID.APC_HOME,
      brief: 'APC — processing floor, 21:9 / 16:9 / 4:5',
    },
    hero: {
      ...mainVisual,
      sizes: '100vw',
      position: '45% 55%',
      id: VISUAL_ID.APC_HERO,
      brief: 'APC — full-bleed floor, 21:9',
    },
  },
  case: apcCase,
};
