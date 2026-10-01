import type { CaseContent } from '@/dto/case.dto';
import { apcDomains } from './apc-domains';

export const apcCase: CaseContent = {
  role: [
    '2인 팀에서 정해진 화면 흐름과 디자인을 바탕으로 DB, 서버 API, 관리자 화면, 알림과 인쇄 기능을 개발했습니다.',
  ],
  contextProblem: [
    '수기로 진행하던 결재 업무를 시스템에서 처리할 수 있도록 기존 APC에 전자결재 기능을 추가했습니다.',
  ],
  systemFlows: [],
  domainsTitle: '세 현장 업무와 추적할 수 있는 이력',
  domains: apcDomains,
  work: [
    {
      title: 'Approval Data / API',
      body: ['전자결재에 필요한 데이터 구조와 서버 처리를 구현했습니다.'],
    },
    {
      title: 'Admin Web',
      body: [
        '정해진 화면 흐름과 디자인을 바탕으로 관리자 화면을 개발했습니다.',
      ],
    },
    {
      title: 'Notification / Print',
      body: ['결재 기능에 알림과 인쇄 기능을 연결했습니다.'],
    },
  ],
  decisions: [],
  techNotes: [
    {
      id: 'lot-batch-tracking',
      title: '물류·재고',
      fields: [
        {
          label: 'Scope',
          body: ['APC의 물류·재고 흐름과 이력 조회 관련 기능을 작업했습니다.'],
        },
      ],
    },
    {
      id: 'qr-attendance-device',
      title: 'QR 근태',
      fields: [
        {
          label: 'Scope',
          body: [
            '직원 조회와 출근 처리, 웹 QR·근태 화면 관련 기능을 작업했습니다.',
          ],
        },
      ],
    },
    {
      id: 'approval-notification',
      title: '전자결재 기능 추가',
      fields: [
        {
          label: 'Implementation',
          body: [
            '결재 업무에 필요한 데이터와 서버 처리를 구성하고 관리자 화면, 알림과 인쇄 기능을 연결했습니다.',
          ],
        },
      ],
    },
  ],

  currentState: [
    '기존 APC에 전자결재 기능을 추가하고, 데이터 구조·서버 처리·관리자 화면·알림·인쇄를 연결했습니다.',
  ],
};
