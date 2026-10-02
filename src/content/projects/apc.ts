import { CASE_LENGTH, PROJECT_SLUG, PROJECT_TIER } from '@/constants/project';
import { STATUS_KIND } from '@/constants/status';
import { VISUAL_ID } from '@/constants/visual';
import type { Project } from '@/dto/project.dto';
import { apcCase } from './apc-case';

const mainVisual = {
  src: '/images/projects/apc/main-restored.png',
  alt: '농산물 처리 및 물류 환경을 표현한 개념 이미지',
};

export const apc: Project = {
  slug: PROJECT_SLUG.APC,
  num: '04',
  title: 'APC',
  category: 'OPERATIONS SYSTEM',
  period: '2025—2026 중 참여',
  tier: PROJECT_TIER.SELECTED,
  caseLength: CASE_LENGTH.FULL,
  status: [{ kind: STATUS_KIND.PRODUCT, label: 'PRODUCT WORK' }],
  surfaces: 'App / Web / API / DB',
  summary:
    '농산물 처리장의 입고·정산·현장 업무를 지원하는 시스템입니다. 웹·앱·서버에 걸쳐 운영 기능을 개발했습니다.',
  home: {
    features: [
      { title: '입고·정산', body: ['입고 데이터 검증과 정산·ERP 전송 처리'] },
      {
        title: '근태·현장 앱',
        body: ['기기 기반 출근 처리와 Flutter 현장 앱 유지보수'],
      },
      { title: '전자결재', body: ['DB·API·관리자 화면과 알림·인쇄 연결'] },
    ],
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
