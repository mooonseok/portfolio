import { STORY_KIND } from '@/constants/project';
import type { LabelValue } from '@/dto/field.dto';
import type { ExperienceYear, Site } from '@/dto/site.dto';
import type { Story } from '@/dto/story.dto';

export const site: Site = {
  name: 'PARK MOONSEOK',
  role: 'SOFTWARE ENGINEER',
  disciplines: 'Flutter / Web / Backend',
  range: { label: 'Selected Work', years: '2022—2026' },
  contact: { email: 'moonseokp96@gmail.com', github: '' },
  visualsNote:
    'Visuals are conceptual representations created for this case study.',
  visualsNoteKo:
    '이 포트폴리오의 이미지와 도식은 프로젝트를 설명하기 위해 재구성한 자료입니다.',
  about:
    '설계·개발·테스트·리뷰·배포에 참여하며, 화면에 보이는 기능과 그 뒤의 데이터 처리를 함께 다뤘습니다. 프로젝트에 따라 앱·웹·서버 개발을 맡았고, 운영 과정에서는 QA와 데이터 수정 업무에도 일부 참여했습니다.',
  introduction:
    '감정 기록 앱과 해빗 서비스에서 Flutter 개발 경험을 쌓았습니다. 앱 화면의 상태 관리부터 관리자 웹과 서버 API까지 기능에 필요한 영역을 연결하고, 팀원들과 요구사항과 데이터 구조를 조율하며 개발했습니다.',
  primaryAction: { href: '#flutter-work', label: 'Flutter 작업 보기' },
  headline: 'Flutter 앱을 중심으로 웹과 서버를 함께 개발합니다.',
};

export const stories: Story[] = [
  {
    id: 'S01',
    href: '/work/indian-bob#requirements-data',
    linkLabel: 'IndianBob 사례 보기',
    title: '앱·웹·API의 요구사항과 데이터 정렬',
    description:
      '해빗 기능의 요구사항과 DB 변경을 조율하고 여러 화면과 API에 반영한 경험입니다.',
    kind: STORY_KIND.FLOW,
    flow: [],
  },
  {
    id: 'S02',
    href: '/work/emosave#editor-state',
    linkLabel: 'Emosave 사례 보기',
    title: '편집 상태와 화면 갱신',
    description:
      '아이템을 편집하는 상태와 BlocBuilder의 배치를 다룬 경험입니다.',
    kind: STORY_KIND.FLOW,
    flow: [],
  },
  {
    id: 'S03',
    href: '/work/farmfam-plus#secret-deal-price',
    linkLabel: 'FarmFam+ 사례 보기',
    title: '시크릿딜의 가격과 주문 기준',
    description:
      '시간에 따라 바뀌는 가격을 주문 생성 시점에 다시 확인한 사례입니다.',
    kind: STORY_KIND.FLOW,
    flow: [],
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
