import { CONTROL_ZONE } from '@/constants/control';
import { WORK_TRACK } from '@/constants/project';
import { STATUS_KIND } from '@/constants/status';
import type { CaseContent } from '@/dto/case.dto';
import { smartFarmConditions } from './smart-farm-control';

export const smartFarmCase: CaseContent = {
  role: [
    '2인 팀에서 센서 모듈 구성·측정값 전송·대시보드 연동을 담당했습니다.',
    '제어 PoC는 센서 모니터링과 별도의 LED 1채널 실험이며 실제 농장 적용 전 단계입니다.',
  ],
  roleTracks: [
    {
      kind: STATUS_KIND.EXPERIMENT,
      label: 'MONITORING',
      note: 'Office Prototype',
      body: [
        '2인 팀에서 센서와 하드웨어 모듈 구성, 측정값 전송, 대시보드 연동을 담당했습니다.',
      ],
    },
    {
      kind: STATUS_KIND.EXPERIMENT,
      label: 'CONTROL',
      note: 'Separate Experiment',
      body: [
        '센서 측정 모듈과 별도로, 시험용 LED 출력 1채널을 사용하는 제어 실험입니다.',
      ],
    },
  ],
  contextProblem: [
    '실제 스마트팜에 적용하기 전, 사무실에서 시험 모듈을 구성했습니다. 센서에서 얻은 온습도·CO₂ 측정값을 MQTT로 전달하고 대시보드에서 확인하는 흐름을 구현하고 시험했습니다.',
  ],
  systemFlows: [],
  monitoringFlow: {
    id: 'monitoring',
    nodes: [
      { label: 'SENSOR', sub: '온습도 · CO₂ 측정' },
      { label: 'MQTT', sub: '측정값 전달' },
      { label: 'DASHBOARD', sub: '측정값 관측' },
    ],
  },
  controlExperiment: {
    title: '별도 제어 PoC',
    subtitle: 'LED 시험 출력의 안전 조건',
    hint: '안전 조건을 선택하면 설명 위치가 표시됩니다',
    command: { code: 'COMMAND', sub: '서버 / edge' },
    controller: { code: 'CONTROLLER', sub: 'ESP32-S3' },
    equipment: { code: 'EQUIPMENT', sub: '시험용 LED 출력' },
    zones: {
      [CONTROL_ZONE.RECEIVE]: '명령 수신 관련',
      [CONTROL_ZONE.ACTUATE]: '장비 동작 관련',
      [CONTROL_ZONE.CONTROLLER]: '제어기 전체',
    },
    link: {
      id: 'mqtt',
      label: 'MQTT',
      body: '서버/edge와 제어기 사이에서 센서 데이터와 제어 명령을 전달하는 통신 경로로 사용했습니다.',
    },
    caption:
      '설명용 도식 · 제어기 안의 구분은 안전 로직이 무엇과 관련되는지 나타내며, 펌웨어의 실제 모듈 구조를 뜻하지 않습니다.',
    conditions: smartFarmConditions,
    rows: [
      {
        label: '목적',
        body: [
          '센서 모니터링에서 한 단계 더 나아가 소프트웨어 명령을 실제 제어기와 출력 동작까지 연결할 수 있는지를 검증하기 위해 진행했습니다.',
        ],
      },
      {
        label: '구현 범위',
        body: [
          'MQTT 기반 서버/edge 통신과 ESP32-S3 제어기를 연결하고, 명령 만료·중복 방지·fail-safe·duty 제한 같은 제어 안전 로직을 포함한 PoC를 구현했습니다.',
        ],
      },
      {
        label: '검증 대상·한계',
        body: [
          '검증에 사용한 출력은 시험용 LED 1채널입니다.',
          '실제 농장 적용 전 단계입니다.',
        ],
      },
    ],
  },
  work: [
    {
      track: WORK_TRACK.MONITORING,
      title: '센서 모듈',
      body: [
        'ESP32와 Raspberry Pi를 활용해 센서와 하드웨어 시험 모듈을 구성했습니다.',
      ],
    },
    {
      track: WORK_TRACK.MONITORING,
      title: '측정값 전달·관측',
      body: [
        '측정값을 MQTT로 전달하고 대시보드에서 확인할 수 있도록 연결했습니다.',
      ],
    },
    {
      track: WORK_TRACK.MONITORING,
      title: '사무실 시험',
      body: ['사무실에서 센서 측정·전달·관측 흐름을 시험했습니다.'],
    },
  ],
  decisions: [],
  techNotes: [],
  currentState: [],
};
