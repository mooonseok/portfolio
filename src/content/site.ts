import { NODE_STATE } from '@/constants/flow';
import { STORY_KIND } from '@/constants/project';
import type { LabelValue } from '@/dto/field.dto';
import type { ExperienceYear, Site } from '@/dto/site.dto';
import type { Story } from '@/dto/story.dto';

export const site: Site = {
  name: 'PARK MOONSEOK',
  role: 'SOFTWARE ENGINEER',
  disciplines: 'Mobile / Web / Backend / IoT',
  range: { label: 'Selected Work', years: '2022—2026' },
  contact: { email: '', github: '' },
  visualsNote:
    'Visuals are conceptual representations created for this case study.',
  visualsNoteKo:
    '보안 및 자산 보호를 위해 실제 서비스 화면 대신 프로젝트 구조를 재구성한 시각 자료를 사용했습니다.',
};

export const stories: Story[] = [
  {
    id: 'S01',
    title: 'LARGE IMAGE PROCESSING',
    kind: STORY_KIND.FLOW,
    flow: [
      { label: 'VERY TALL IMAGE' },
      { label: 'RESIZE' },
      { label: 'WEBP' },
      { label: 'UPLOAD', state: NODE_STATE.ACTIVE },
    ],
    description:
      '초장축·대형 이미지 처리 과정에서 종횡비를 유지한 축소와 WebP 변환 경로를 안정화하고 단위·통합 테스트를 추가했습니다.',
    keywords: [
      'Large / extremely tall images',
      'Transparency preservation',
      'Regression tests',
    ],
  },
  {
    id: 'S02',
    title: 'APPLE SIGN-IN INTEGRATION',
    kind: STORY_KIND.SEQUENCE,
    flow: [
      { label: 'CALLBACK' },
      { label: 'SERVER' },
      { label: 'ANDROID INTENT' },
      { label: 'APP' },
    ],
    description:
      'IndianBob Android 환경에서 Apple 로그인 callback 결과를 보조 서버를 통해 앱 deep link로 전달하는 연동 흐름을 작업했습니다.',
  },
  {
    id: 'S03',
    title: 'HANDWRITTEN OCR',
    kind: STORY_KIND.EXPERIMENT,
    flow: [
      { label: 'DOCUMENT', state: NODE_STATE.EXPERIMENT },
      { label: 'OCR PROTOTYPE', state: NODE_STATE.EXPERIMENT },
      { label: 'VALIDATION', state: NODE_STATE.EXPERIMENT },
      { label: 'NOT SHIPPED', state: NODE_STATE.EXPERIMENT },
    ],
    description:
      '수기 입고 신청서의 반복 입력을 줄이기 위해 OCR 자동화를 프로토타입으로 검토했지만 실제 필체 편차와 업무 데이터 신뢰성 문제로 제품 기능에는 적용하지 않았습니다.',
  },
];

export const experience: ExperienceYear[] = [
  { year: '2022', items: [{ name: 'EMOSAVE', scope: 'Flutter Mobile' }] },
  { year: '2023', items: [] },
  {
    year: '2024',
    items: [
      { name: 'INDIAN BOB', scope: 'App / API / Admin' },
      { name: 'APC', scope: 'Field / Web / API / DB' },
    ],
  },
  {
    year: '2025',
    items: [{ name: 'FARMFAM+', scope: 'Commerce / Web / API / DB' }],
  },
  {
    year: '2026',
    items: [{ name: 'SMART FARM', scope: 'Monitoring / IoT' }],
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
