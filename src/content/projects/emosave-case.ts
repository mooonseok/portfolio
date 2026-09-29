import { VISUAL_SLOT } from '@/constants/visual';
import type { CaseContent } from '@/dto/case.dto';

export const emosaveCase: CaseContent = {
  role: [
    'Flutter 모바일 앱에서 감정 캐릭터 마을 화면과 꾸미기, 이모티콘·스토어 UI 및 일부 로컬라이징·QA 작업을 수행했습니다.',
  ],
  contextProblem: [],
  systemFlows: [],
  interactionFocus: [
    {
      title: 'Customization',
      body: [
        '마을을 구성하는 캐릭터와 아이템을 배치하고 변경하는 꾸미기 UI를 작업했습니다.',
      ],
      visual: VISUAL_SLOT.CUSTOM,
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
  stateFlow: ['DEFAULT', 'SELECTED', 'PLACED'],
  stateFlowNote:
    '마을 꾸미기에서 사용자가 아이템을 선택하고 배치한 결과가 화면 상태에 반영되는 흐름을 단순화해 표현합니다.',
  work: [],
  workParagraphs: [
    '마을 화면과 꾸미기 UI, 캐릭터·이모티콘 상태 처리, 이모티콘 삭제 및 공유 기능을 작업했습니다.',
    '스토어 UI 수정과 로컬라이징, 텍스트 clipping 등 UI 오류 수정도 함께 진행했습니다.',
  ],
  decisions: [],
  techNotes: [],
  currentState: [
    '2022년 협업 프로젝트입니다.',
    '포트폴리오에서는 모바일 인터랙션과 상태 기반 UI 작업을 중심으로 소개합니다.',
  ],
};
