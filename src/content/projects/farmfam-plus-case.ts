import type { CaseContent } from '@/dto/case.dto';

export const farmfamPlusCase: CaseContent = {
  role: [
    '팜팜플러스 커머스의 관리자 웹, NestJS API, PostgreSQL 데이터 구조를 함께 작업했습니다.',
    '공동구매와 주문·취소, 재고, 프로모션 및 관리자 기능처럼 여러 상태가 연결되는 기능 구현에 참여했습니다.',
  ],
  roleSurfaces: [{ label: 'WEB' }, { label: 'API' }, { label: 'DB' }],
  contextProblem: [
    '커머스에서는 하나의 주문이 주문 상태에서 끝나지 않고 공동구매 진행 수량, 재고, 사은품과 정산 같은 다른 상태에도 영향을 줍니다.',
    '특히 주문 취소처럼 기존 상태를 되돌리는 경우에는 관련 데이터를 각각 수정하는 것이 아니라 서로 연결된 상태가 일관되게 복원되어야 했습니다.',
  ],
  stateScope: {
    label: '주문이 영향을 주는 상태',
    note: '처리 순서 아님',
    items: ['공동구매 진행 수량', '재고', '사은품', '정산'],
  },
  systemFlows: [],
  work: [
    {
      title: 'Product / Admin',
      body: [
        '일반·공동구매 상품 등록 및 수정, 옵션·이미지·혜택, 홈·배너·전시 설정 등 관리자 기능을 작업했습니다.',
      ],
    },
    {
      title: 'Order',
      body: [
        '주문 취소 경로에 공동구매 상태 정정과 재고 복원 로직을 연결했습니다.',
      ],
    },
    {
      title: 'Group Purchase',
      body: [
        '공동구매 수량과 진행 상태, 다단계 보상 등 공동구매 도메인의 API와 데이터 구조를 작업했습니다.',
      ],
    },
    {
      title: 'Inventory',
      body: [
        '주문 및 공동구매 상태와 연결되는 재고 관련 로직과 데이터 구조를 작업했습니다.',
      ],
    },
    {
      title: 'Promotion',
      body: [
        '시크릿딜 타이머/CRUD, 배너 링크 저장 및 유형 처리, 사은품 관련 기능을 작업했습니다.',
      ],
    },
    {
      title: 'Data / Migration',
      body: [
        '공동구매 수량 기준, 사은품, 재고 선점 관련 컬럼 및 기존 데이터 backfill을 포함한 DB 변경을 작업했습니다.',
      ],
    },
  ],
  decisions: [],
  relationMap: {
    id: 'order-cancellation',
    label: 'ORDER CANCELLATION',
    title: '주문 취소가 연결하는 상태',
    hint: '항목을 선택하면 관계와 작업 설명이 바뀝니다',
    hintMobile: '항목을 누르면 바로 아래에 설명이 열립니다',
    note: '설명용 관계 도식 · 선은 연결 관계만 나타내며 처리 순서나 트랜잭션 범위를 뜻하지 않습니다',
    origin: {
      id: 'order',
      code: 'ORDER CANCEL',
      label: '주문 취소',
      rel: '진입점',
      why: '취소는 주문 상태만 바꾸는 작업이 아닙니다. 주문 상태만 변경하면 공동구매 진행 상태와 실제 재고가 취소된 주문을 계속 반영할 수 있습니다.',
      work: '주문 취소 서비스에서 공동구매 정정과 재고 복원을 같은 취소 경로에 연결했습니다.',
    },
    targets: [
      {
        id: 'group-purchase',
        code: 'GROUP PURCHASE',
        label: '공동구매 정정',
        rel: '취소 → 진행 상태',
        why: '취소된 주문이 공동구매 진행 상태에 남아 있으면 진행 상태가 실제 주문과 달라집니다.',
        work: '주문 취소 처리에 공동구매 진행 상태 정정을 연결했습니다.',
        scope:
          '트랜잭션 설명은 활성 공동구매와 수량 진행 상태 처리에 한정됩니다. 이 취소 관계의 정정·복원 전체가 같은 트랜잭션이라는 의미는 아닙니다.',
        note: {
          label: 'Transaction boundaries',
          target: 'transaction-boundaries',
        },
      },
      {
        id: 'inventory',
        code: 'INVENTORY',
        label: '재고 복원',
        rel: '취소 → 재고',
        why: '주문 상태만 바뀌면 실제 재고는 취소된 주문을 계속 반영합니다.',
        work: '주문 취소 경로에 재고 복원 로직을 연결했습니다.',
      },
    ],
    check: {
      label: '관련 변경과 테스트',
      title: '회귀 테스트',
      body: '주문 취소 경로 변경과 관련된 회귀 테스트를 작업했습니다.',
      note: { label: 'Regression protection', target: 'regression-protection' },
    },
  },
  techNotes: [
    {
      id: 'transaction-boundaries',
      title: 'Transaction boundaries',
      fields: [
        {
          label: 'Why it mattered',
          body: [
            '공동구매 주문은 주문 상태뿐 아니라 진행 수량과 관련 상태를 함께 변경하기 때문에 일부 상태만 반영되면 데이터가 불일치할 수 있었습니다.',
          ],
        },
        {
          label: 'Implementation',
          body: [
            '활성 공동구매와 수량 진행 상태를 같은 트랜잭션 범위에서 처리하는 구현을 사용했습니다.',
          ],
        },
        {
          label: 'Scope',
          body: [
            '주문 취소의 공동구매 정정과 재고 복원은 같은 취소 경로로 연결했으며, 이 경로 전체의 트랜잭션 범위는 여기서 다루지 않습니다.',
          ],
        },
      ],
    },
    {
      id: 'regression-protection',
      title: 'Regression protection',
      fields: [
        {
          label: 'Risk',
          body: [
            '주문·재고·공동구매처럼 상태가 연결된 기능은 한쪽 수정이 다른 흐름을 깨뜨릴 가능성이 있습니다.',
          ],
        },
        {
          label: 'Protection',
          body: [
            '주문 취소와 이미지 처리 등 변경 영역에 단위·통합·회귀 성격의 테스트를 작업했습니다.',
          ],
        },
      ],
    },
    {
      id: 'backfill',
      title: 'Backfill',
      fields: [
        {
          label: 'Context',
          body: [
            '공동구매 및 재고 기능 확장 과정에서 기존 데이터에도 새로운 컬럼과 기준을 적용해야 했습니다.',
          ],
        },
        {
          label: 'Approach',
          body: [
            'PostgreSQL/Flyway 마이그레이션에서 공동구매 수량 기준·사은품·재고 선점 컬럼과 기존 데이터 backfill을 작업했습니다.',
          ],
        },
      ],
    },
  ],
  currentState: [
    '상품·주문·공동구매·재고·프로모션을 연결하는 웹·API·DB 구현과 관련 테스트가 존재합니다.',
  ],
};
