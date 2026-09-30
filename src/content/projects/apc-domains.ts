import type { Domain } from '@/dto/domain.dto';

export const apcDomains: Domain[] = [
  {
    id: 'material',
    code: 'A',
    label: '물류·재고',
    title: 'LOT에서 재고 이력까지 추적',
    lead: '입고된 원물이 가공·분할된 뒤에도 어느 LOT에서 어떤 Batch와 재고가 만들어졌는지 추적할 수 있어야 했습니다. LOT부터 InventoryLog까지 이력을 조회하는 서버 흐름을 구현했습니다.',
    steps: [
      { code: 'LOT', sub: '입고된 원물' },
      { code: '가공 TASK', sub: '가공·분할 작업' },
      { code: 'BATCH', sub: '가공 결과 단위' },
      { code: 'INVENTORYLOG', sub: '재고 변동 이력' },
    ],
    implLabel: '구현한 기능',
    impl: [
      '입고·현장 운영 화면과 API, 웹의 입고 상태 확인',
      '가공 과정과 연결되는 처리·이력 서버 기능',
      'LOT → 가공 Task → Batch → InventoryLog 계보·이력 조회',
      '입출고와 처리 과정의 재고·재고 이력',
    ],
    note: { label: 'LOT / Batch tracking', target: 'lot-batch-tracking' },
  },
  {
    id: 'attendance',
    code: 'B',
    label: 'QR 근태',
    title: '현장 기기와 직원 조회 연결',
    lead: 'QR 주소만으로는 실제 현장 기기와 작업자를 연결하기 어려웠습니다. 회사 코드와 기기 식별로 직원을 조회하고 출근을 처리하는 흐름을 작업했습니다.',
    steps: [
      { code: 'DEVICE', sub: '회사 코드 + 기기 식별' },
      { code: 'EMPLOYEE', sub: '기기 기반 직원 조회' },
      { code: 'ATTENDANCE', sub: '출근 처리' },
    ],
    aside: {
      label: '보조 경로 · DEVICE 단계',
      body: '브라우저 fingerprint를 얻지 못하면 localStorage UUID로 기기를 식별하는 fallback도 구현되어 있습니다.',
    },
    implLabel: '구현한 기능',
    impl: [
      '회사 코드·기기 식별을 이용한 직원 조회 및 출근 흐름',
      '웹 QR 생성 / 근태 화면',
      '근태 관련 DB 구조',
    ],
    note: { label: 'QR attendance device', target: 'qr-attendance-device' },
  },
  {
    id: 'approval',
    code: 'C',
    label: '전자결재',
    title: '기안·결재·알림을 회사 범위 안에서',
    lead: '기안과 결재 처리, 알림을 관리자 웹과 서버, DB에서 연결했습니다. 결재를 처리할 때 서버에서 회사 범위와 결재자를 검증합니다.',
    steps: [
      { code: 'DRAFT', sub: '기안' },
      { code: 'APPROVAL', sub: '결재 처리' },
      { code: 'NOTIFICATION', sub: '알림' },
    ],
    checks: {
      label: '결재 처리 시 서버 검증',
      items: [
        '회사 범위 검증',
        '결재자 검증',
        '기안자 본인 결재 제한',
        '트랜잭션 기반 처리',
      ],
    },
    implLabel: '구현한 기능',
    impl: [
      '결재 문서·단계·알림·결재선 템플릿 DB 구조',
      '결재 처리 API',
      '관리자 웹의 기안/처리, 알림, 인쇄 UI',
    ],
    note: {
      label: 'Approval → notification',
      target: 'approval-notification',
    },
  },
];
