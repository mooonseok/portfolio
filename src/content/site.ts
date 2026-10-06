import type { LabelValue } from '@/dto/field.dto';
import type { Site } from '@/dto/site.dto';
import type { Story } from '@/dto/story.dto';

export const site: Site = {
  name: 'PARK MOONSEOK',
  role: 'SOFTWARE ENGINEER',
  disciplines: 'Flutter / Web / Backend',
  range: { label: 'Selected Work', years: '2022—2026' },
  contact: {
    email: 'mspark9696@Naver.com',
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
    href: '/work/indian-bob#requirements-data',
    linkLabel: 'IndianBob 사례 보기',
    title: '팀 가입 정책과 설정 권한',
    description:
      '승인 방식에 따른 회원 등록·가입 요청 처리와 정원·중복 요청, 리더의 설정 변경 권한을 다룬 사례입니다.',
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
  { label: 'MOBILE', value: 'Flutter / Dart' },
  { label: 'WEB', value: 'TypeScript / Next.js / React' },
  { label: 'BACKEND', value: 'NestJS / PostgreSQL / Redis' },
  { label: 'DEVICE', value: 'MQTT / ESP32' },
];
