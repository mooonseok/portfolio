import type { LabelValue } from '@/dto/field.dto';
import type { Site } from '@/dto/site.dto';
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
  board: {
    label: '프로젝트별 담당 범위',
    hint: '프로젝트 이름을 누르면 영역별 작업과 기술이 메모로 붙습니다.',
    show: '메모 보기',
    hide: '메모 닫기',
    legendEmpty: '흐린 점선 · 맡지 않은 영역',
    read: '사례 읽기',
    legendBuilt: '직접 개발한 영역 · PRODUCT WORK',
    legendExperiment: '사무실 시험·별도 실험 · EXPERIMENT',
    experiment: '실험',
    note: '칸 크기는 작업량과 관계없습니다. 세로선은 한 프로젝트에서 함께 맡은 영역을 표시할 뿐 호출 순서가 아닙니다.',
  },
  about:
    'Flutter 앱과 관리자 웹, 서버 API를 개발했습니다. 팀원들과 요구사항과 데이터 구조를 조율하고, 테스트·리뷰·배포와 운영 QA에 참여했습니다.',
  introduction:
    '프로젝트 5개에서 직접 개발한 영역을 보드에 표시하고, 맡지 않은 영역은 흐린 점선으로 남겼습니다.',
  primaryAction: { href: '#work', label: '프로젝트 목록 보기' },
  headline:
    'Flutter 앱부터 관리자 웹, 서버 API까지 개발했고, 센서 기기 실험도 진행했습니다.',
};

export const stories: Story[] = [
  {
    id: 'S01',
    href: '/work/indian-bob#requirements-data',
    linkLabel: 'IndianBob 사례 보기',
    title: '팀 가입 정책과 설정 권한',
    description:
      '팀의 가입 승인 방식과 정원, 설정 변경 권한을 서버에서 구분한 사례입니다.',
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

export const tools: LabelValue[] = [
  { label: 'MOBILE', value: 'Flutter / Dart' },
  { label: 'WEB', value: 'TypeScript / Next.js / React' },
  { label: 'BACKEND', value: 'NestJS / PostgreSQL / Redis' },
  { label: 'DEVICE', value: 'MQTT / ESP32' },
];
