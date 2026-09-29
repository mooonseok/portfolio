import { NODE_STATE } from '@/constants/flow';
import { WORK_TRACK } from '@/constants/project';
import { STATUS_KIND } from '@/constants/status';
import type { CaseContent } from '@/dto/case.dto';
import { smartFarmTechNotes } from './smart-farm-tech-notes';

export const smartFarmCase: CaseContent = {
  role: [],
  roleTracks: [
    {
      kind: STATUS_KIND.PRODUCT,
      label: 'MONITORING',
      note: 'Product Work',
      body: [
        '스마트팜 운영 서비스에서는 농장·온실·구역과 센서 위치, 작물·작기·생육·수확·관수 및 알림 UI를 작업했습니다.',
      ],
    },
    {
      kind: STATUS_KIND.EXPERIMENT,
      label: 'CONTROL',
      note: 'Experiment',
      body: [
        '별도의 제어 PoC에서는 센서 수집과 조회, MQTT 명령/응답, 엣지 동기화 및 ESP32 제어기 안전 로직을 구현했습니다.',
      ],
    },
  ],
  contextProblem: [
    '스마트팜 운영에서는 센서 값 자체를 표시하는 것뿐 아니라 센서가 어느 농장·온실·구역에 위치하는지, 해당 환경에서 어떤 작물과 작기가 운영되고 있는지를 함께 관리해야 했습니다.',
    '동시에 소프트웨어에서 실제 장비까지 명령을 전달할 수 있는지 검증하기 위해 운영 시스템과 별도로 장비 제어 PoC를 진행했습니다.',
  ],
  systemFlows: [],
  monitoringFlow: {
    id: 'monitoring',
    nodes: [{ label: 'SENSOR' }, { label: 'DATA' }, { label: 'MONITORING' }],
  },
  controlExperiment: {
    flow: [
      { label: 'COMMAND', state: NODE_STATE.EXPERIMENT },
      { label: 'DEVICE', state: NODE_STATE.EXPERIMENT },
      { label: 'EQUIPMENT', state: NODE_STATE.EXPERIMENT },
    ],
    rows: [
      {
        label: 'WHY',
        body: [
          '센서 모니터링에서 한 단계 더 나아가 소프트웨어 명령을 실제 제어기와 장비 동작까지 연결할 수 있는지를 검증하기 위해 진행했습니다.',
        ],
      },
      {
        label: 'PROTOTYPE',
        body: [
          'MQTT 기반 서버/edge 통신과 ESP32-S3 제어기를 연결하고, 명령 만료·중복 방지·fail-safe·duty 제한 같은 제어 안전 로직을 포함한 PoC를 구현했습니다.',
        ],
      },
      {
        label: 'FINDING',
        body: [
          '코드와 테스트 기준으로 명령 전달 및 안전 로직 구현은 확인됩니다.',
          '실제 현장 장비에서 장기간 운영한 결과나 제어 안정성 수치는 주장하지 않습니다.',
        ],
      },
    ],
  },
  work: [
    {
      track: WORK_TRACK.MONITORING,
      title: 'Sensor Data',
      body: [
        '농장·온실·구역별 센서 배치와 센서 위치 선택, 환경 데이터 조회와 관련 UI를 작업했습니다.',
      ],
    },
    {
      track: WORK_TRACK.MONITORING,
      title: 'Monitoring',
      body: [
        '농장 등록/수정, 배치도 및 센서 지도, 생육·수확·관수·작업·차량 화면, 알림 읽음 및 이력 기능을 작업했습니다.',
      ],
    },
    {
      track: WORK_TRACK.MONITORING,
      title: 'Data / Simulation Separation',
      body: [
        '스마트팜 DB에서 시뮬레이션 상태와 참조 값을 별도로 구분하기 위한 스키마 및 제약을 작업했습니다.',
        '시뮬레이션·데모 데이터가 실제 센서 실측값과 동일한 것으로 표현되지 않도록 구분합니다.',
      ],
    },
    {
      track: WORK_TRACK.CONTROL,
      title: 'Command / Control PoC',
      body: [
        'MQTT 기반 명령과 응답, 센서 수집/조회, edge 동기화 및 장비 제어 흐름을 구현했습니다.',
      ],
    },
    {
      track: WORK_TRACK.CONTROL,
      title: 'Equipment',
      body: [
        'ESP32-S3 기반 제어기 펌웨어에서 명령 수신과 장비 동작 관련 안전 로직을 작업했습니다.',
      ],
    },
  ],
  decisions: [],
  techIntro: '제어 프로토타입을 어떻게 구현했는지.',
  techNotes: smartFarmTechNotes,
  currentState: [],
  currentStateTracks: {
    monitoring: [
      'Monitoring 영역에서는 농장·온실·센서·작물·생육·수확 등을 다루는 운영 UI와 데이터 구조가 존재합니다.',
    ],
    control: [
      'PoC 구현 및 검증 코드가 존재합니다.',
      '실제 제품 운영 적용 여부는 확정되지 않았습니다.',
    ],
  },
};
