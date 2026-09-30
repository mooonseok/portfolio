import { RelationDetailView } from './relation-detail-view';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import { cx } from '@/lib/cx';
import type { RelationItem } from '@/dto/explorer.dto';
import { HEADING, TAG } from '@/constants/tag';

export function RelationPanelView({
  panelId,
  nodes,
  selected,
  className,
}: {
  panelId: string;
  nodes: RelationItem[];
  selected: string;
  className?: string;
}) {
  return (
    <Grid
      id={panelId}
      className={cx(
        'hidden [align-items:start] border-t border-t-ink pt-4 tab:grid',
        className
      )}
    >
      {nodes.map((node) => {
        const on = node.id === selected;
        return (
          <Column
            key={node.id}
            aria-hidden={on ? undefined : 'true'}
            data-selected={on || undefined}
            className='invisible col-start-1 row-start-1 gap-4.5 opacity-0 data-selected:visible data-selected:opacity-100 data-selected:[transition:opacity_150ms_var(--ease)]'
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
        );
      })}
    </Grid>
  );
}
