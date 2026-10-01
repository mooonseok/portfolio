import { CASE_LENGTH, PROJECT_SLUG, PROJECT_TIER } from '@/constants/project';
import { STATUS_KIND } from '@/constants/status';
import { VISUAL_ID } from '@/constants/visual';
import type { Project } from '@/dto/project.dto';
import { smartFarmCase } from './smart-farm-case';

const mainVisual = {
  src: '/images/projects/smart-farm/main.jpg',
  alt: '온실과 재배 환경을 표현한 개념 이미지',
};

export const smartFarm: Project = {
  slug: PROJECT_SLUG.SMART_FARM,
  num: '03',
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
  summary:
    'ESP32와 Raspberry Pi를 활용해 센서 모듈을 구성하고, 온습도·CO₂ 측정값을 MQTT로 전달해 대시보드에서 관측하도록 구현했습니다.',
  home: {
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
