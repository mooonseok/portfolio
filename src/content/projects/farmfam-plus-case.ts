import type { CaseContent } from '@/dto/case.dto';

export const farmfamPlusCase: CaseContent = {
  role: [
    '4인 팀에서 공동구매 수량·상태 정정, 재고 복원, Redis 잠금과 관련 테스트를 수정했습니다.',
    '기획 요구사항에 따른 다단계 공동구매 기능도 구현했습니다.',
  ],
  roleSurfaces: [{ label: 'WEB' }, { label: 'API' }, { label: 'DB' }],
  contextProblem: [
    '운영 요청과 QA 과정에서 취소 이후의 공동구매 수량과 재고 처리를 점검하고 관련 흐름을 보완했습니다.',
    '취소 정책과 재고 처리 기준은 담당자와 확인하며 운영 조건에 맞춰 구현을 조정했습니다.',
  ],
  stateScope: {
    label: '주문이 영향을 주는 상태',
    note: '처리 순서 아님',
    items: ['공동구매 진행 수량', '재고', '사은품', '정산'],
  },
  systemFlows: [],
  work: [
    {
      title: 'Group Purchase',
      body: [
        '취소에 따른 공동구매 수량·상태 정정을 보완하고, 기획 요구사항에 따라 다단계 공동구매 기능을 구현했습니다.',
      ],
    },
    {
      title: 'Inventory',
      body: ['주문 취소 경로의 재고 복원 처리를 보완했습니다.'],
    },
    {
      title: 'Redis / Tests',
      body: ['취소 처리에 사용하는 Redis 잠금과 관련 테스트를 수정했습니다.'],
    },
    {
      title: 'Collaboration',
      body: [
        '담당자와 취소 정책·재고 기준을 확인하고 운영 조건에 맞춰 구현을 조정했습니다.',
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
        note: {
          label: '취소 정책과 처리 기준',
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
      note: { label: '취소 동작 확인', target: 'regression-protection' },
    },
  },
  techNotes: [
    {
      id: 'transaction-boundaries',
      title: '취소 정책과 처리 기준',
      fields: [
        {
          label: 'Collaboration',
          body: [
            '취소 정책과 재고 처리 기준은 담당자와 조율했습니다. 운영 조건에 맞춰 공동구매 정정과 재고 복원 처리를 보완했습니다.',
          ],
        },
      ],
    },
    {
      id: 'regression-protection',
      title: '취소 동작 확인',
      fields: [
        {
          label: 'Verification',
          body: [
            '관련 테스트를 수정하고, 로컬·QA·운영 환경에 변경 사항을 반영했습니다. 테스트 결제를 통해 취소 동작을 확인했습니다.',
          ],
        },
      ],
    },
  ],
  currentState: [
    '변경 사항을 로컬·QA·운영 환경에 반영하고, 테스트 결제를 통해 취소 동작을 확인했습니다.',
  ],
};
