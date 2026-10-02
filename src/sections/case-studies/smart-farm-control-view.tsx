import { CaseSectionView } from './components/case-section-view';
import { ControlConditions } from './components/control-conditions';
import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import { FieldRows } from '@/components/molecules/field-rows';
import type { CaseViewModel } from '@/dto/case-view.dto';
import { CASE_DEPTH, CASE_LAYOUT } from '@/constants/case';
import { HEADING } from '@/constants/tag';

export function SmartFarmControlView({ p, groups }: CaseViewModel) {
  const c = p.case.controlExperiment;
  if (!c) return null;
  return (
    <CaseSectionView
      group={groups.engineering}
      depth={CASE_DEPTH.L2}
      title={c.title}
      layout={CASE_LAYOUT.WIDE}
    >
      <Column className='gap-8 border border-dashed border-ink p-5 tab:gap-10 tab:p-8'>
        <Text className='text-body leading-[1.7]'>{c.subtitle}</Text>
        <ControlConditions c={c} />
        <Column className='gap-5 border-t border-t-hairline pt-6'>
          <Heading level={HEADING.H3} className='text-d3 font-medium'>
            실험 목적과 검증 범위
          </Heading>
          <FieldRows rows={c.rows} />
        </Column>
      </Column>
    </CaseSectionView>
  );
}
