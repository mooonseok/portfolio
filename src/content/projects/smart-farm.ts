import { FLOOR } from '@/constants/floor';
import { CASE_LENGTH, PROJECT_SLUG, PROJECT_TIER } from '@/constants/project';
import { STATUS_KIND } from '@/constants/status';
import { VISUAL_ID } from '@/constants/visual';
import type { Project } from '@/dto/project.dto';
import { smartFarmCase } from './smart-farm-case';

const mainVisual = {
  src: '/images/projects/smart-farm/main-restored.png',
  alt: '온실과 재배 환경을 표현한 개념 이미지',
};

export const smartFarm: Project = {
  slug: PROJECT_SLUG.SMART_FARM,
  num: '05',
  title: 'SMART FARM',
  category: 'MONITORING & CONTROL',
  period: '2025—2026 중 참여',
  tier: PROJECT_TIER.SELECTED,
  caseLength: CASE_LENGTH.FULL,
  status: [
    {
      kind: STATUS_KIND.EXPERIMENT,
      label: 'MONITORING',
      note: 'Office Prototype',
    },
    { kind: STATUS_KIND.EXPERIMENT, label: 'CONTROL', note: 'Experiment' },
  ],
  surfaces: 'Monitoring / Control',
  boardService: '센서 모니터링 실험',
  layers: [
    {
      floor: FLOOR.ADMIN,
      summary: '측정값 대시보드 연동',
      lines: [
        'MQTT로 전송한 측정값을 대시보드에서 확인할 수 있도록 연동했습니다.',
      ],
      kind: STATUS_KIND.EXPERIMENT,
    },
    {
      floor: FLOOR.DEVICE,
      summary: '센서 모니터링·LED 제어',
      lines: [
        'ESP32와 Raspberry Pi로 센서 시험 모듈을 구성하고, 온습도·CO₂ 측정과 MQTT 전송을 사무실에서 시험했습니다.',
        '별도 LED 제어 실험에서 ESP32-S3와 LED 1채널을 이용해 MQTT 명령 수신과 출력 제어를 구현했습니다.',
        '제어기의 명령 만료·중복 방지, 연결 단절 시 출력 차단, 동작 시간 제한과 bootId를 이용한 장치 상태 식별을 구현했습니다.',
        '하드웨어 없이 실행하는 호스트 시험으로 제어 로직을 확인했습니다. 실제 장비 출력·네트워크 시험과는 구분합니다.',
      ],
      kind: STATUS_KIND.EXPERIMENT,
    },
  ],
  summary:
    '사무실에서 온습도와 CO₂ 측정, 데이터 전송을 시험했습니다. LED 제어는 별도 실험으로 진행했습니다.',
  home: {
    features: [
      {
        title: '센서 모니터링',
        body: [
          'ESP32와 Raspberry Pi로 온습도·CO₂ 센서 모듈을 구성하고 측정값을 MQTT로 전송했습니다.',
        ],
      },
      {
        title: '대시보드 연동',
        body: [
          '전송한 측정값을 대시보드에서 확인할 수 있도록 연결하고, 사무실에서 측정·전송 흐름을 시험했습니다.',
        ],
      },
      {
        title: '별도 LED 제어 실험',
        body: [
          'ESP32-S3와 LED 1채널로 명령 만료·중복 방지, 연결 단절 시 출력 차단과 동작 시간 제한을 구현했습니다.',
        ],
      },
    ],
    scope: [],
    flows: [],
    zones: [
      {
        kind: STATUS_KIND.EXPERIMENT,
        label: 'MONITORING',
        note: 'OFFICE PROTOTYPE',
        caption: '사무실 센서 시험 모듈',
        steps: [
          {
            label: '온습도 · CO₂ 측정',
            sub: 'ESP32 · Raspberry Pi 기반 센서 모듈',
          },
          {
            label: 'MQTT · 대시보드',
            sub: '측정값 전송과 화면 관측',
          },
        ],
      },
      {
        kind: STATUS_KIND.EXPERIMENT,
        label: 'CONTROL',
        note: 'EXPERIMENT',
        caption: '별도 LED 출력 제어 실험',
        steps: [{ label: '명령' }, { label: '제어기' }, { label: '시험 출력' }],
        footnote: '사무실 시험 환경 · 실제 농장 적용 전',
      },
    ],
    cta: 'CASE STUDY',
  },
  visuals: {
    home: {
      caption: '재배 환경 개념 이미지 · 실제 시험은 사무실에서 진행',
      ...mainVisual,
      sizes:
        '(min-width: 1440px) 644px, (min-width: 1024px) calc(50vw - 58px), (min-width: 744px) calc(100vw - 80px), 100vw',
      id: VISUAL_ID.SMART_HOME,
      brief: 'SMART FARM — greenhouse, 4:3 / 4:5',
    },
    sensor: {
      caption: '센서 장치 개념 이미지 · 실제 시험 환경은 사무실',
      src: '/images/projects/smart-farm/sensor.jpg',
      sizes: '(min-width: 1440px) 310px, (min-width: 1024px) 25vw, 50vw',
      id: VISUAL_ID.SMART_SENSOR,
      alt: '온실에 설치된 센서 장치를 표현한 개념 이미지',
      brief: 'sensor enclosure, 1:1',
    },
    equipment: {
      src: '/images/projects/smart-farm/equipment.jpg',
      sizes: '(min-width: 1440px) 310px, (min-width: 1024px) 25vw, 50vw',
      id: VISUAL_ID.SMART_EQUIPMENT,
      alt: '온실 환기팬을 표현한 개념 이미지',
      brief: 'fan / valve / vent, 1:1 · 4:5',
    },
    hero: {
      ...mainVisual,
      sizes: '100vw',
      position: '50% 60%',
      id: VISUAL_ID.SMART_HERO,
      brief: 'SMART FARM — greenhouse aisle, 21:9',
    },
    monitor: {
      id: VISUAL_ID.SMART_MONITOR,
      alt: '환경 데이터를 확인하는 장면, 화면 내용은 비어 있음 — 개념 이미지',
      brief: 'monitoring scene, 1:1',
    },
  },
  case: smartFarmCase,
};
