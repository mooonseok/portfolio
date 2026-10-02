import type { LabelValue } from '@/dto/field.dto';
import type { ExperienceYear, Site } from '@/dto/site.dto';
import type { Story } from '@/dto/story.dto';

export const site: Site = {
  name: 'PARK MOONSEOK',
  role: 'SOFTWARE ENGINEER',
  disciplines: 'Flutter / Web / Backend',
  range: { label: 'Selected Work', years: '2022—2026' },
  contact: {
    email: 'moonseokp96@gmail.com',
    github: 'https://github.com/mooonseok',
  },
  visualsNote:
    'Visuals are conceptual representations created for this case study.',
  visualsNoteKo:
    '이 포트폴리오의 이미지와 도식은 프로젝트를 설명하기 위해 재구성한 자료입니다.',
  about:
    'Flutter 앱과 관리자 웹, 서버 API를 개발했습니다. 팀원들과 요구사항과 데이터 구조를 조율하고, 테스트·리뷰·배포와 운영 QA에 참여했습니다.',
  introduction:
    '감정 기록·해빗 서비스의 앱 화면과 상태 처리를 개발했습니다. 관리자 웹과 서버 API도 맡아 사용자 기능과 운영 업무를 연결했습니다.',
  primaryAction: { href: '#flutter-work', label: 'Flutter 작업 보기' },
  headline: 'Flutter 앱을 중심으로 웹과 서버를 함께 개발합니다.',
};

export const stories: Story[] = [
  {
    id: 'S01',
    href: '/work/indian-bob#requirements-data',
    linkLabel: 'IndianBob 사례 보기',
    title: '해빗 입력을 API 데이터로 연결',
    description:
      '해빗 복제 시 기존 이미지와 새 파일을 구분하고, 입력값을 생성 API에 맞춰 처리했습니다.',
  },
  {
    id: 'S02',
    href: '/work/emosave#editor-state',
    linkLabel: 'Emosave 사례 보기',
    title: '편집 상태와 화면 갱신',
    description:
      '이동·회전 상태를 화면에 반영하고, 편집 결과를 저장 데이터로 합친 경험입니다.',
  },
  {
    id: 'S03',
    href: '/work/farmfam-plus#secret-deal-price',
    linkLabel: 'FarmFam+ 사례 보기',
    title: '시크릿딜의 가격과 주문 기준',
    description:
      '시간에 따라 바뀌는 가격을 주문 생성 시점에 다시 확인한 사례입니다.',
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
