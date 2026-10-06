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
      kind: STATUS_KIND.EXPERIMENT,
      lines: ['측정값 대시보드 연동'],
    },
    {
      floor: FLOOR.DEVICE,
      kind: STATUS_KIND.EXPERIMENT,
      tech: 'ESP32 · Raspberry Pi',
      lines: ['센서 모듈·MQTT 전송', '별도 LED 제어 PoC'],
    },
  ],
  summary:
    '사무실에서 온습도와 CO₂ 측정, 데이터 전송을 시험했습니다. LED 제어는 별도 실험으로 진행했습니다.',
  home: {
    features: [
      {
        title: '센서 측정',
        body: ['ESP32와 Raspberry Pi로 센서 모듈을 구성했습니다.'],
      },
      {
        title: '측정값 확인',
        body: ['MQTT로 보낸 측정값을 대시보드에서 확인했습니다.'],
      },
      {
        title: 'LED 제어 실험',
        body: ['ESP32-S3와 LED로 제어 조건을 시험했습니다.'],
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
