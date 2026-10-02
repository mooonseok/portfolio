import type { Domain } from '@/dto/domain.dto';

export const apcDomains: Domain[] = [
  {
    id: 'material',
    code: 'A',
    label: '입고·정산',
    title: '입고 데이터에서 정산과 ERP 전송까지',
    lead: '입고 데이터의 검증과 정산 처리를 작업하고, 외부 ERP 전송은 별도의 전송 기록과 결과로 관리했습니다.',
    steps: [
      { code: 'RECEIVING', sub: '입고 데이터 검증' },
      { code: 'SETTLEMENT', sub: '정산 처리' },
      { code: 'OUTBOX', sub: '전송 대상 기록' },
      { code: 'ERP', sub: '전송 결과·재처리' },
    ],
    implLabel: '개발 범위',
    impl: [
      '입고 Excel 입력값과 중복 조건 검증',
      '정산 생성·수정과 수동 입력값 처리',
      '정산 변경과 outbox 기록의 트랜잭션',
      'ERP 전송 결과의 항목별 분리와 재처리',
    ],
    note: { label: '정산과 ERP 전송', target: 'lot-batch-tracking' },
  },
  {
    id: 'attendance',
    code: 'B',
    label: '근태·현장 앱',
    title: '현장 기기 식별과 출근 처리',
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
      'Flutter 현장 앱의 버전 확인과 APK 업데이트 처리',
    ],
    note: { label: 'QR attendance device', target: 'qr-attendance-device' },
  },
  {
    id: 'approval',
    code: 'C',
    label: '전자결재',
    title: '수기 결재를 서비스 기능으로',
    lead: '수기로 진행하던 결재를 APC에서 처리할 수 있도록 DB·API·관리자 화면을 구현하고 알림·인쇄를 연결했습니다.',
    steps: [
      { code: 'DRAFT', sub: '기안' },
      { code: 'APPROVAL', sub: '결재 처리' },
      { code: 'NOTIFICATION', sub: '알림' },
    ],
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
