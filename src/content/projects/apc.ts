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
      summary: '현장 앱 업데이트',
      lines: [
        '현장 앱의 버전 확인과 APK 업데이트를 처리하고, 설치 전후 키오스크 상태를 유지·복구했습니다.',
      ],
    },
    {
      floor: FLOOR.ADMIN,
      summary: '근태·전자결재 화면',
      lines: [
        'QR 생성·근태 화면과 전자결재의 기안·처리·알림·인쇄 화면을 개발했습니다.',
      ],
    },
    {
      floor: FLOOR.API,
      summary: '입고·정산·근태·결재',
      lines: [
        '입고 Excel의 입력값·중복 조건 검증과 정산 생성·수정 처리를 개발했습니다.',
        'ERP 전송 결과를 성공·영구 실패·재시도 대상으로 구분하고, 재시도 대상의 재처리를 구현했습니다.',
        '회사 코드·기기 식별에 따른 직원 조회와 출근 처리, 전자결재 처리 API를 개발했습니다.',
      ],
    },
    {
      floor: FLOOR.DB,
      summary: '근태·결재·ERP 전송 기록',
      lines: [
        '근태 구조와 결재 문서·단계·알림·결재선 템플릿을 구성했습니다.',
        '정산 변경과 ERP 전송용 outbox 기록을 같은 트랜잭션에 두었습니다.',
      ],
    },
  ],
  summary: '농산물 처리장의 입고와 정산, 현장 업무를 지원하는 시스템입니다.',
  home: {
    features: [
      {
        title: '입고·정산과 ERP',
        body: [
          '입고 데이터 검증과 정산 처리를 개발하고, ERP 전송 결과를 분류해 재시도 대상만 다시 처리하도록 했습니다.',
        ],
      },
      {
        title: '근태와 현장 앱',
        body: [
          '회사 코드·기기 식별에 따른 출근 처리와 QR·근태 화면을 개발하고, Flutter 현장 앱의 업데이트 처리를 작업했습니다.',
        ],
      },
      {
        title: '전자결재',
        body: [
          '문서·단계·결재선의 DB와 처리 API, 관리자 화면을 개발하고 알림·인쇄를 연결했습니다.',
        ],
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
