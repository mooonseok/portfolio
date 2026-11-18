import { PLAZA_EXAMPLE } from '@/constants/ai-practice';

export const plazaCase = {
  place: '데스크톱 광장 확대',
  label: '블로그 자동화',
  project: '우리 앨범',
  description: '그룹 사진 앨범 앱',
  panel: '최근 작업',
  update: '관리자 대시보드 디자인 통일과 반응형 개선',
  conditions: '11개 화면 너비 × 4개 단말 · 같은 44가지 조건',
  result: '겹침 5건 → 0건',
  [PLAZA_EXAMPLE.OVERLAP]: {
    label: '수정 전',
    caption:
      '‘우리 앨범’을 열자 최근 작업 패널이 옆 단말의 이름표 끝을 가렸습니다.',
  },
  [PLAZA_EXAMPLE.FIXED]: {
    label: '수정 후',
    caption:
      '패널을 광장 오른쪽 칸으로 옮기자 ‘블로그 자동화’가 끝까지 보입니다.',
  },
};
