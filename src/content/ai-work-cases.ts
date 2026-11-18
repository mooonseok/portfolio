import type { AutomationCase } from '@/dto/ai-automation-case.dto';

const blog: AutomationCase = {
  start: '유튜브 링크를 넣으면 자막을 가져옵니다.',
  work: '자막을 분석해 글의 순서를 잡고, 초안을 쓴 뒤 그림과 예시를 다듬습니다.',
  returns: [
    {
      condition: '형식 검사에서 오류 발견',
      action: '교정 담당이 고친 뒤 같은 검사를 다시 실행합니다.',
    },
    {
      condition: '독자 테스트에서 설명이 막힘',
      action:
        '작성 담당이 해당 대목을 다시 씁니다. 이후에는 형식 검사만 진행합니다.',
    },
  ],
  sample: '11월 9일 · 하네스·루프·그래프 글',
  output: '초안은 최종 형식 검사에 오류가 남아도 저장합니다.',
  check: '형식 오류 0개 · 경고 0개 · 독자 테스트 통과',
  handoff: '저장된 글과 이미지를 직접 확인하고 티스토리에 발행합니다.',
};

export const workCases = [
  { id: 'plaza', label: '광장 이름표', title: '패널에 가려진 광장 이름표' },
  {
    id: 'blog',
    label: '블로그 초안 자동화',
    title: '영상 한 편에서 블로그 초안까지',
    automation: blog,
  },
] as const;
