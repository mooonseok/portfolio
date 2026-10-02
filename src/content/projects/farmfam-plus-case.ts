import type { CaseContent } from '@/dto/case.dto';

export const farmfamPlusCase: CaseContent = {
  role: [
    '4인 팀에서 공동구매·시크릿딜의 서버 처리와 관리자 판매 설정, 주문 취소 경로 보완을 맡았습니다.',
  ],
  roleSurfaces: [{ label: 'WEB' }, { label: 'API' }, { label: 'DB' }],
  contextProblem: [
    '운영 요청과 QA 과정에서 취소 이후의 공동구매 수량과 재고 처리를 점검하고 관련 흐름을 보완했습니다.',
  ],
  stateScope: {
    label: '주문이 영향을 주는 상태',
    note: '처리 순서 아님',
    items: ['공동구매 진행 수량', '재고', '사은품', '정산'],
  },
  systemFlows: [],
  connections: [
    {
      title: '공동구매',
      body: [
        '목표 수량·진행 상태를 기준으로 운영',
        '주문 참여 수량이 진행 상태에 반영',
        '관리자에서 목표 수량·판매 기간·가격 설정',
      ],
    },
    {
      title: '시크릿딜',
      body: [
        '접속 시점·경과 시간으로 가격 구간 결정',
        '주문 생성 시 현재 가격과 수량 재확인',
        '관리자에서 구간별 가격·판매 기간 설정',
      ],
    },
  ],
  work: [
    {
      title: '공동구매',
      body: [
        '목표 수량과 진행 상태, 만료 후 종료 처리를 개발하고 다단계 공동구매 요구사항을 반영했습니다.',
      ],
    },
    {
      title: '시크릿딜',
      body: [
        '접속 시점과 경과 시간에 따른 가격 구간을 처리하고 주문 생성 시 가격과 수량을 다시 확인했습니다.',
      ],
    },
    {
      title: '판매 설정',
      body: [
        '관리자에서 상품 이미지, 가격, 판매 기간과 공동구매 목표 수량을 설정·수정하는 기능을 개발했습니다.',
      ],
    },
    {
      title: '주문 변경',
      body: [
        '취소 시 공동구매 진행 상태와 재고를 정정하는 경로, Redis 잠금과 관련 테스트를 보완했습니다.',
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
      id: 'secret-deal-price',
      title: '시크릿딜 — 화면 가격과 주문 가격의 기준',
      fields: [
        {
          label: '상황',
          body: [
            '접속 시점과 경과 시간에 따라 적용되는 할인 가격이 달라집니다. 화면에서 본 가격만으로 주문을 확정하면 가격 구간이 바뀐 시점의 주문을 잘못 처리할 수 있습니다.',
          ],
        },
        {
          label: '처리',
          body: [
            '접속 기준 시간을 Redis에 기록하고 경과 시간에 따라 가격 구간을 계산했습니다. 주문 생성 경로에서도 현재 가격과 수량을 다시 확인했습니다.',
          ],
        },
        {
          label: '범위',
          body: [
            '시크릿딜과 공동구매는 별도 판매 경로입니다. 구매 기록은 주문 생성 후 남으며 결제 완료 여부는 별도 확인이 필요합니다.',
          ],
        },
      ],
    },
    {
      id: 'transaction-boundaries',
      title: '취소 정책과 처리 기준',
      fields: [
        {
          label: '처리 범위',
          body: [
            '활성 공동구매와 진행 수량 정정은 같은 DB 트랜잭션에서 처리합니다. 외부 환불과 재고 복원을 포함한 취소 경로 전체가 하나의 트랜잭션인 것은 아닙니다.',
          ],
        },
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
  currentState: [],
};
