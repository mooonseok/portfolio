import { NODE_STATE } from '@/constants/flow';
import { CASE_LENGTH, PROJECT_SLUG, PROJECT_TIER } from '@/constants/project';
import { STATUS_KIND } from '@/constants/status';
import { VISUAL_ID } from '@/constants/visual';
import type { Project } from '@/dto/project.dto';
import { smartFarmCase } from './smart-farm-case';

export const smartFarm: Project = {
  slug: PROJECT_SLUG.SMART_FARM,
  num: '03',
  title: 'SMART FARM',
  category: 'MONITORING & CONTROL',
  period: '2026',
  tier: PROJECT_TIER.SELECTED,
  caseLength: CASE_LENGTH.FULL,
  status: [
    { kind: STATUS_KIND.PRODUCT, label: 'MONITORING', note: 'Product Work' },
    { kind: STATUS_KIND.EXPERIMENT, label: 'CONTROL', note: 'Experiment' },
  ],
  surfaces: 'Monitoring / Control',
  summary:
    '농장·온실의 센서와 생육 데이터를 관리하는 운영 화면을 개발하고, 별도의 PoC에서 MQTT와 ESP32 기반 장비 제어 흐름을 검증했습니다.',
  home: {
    scope: [],
    flows: [
      {
        id: 'monitor-control',
        nodes: [
          { label: 'SENSOR' },
          { label: 'MONITORING' },
          { label: 'CONTROL', state: NODE_STATE.EXPERIMENT },
          { label: 'EQUIPMENT', state: NODE_STATE.EXPERIMENT },
        ],
      },
    ],
    cta: 'CASE STUDY',
  },
  visuals: {
    home: {
      id: VISUAL_ID.SMART_HOME,
      alt: '재배 베드와 환기 구조가 보이는 온실 내부 — 개념 이미지',
      brief: 'SMART FARM — greenhouse, 4:3 / 4:5',
      pins: [
        {
          label: 'VENT',
          link: 'EQUIPMENT',
          state: NODE_STATE.EXPERIMENT,
          x: 10,
          y: 18,
          tablet: { x: 8, y: 16 },
          hideOnMobile: true,
        },
        {
          label: 'FAN',
          link: 'EQUIPMENT',
          state: NODE_STATE.EXPERIMENT,
          x: 18,
          y: 70,
          tablet: { x: 16, y: 72 },
          hideOnMobile: true,
        },
      ],
    },
    sensor: {
      id: VISUAL_ID.SMART_SENSOR,
      alt: '센서 인클로저 디테일 — 개념 이미지',
      brief: 'sensor enclosure, 1:1',
    },
    equipment: {
      id: VISUAL_ID.SMART_EQUIPMENT,
      alt: '환기팬과 관수 밸브 — 개념 이미지',
      brief: 'fan / valve / vent, 1:1 · 4:5',
    },
    hero: {
      id: VISUAL_ID.SMART_HERO,
      alt: '온실 통로 와이드 — 개념 이미지',
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
