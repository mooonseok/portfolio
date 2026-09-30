import { NODE_STATE } from '@/constants/flow';
import type { CaseContent } from '@/dto/case.dto';
import { apcDomains } from './apc-domains';

export const apcCase: CaseContent = {
  role: [
    'APC 백엔드의 처리·재고·정산 영역부터 Flutter 현장 앱, Next.js 운영 웹, NestJS API, PostgreSQL/Flyway DB까지 여러 영역을 작업했습니다.',
    'QR 근태, 입고 보드, LOT/Batch 이력, 전자결재 및 알림 같은 현장 기능이 포함됩니다.',
  ],
  contextProblem: [
    'APC 업무는 입고된 농산물이 가공되고 LOT와 Batch를 거쳐 재고로 이어지는 물리적 흐름과 시스템의 데이터 흐름이 함께 움직여야 합니다.',
    '여기에 작업자 근태와 전자결재처럼 성격이 다른 운영 업무도 같은 시스템 안에서 앱·웹·서버·DB로 연결되어 있었습니다.',
  ],
  systemFlows: [],
  domainsTitle: '세 현장 업무와 추적할 수 있는 이력',
  domains: apcDomains,
  work: [
    {
      title: 'Receiving',
      body: [
        '입고 및 현장 운영 화면과 관련 API를 작업하고, 웹 운영 화면에서 입고 상태를 확인할 수 있는 기능을 개발했습니다.',
      ],
    },
    {
      title: 'Processing',
      body: [
        '농산물 가공 과정과 연결되는 처리 및 이력 관련 서버 기능을 작업했습니다.',
      ],
    },
    {
      title: 'LOT / Batch',
      body: [
        'LOT에서 가공 Task, Batch, InventoryLog로 이어지는 계보와 이력을 조회하는 로직을 작업했습니다.',
      ],
    },
    {
      title: 'Inventory',
      body: [
        '입출고와 처리 과정에서 발생하는 재고 및 재고 이력 관련 기능을 작업했습니다.',
      ],
    },
    {
      title: 'Attendance',
      body: [
        'QR 기반 근태 기능에서 회사 코드와 기기 식별을 이용한 직원 조회 및 출근 흐름을 작업했습니다.',
        '웹 QR 생성/근태 화면과 관련 DB 구조도 함께 작업했습니다.',
      ],
    },
    {
      title: 'Approval',
      body: [
        '전자결재 기안·처리·알림·인쇄 관련 웹 기능과 서버/DB 기능을 작업했습니다.',
        '서버에서는 회사별 검증, 기안자 본인 결재 제한, 결재 처리 트랜잭션 등이 포함됩니다.',
      ],
    },
  ],
  decisions: [],
  techNotes: [
    {
      id: 'lot-batch-tracking',
      title: 'LOT / Batch tracking',
      fields: [
        {
          label: 'Why it mattered',
          body: [
            '입고된 원물이 가공과 분할 과정을 거친 뒤에도 어느 LOT에서 어떤 Batch와 재고가 만들어졌는지 추적할 수 있어야 했습니다.',
          ],
        },
        {
          label: 'Implementation',
          body: [
            'LOT → 가공 Task → Batch → InventoryLog까지 이력을 조회하는 서버 흐름을 구현했습니다.',
          ],
        },
      ],
    },
    {
      id: 'qr-attendance-device',
      title: 'QR attendance device',
      fields: [
        {
          label: 'Constraint',
          body: [
            'QR 주소만으로 출근을 처리할 경우 실제 현장 기기와 작업자를 연결하기 어려웠습니다.',
          ],
        },
        {
          label: 'Handling',
          body: [
            '회사 코드와 기기 fingerprint를 이용한 기기 기반 직원 조회 흐름을 사용했습니다.',
          ],
        },
      ],
    },
    {
      id: 'approval-notification',
      title: 'Approval → notification',
      fields: [
        {
          label: 'Implementation',
          body: [
            '결재 문서·단계·알림·결재선 템플릿용 DB 구조와 결재 처리 API, 관리자 웹의 기안/처리 및 알림 UI를 연결했습니다.',
            '서버에서는 결재 본문 HTML 정리와 빈 본문 상신 차단, 회사 범위 검증, 현재 차례 결재자 검증 및 트랜잭션 기반 처리 로직을 사용했습니다.',
          ],
        },
      ],
    },
  ],
  experiment: {
    title: 'Handwritten document OCR',
    notShipped: true,
    conclusion: '신뢰성 검토 결과, 운영 기능으로 채택하지 않았습니다.',
    flow: [
      { label: 'DOCUMENT', state: NODE_STATE.EXPERIMENT },
      { label: 'OCR PROTOTYPE', state: NODE_STATE.EXPERIMENT },
      { label: 'VALIDATION', state: NODE_STATE.EXPERIMENT },
      { label: 'DECISION', state: NODE_STATE.EXPERIMENT },
    ],
    rows: [
      {
        label: 'CONTEXT',
        body: [
          '농가에서 수기로 작성한 입고 신청서의 내용을 다시 시스템에 입력해야 하는 반복 작업이 있었습니다.',
          '일부 문서는 사람이 읽기 어려워 작성자에게 다시 확인하는 경우도 있었습니다.',
        ],
      },
      {
        label: 'PROTOTYPE',
        body: [
          'FastAPI 기반 OCR 서비스와 Google Vision 연동, 문서 템플릿 기반 데이터 추출 흐름을 프로토타입으로 구현했습니다.',
        ],
      },
      {
        label: 'FINDING',
        body: [
          '실제 수기 문서는 필체 편차가 커서 업무 데이터로 자동 반영하기에 충분한 신뢰성을 확보하기 어렵다고 판단했습니다.',
        ],
      },
      {
        label: 'DECISION',
        body: [
          '자동 인식 결과가 입고·재고 데이터로 이어지는 기능인 만큼, 불확실한 인식 결과를 운영 기능으로 채택하지 않았습니다.',
        ],
      },
    ],
  },
  currentState: [
    'LOT/Batch 및 재고 이력, QR 근태, 운영 웹과 현장 앱, 전자결재·알림을 포함한 여러 업무 흐름의 구현이 존재합니다.',
  ],
};
