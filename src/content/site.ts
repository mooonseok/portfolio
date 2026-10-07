import type { LabelValue } from '@/dto/field.dto';
import type { Site } from '@/dto/site.dto';
import type { Story } from '@/dto/story.dto';

export const site: Site = {
  name: 'PARK MOONSEOK',
  role: 'SOFTWARE ENGINEER',
  disciplines: 'Flutter / Web / Backend',
  range: { label: 'Selected Work', years: '2022—2026' },
  contact: {
    email: 'mspark9696@naver.com',
    github: 'https://github.com/mooonseok',
  },
  visualsNote:
    'Visuals are conceptual representations created for this case study.',
  visualsNoteKo:
    '이 포트폴리오의 이미지와 도식은 프로젝트를 설명하기 위해 재구성한 자료입니다.',
  board: {
    label: '프로젝트별 담당 범위',
    hint: '프로젝트를 선택해 담당 업무를 확인하세요.',
    show: '담당 업무 보기',
    hide: '접기',
    legendEmpty: '담당 범위 밖',
    read: '자세히 보기',
    legendBuilt: '직접 개발·유지보수',
    legendExperiment: '실험',
    experiment: '실험',
    note: '세로선은 같은 프로젝트에서 함께 맡은 영역을 잇는 표시이며, 호출 순서나 작업량을 뜻하지 않습니다.',
  },
  about:
    '팀원들과 요구사항과 데이터 구조를 조율하며 앱·관리자 웹·서버 API를 개발했습니다. 테스트·리뷰·배포와 운영 QA에도 참여했습니다.',
  introduction: '',
  primaryAction: { href: '#work', label: '참여 프로젝트 보기' },
  headline: '사용자 앱과 업무 시스템을 개발해 왔습니다.',
};

export const stories: Story[] = [
  {
    id: 'S01',
    href: '/work/apc#qr-attendance-device',
    linkLabel: 'APC 사례 보기',
    title: '앱 업데이트와 키오스크 복구',
    description:
      '현장 앱의 버전 확인과 APK 설치를 연결하고, 설치 화면 실행 실패나 앱 복귀 시 키오스크를 복구한 사례입니다.',
  },
  {
    id: 'S02',
    href: '/work/emosave#editor-state',
    linkLabel: 'Emosave 사례 보기',
    title: '편집 상태와 화면 갱신',
    description:
      '아이템의 이동·회전을 화면에 반영하고, 최종 배치 정보를 저장 데이터로 구성한 사례입니다.',
  },
  {
    id: 'S03',
    href: '/work/farmfam-plus#secret-deal-price',
    linkLabel: 'FarmFam+ 사례 보기',
    title: '시크릿딜의 가격과 주문 기준',
    description:
      '접속 시점에 따른 가격을 계산하고, 주문 생성 시 판매 조건과 가격·수량을 다시 확인한 사례입니다.',
  },
];

export const tools: LabelValue[] = [
  { label: '언어', value: 'Dart, TypeScript' },
  { label: '모바일', value: 'Flutter, Bloc / Cubit' },
  { label: '웹', value: 'React, Next.js, Tailwind CSS, MUI' },
  { label: '백엔드', value: 'NestJS' },
  { label: 'DB · 캐시', value: 'PostgreSQL, Redis' },
  { label: '클라우드', value: 'AWS, Google Cloud' },
  { label: '배포', value: 'Docker, GitHub Actions' },
  { label: '개발 · 협업', value: 'Git, GitHub' },
  { label: '테스트', value: 'Jest' },
  {
    label: '디바이스 · 통신',
    value: 'ESP32 / ESP32-S3, Raspberry Pi, MQTT (프로토타입)',
  },
];
