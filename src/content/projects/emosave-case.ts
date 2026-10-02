import { EMO_STATE } from '@/constants/emo-state';
import { VISUAL_SLOT } from '@/constants/visual';
import type { CaseContent } from '@/dto/case.dto';

export const emosaveCase: CaseContent = {
  role: ['4인 팀에서 감정 탭과 편집 화면에 들어가는 기능 전반을 담당했습니다.'],
  contextProblem: [],
  systemFlows: [],
  interactionFocus: [
    {
      title: 'Customization',
      body: [
        '마을을 구성하는 캐릭터와 아이템을 배치하고 변경하는 꾸미기 UI를 작업했습니다.',
      ],
      visual: VISUAL_SLOT.CUSTOM,
      withStates: true,
    },
    {
      title: 'Character / Village',
      body: [
        '캐릭터와 이모티콘 데이터를 기반으로 마을 화면의 상태를 구성하고 표시하는 기능을 작업했습니다.',
      ],
      visual: VISUAL_SLOT.VILLAGE,
    },
    {
      title: 'Emoticon / Store',
      body: [
        '이모티콘 삭제·공유와 스토어 UI 수정, 로컬라이징 및 UI 오류 수정을 작업했습니다.',
      ],
      visual: VISUAL_SLOT.STORE,
    },
  ],
  stateExample: {
    label: '꾸미기 상태',
    intro:
      '마을 꾸미기에서 사용자가 아이템을 선택하고 배치한 결과가 화면 상태에 반영되는 흐름을 단순화해 표현합니다.',
    caption:
      '설명용 예시 · 단순 도형으로 그린 모델이며 실제 앱 화면이나 동작을 그대로 재현한 것이 아닙니다.',
    homeCaption: '설명용 예시 · 실제 앱 화면 아님',
    slotLabel: '배치 영역',
    trayLabel: '아이템',
    states: [
      {
        id: EMO_STATE.DEFAULT,
        label: '기본',
        code: 'DEFAULT',
        title: '아이템을 고르기 전',
        body: '선택된 아이템이 없습니다. 배치 영역은 현재 마을 구성을 그대로 보여줍니다.',
      },
      {
        id: EMO_STATE.SELECTED,
        label: '선택',
        code: 'SELECTED',
        title: '아이템을 고른 상태',
        body: '고른 아이템에 선택 외곽선이 표시됩니다. 선택한 아이템을 이동하거나 회전할 수 있습니다.',
      },
      {
        id: EMO_STATE.PLACED,
        label: '배치',
        code: 'PLACED',
        title: '배치 영역에 놓은 결과',
        body: '선택한 아이템이 배치 영역에 놓이고, 그 결과가 마을 화면 상태에 반영됩니다.',
      },
    ],
  },
  work: [
    {
      title: '감정 기록',
      body: [
        '감정 탭의 선택과 상태 처리를 개발하고 화면에 선택 결과를 반영했습니다.',
      ],
    },
    {
      title: '마을 편집',
      body: [
        '아이템 선택·이동·회전·삭제를 다루는 편집 UI와 상태 처리를 개발했습니다.',
      ],
    },
    {
      title: '저장·공유',
      body: [
        '편집 결과의 API·로컬 저장과 이모티콘을 이미지로 만들어 공유하는 기능을 작업했습니다.',
      ],
    },
  ],
  workParagraphs: [],
  decisions: [],
  techNotes: [
    {
      id: 'editor-state',
      title: '편집 상태와 화면 갱신',
      fields: [
        {
          label: '문제',
          body: [
            '아이템 선택과 배치 변경을 화면에 반영하면서 BlocBuilder를 어느 위치에 둘지 검토했습니다.',
          ],
        },
        {
          label: '구현',
          body: [
            '편집 상태를 다루는 Cubit과 BlocBuilder의 배치를 수정하고 상태 변화가 화면에 반영되는 위치를 검토했습니다.',
          ],
        },
        {
          label: '저장 경계',
          body: ['편집 결과는 API와 로컬 저장소에 순차 저장합니다.'],
        },
      ],
    },
  ],
  currentState: [
    '이때 쌓은 경험은 이후 IndianBob을 비롯한 프로젝트에서 상태 관리 구조를 이해하고 구현하는 바탕이 됐습니다.',
  ],
};
