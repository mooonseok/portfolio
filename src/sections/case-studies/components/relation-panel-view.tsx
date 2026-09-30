import { RelationDetailView } from './relation-detail-view';
import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import type { RelationItem } from '@/dto/explorer.dto';
import { HEADING, TAG } from '@/constants/tag';

export function RelationPanelView({
  panelId,
  node,
}: {
  panelId: string;
  node: RelationItem;
}) {
  return (
    <Column
      id={panelId}
      className='hidden gap-4.5 border-t border-t-ink pt-4 tab:flex'
    >
      <Column
        key={node.id}
        className='gap-4.5 motion-safe:animate-[fade-in_150ms_var(--ease)]'
      >
        <Text as={TAG.SPAN} className='mono'>
          선택 · {node.rel}
        </Text>
        <Heading
          level={HEADING.H3}
          className='text-d3 leading-[1.25] font-medium tracking-[-0.012em]'
        >
          {node.label}
        </Heading>
        <RelationDetailView node={node} />
      </Column>
    </Column>
  );
}
