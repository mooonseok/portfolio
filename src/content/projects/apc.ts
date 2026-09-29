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
  period: '2024—2026',
  tier: PROJECT_TIER.SELECTED,
  caseLength: CASE_LENGTH.FULL,
  status: [{ kind: STATUS_KIND.PRODUCT, label: 'PRODUCT WORK' }],
  surfaces: 'App / Web / API / DB',
  summary:
    '농산물의 입고·가공·재고 흐름과 근태·전자결재 같은 현장 업무를 앱·웹·API·DB에서 연결해 작업했습니다.',
  home: {
    scope: [
      'Receiving',
      'Processing',
      'LOT / Batch',
      'Inventory',
      'Attendance',
      'Approval',
    ],
    flows: [
      {
        id: 'material',
        label: 'A — MATERIAL',
        nodes: [
          { label: 'RECEIVING' },
          { label: 'PROCESSING' },
          { label: 'LOT' },
          { label: 'BATCH' },
          { label: 'INVENTORY' },
        ],
      },
      {
        id: 'attendance',
        label: 'B — ATTENDANCE',
        nodes: [
          { label: 'WORKER' },
          { label: 'QR' },
          { label: 'DEVICE' },
          { label: 'ATTENDANCE' },
        ],
      },
      {
        id: 'approval',
        label: 'C — APPROVAL',
        nodes: [
          { label: 'DOCUMENT' },
          { label: 'APPROVAL' },
          { label: 'NOTIFICATION' },
        ],
      },
    ],
    cta: 'CASE STUDY',
  },
  visuals: {
    home: {
      ...mainVisual,
      sizes: '100vw',
      id: VISUAL_ID.APC_HOME,
      brief: 'APC — processing floor, 21:9 / 16:9 / 4:5',
      pins: [
        {
          label: 'RECEIVING',
          x: 12,
          y: 60,
          tablet: { x: 10, y: 60 },
          mobile: { x: 8, y: 56 },
        },
        {
          label: 'LOT',
          x: 44,
          y: 38,
          tablet: { x: 44, y: 36 },
          hideOnMobile: true,
        },
        {
          label: 'QR',
          x: 71,
          y: 66,
          tablet: { x: 72, y: 66 },
          mobile: { x: 50, y: 30 },
        },
      ],
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
