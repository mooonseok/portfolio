import type { CaseContent } from '@/dto/case.dto';
import { apcDomains } from './apc-domains';

export const apcCase: CaseContent = {
  role: [
    '입고·정산과 ERP 연동, 근태·현장 앱 기능을 작업했습니다. 전자결재는 2인 팀에서 DB·API·관리자 화면·알림·인쇄를 개발했습니다.',
  ],
  contextProblem: [
    '수기로 진행하던 결재 업무를 시스템에서 처리할 수 있도록 기존 APC에 전자결재 기능을 추가했습니다.',
  ],
  systemFlows: [],
  domainsTitle: '입고·정산, 현장 업무, 결재의 연결',
  domains: apcDomains,
  work: [
    {
      title: '입고·정산',
      body: [
        '입고 데이터 검증과 정산 처리, ERP 전송 기록 및 실패 재처리를 개발했습니다.',
      ],
    },
    {
      title: '근태·현장 앱',
      body: [
        '회사 코드와 기기 식별에 따른 출근 처리, QR·근태 화면과 Flutter 현장 앱의 업데이트 처리를 작업했습니다.',
      ],
    },
    {
      title: '전자결재',
      body: [
        '결재 문서·단계·결재선 데이터와 API, 관리자 화면, 알림·인쇄 기능을 연결했습니다.',
      ],
    },
  ],
  decisions: [],
  techNotes: [
    {
      id: 'approval-notification',
      title: '전자결재 — 문서부터 알림·인쇄까지',
      fields: [
        {
          label: '상황',
          body: [
            '수기 결재를 기존 APC에서 처리할 수 있도록 새로운 업무 기능을 추가했습니다.',
          ],
        },
        {
          label: '구현',
          body: [
            '정해진 화면 흐름과 디자인을 바탕으로 문서·단계·결재선 템플릿의 DB 구조와 API, 관리자 화면을 개발했습니다. 처리 결과에 따른 알림과 인쇄를 연결했습니다.',
          ],
        },
      ],
    },
    {
      id: 'lot-batch-tracking',
      title: '정산과 ERP 전송의 실패 경계',
      fields: [
        {
          label: '문제',
          body: [
            '정산 처리와 외부 ERP 전송은 실패 시점이 다릅니다. 일부 항목만 실패했을 때 성공한 전송까지 다시 처리하지 않도록 구분해야 했습니다.',
          ],
        },
        {
          label: '구현',
          body: [
            '도메인 변경과 전송용 outbox 기록을 같은 DB 트랜잭션에 두고, 전송 결과를 항목별로 나누어 재시도 대상을 구분했습니다.',
          ],
        },
        {
          label: '검증 범위',
          body: [
            '모의 ERP 응답을 이용한 테스트에서 성공 항목, 영구 실패 항목, 재시도 항목을 구분합니다. 이 테스트의 범위는 전송 결과 분류이며 실제 ERP 수신 확인은 포함하지 않습니다.',
          ],
        },
      ],
    },
    {
      id: 'qr-attendance-device',
      title: '현장 기기와 앱 유지보수',
      fields: [
        {
          label: '기기 식별',
          body: [
            '회사 코드·기기 식별로 직원을 조회하고 출근 처리에 연결했습니다. fingerprint를 얻지 못하면 localStorage UUID를 사용하는 보조 경로가 있습니다.',
          ],
        },
        {
          label: 'Flutter 앱',
          body: [
            '앱 버전 확인과 APK 다운로드·업데이트 안내를 개발하고, 앱 복귀 시 버전을 다시 확인하는 처리를 연결했습니다.',
          ],
        },
      ],
    },
  ],

  currentState: [],
};
