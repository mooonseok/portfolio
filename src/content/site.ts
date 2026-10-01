import { NODE_STATE } from '@/constants/flow';
import { STORY_KIND } from '@/constants/project';
import type { LabelValue } from '@/dto/field.dto';
import type { ExperienceYear, Site } from '@/dto/site.dto';
import type { Story } from '@/dto/story.dto';

export const site: Site = {
  name: 'PARK MOONSEOK',
  role: 'SOFTWARE ENGINEER',
  disciplines: 'Flutter / Web / Backend',
  range: { label: 'Selected Work', years: '2022—2026' },
  contact: { email: '', github: '' },
  visualsNote:
    'Visuals are conceptual representations created for this case study.',
  visualsNoteKo:
    '보안 및 자산 보호를 위해 실제 서비스 화면 대신 프로젝트 구조를 재구성한 시각 자료를 사용했습니다.',
  about:
    '설계·개발·테스트·리뷰·배포에 참여하며, 화면에 보이는 기능과 그 뒤의 데이터 처리를 함께 다뤘습니다. 프로젝트에 따라 앱·웹·서버 개발을 맡았고, 운영 과정에서는 QA와 데이터 수정 업무에도 일부 참여했습니다.',
  introduction:
    '감정 기록 앱과 해빗 서비스에서 Flutter 개발 경험을 쌓았습니다. 앱 화면의 상태 관리부터 관리자 웹과 서버 API까지 기능에 필요한 영역을 연결하고, 팀원들과 요구사항과 데이터 구조를 조율하며 개발했습니다.',
  headline: 'Flutter 앱을 중심으로 웹과 서버를 함께 개발합니다.',
};

export const stories: Story[] = [
  {
    id: 'S01',
    title: 'FLUTTER STATE MANAGEMENT',
    kind: STORY_KIND.FLOW,
    flow: [
      { label: 'STATE' },
      { label: 'BLOCBUILDER' },
      { label: 'UI', state: NODE_STATE.ACTIVE },
    ],
    description:
      'Emosave에서 BlocBuilder 배치와 화면 갱신 범위를 고민했습니다. 상태 관리 경험을 이후 IndianBob을 비롯한 프로젝트에 적용했습니다.',
  },
  {
    id: 'S02',
    title: 'APP / WEB / API',
    kind: STORY_KIND.FLOW,
    flow: [{ label: 'APP' }, { label: 'API' }, { label: 'ADMIN' }],
    description:
      'IndianBob 해빗 기능을 앱·웹·서버에 걸쳐 개발했습니다. 요구사항과 DB 설계 변경을 팀원들과 조율하며 각 영역에 반영했습니다.',
  },
  {
    id: 'S03',
    title: 'SENSOR MONITORING',
    kind: STORY_KIND.EXPERIMENT,
    flow: [
      { label: 'SENSOR', state: NODE_STATE.EXPERIMENT },
      { label: 'MQTT', state: NODE_STATE.EXPERIMENT },
      { label: 'DASHBOARD', state: NODE_STATE.EXPERIMENT },
    ],
    description:
      '사무실에서 온습도·CO₂ 센서 시험 모듈을 구성하고, MQTT로 전달한 측정값을 대시보드에서 확인했습니다. 실제 농장 적용 전 단계입니다.',
  },
];

export const experience: ExperienceYear[] = [
  { year: '2022—2023', items: [{ name: 'EMOSAVE', scope: 'Flutter Mobile' }] },
  {
    year: '2024—2025',
    items: [{ name: 'INDIAN BOB', scope: 'Flutter / Web / API' }],
  },
  {
    year: '2025—2026',
    items: [
      { name: 'FARMFAM+', scope: 'Web / API / DB' },
      { name: 'APC', scope: 'Web / API / DB' },
      { name: 'SMART FARM', scope: 'Office Prototype' },
    ],
  },
];

export const tools: LabelValue[] = [
  { label: 'MOBILE', value: 'Flutter / Dart' },
  { label: 'WEB', value: 'TypeScript / Next.js / React' },
  { label: 'BACKEND', value: 'NestJS / PostgreSQL / Redis' },
  { label: 'DEVICE', value: 'MQTT / ESP32' },
];

export const thisWebsite: LabelValue[] = [
  { label: 'VISUALS', value: 'Conceptual reconstructions' },
  {
    label: 'DESIGN SYSTEM',
    value: '12-column grid / 3 typefaces / 1 signal color',
  },
  { label: 'INTERACTION', value: 'Signal line / interactive diagrams' },
  { label: 'STACK', value: 'Next.js / TypeScript' },
];
