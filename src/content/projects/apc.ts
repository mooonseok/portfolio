import { FLOOR } from '@/constants/floor';
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
  boardService: '농산물 처리장 업무 시스템',
  layers: [
    {
      floor: FLOOR.APP,
      tech: 'Flutter',
      lines: ['현장 앱 업데이트 처리 (유지보수)', '버전 확인·APK 설치 안내'],
    },
    {
      floor: FLOOR.ADMIN,
      lines: ['전자결재 관리자 화면', '알림·인쇄'],
    },
    {
      floor: FLOOR.API,
      lines: ['입고 검증·정산', 'ERP 전송·재처리', '출근 처리'],
    },
    {
      floor: FLOOR.DB,
      lines: ['결재 문서·단계·결재선', 'ERP 전송 outbox'],
    },
  ],
  summary: '농산물 처리장의 입고와 정산, 현장 업무를 지원하는 시스템입니다.',
  home: {
    features: [
      {
        title: '입고와 정산',
        body: ['입고 데이터 검증과 정산, ERP 전송을 개발했습니다.'],
      },
      {
        title: '근태와 현장 앱',
        body: ['기기 기반 출근 처리를 개발하고 현장 앱을 유지보수했습니다.'],
      },
      {
        title: '전자결재',
        body: ['전자결재의 DB와 API, 관리자 화면을 개발했습니다.'],
      },
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
