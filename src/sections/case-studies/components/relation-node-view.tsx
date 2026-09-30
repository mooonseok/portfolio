import type { ElementRef, RelationItem } from '@/dto/explorer.dto';
import { Button } from '@/components/atoms/button';
import { ChoiceDot } from '@/components/atoms/choice-dot';
import { Column } from '@/components/atoms/column';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import { cx } from '@/lib/cx';
import { TAG } from '@/constants/tag';

export const nodeBox =
  'group/node relative w-full cursor-pointer border border-graphite bg-paper text-left [transition:background-color_150ms_var(--ease),border-color_150ms_var(--ease),box-shadow_150ms_var(--ease)] focus-visible:outline-offset-3 data-selected:border-ink data-selected:bg-tint data-selected:[box-shadow:inset_0_0_0_0.5px_var(--ink)] fine:hover:border-ink';

export const nodeName =
  'decoration-1 underline-offset-4 fine:group-hover/node:underline';

export function RelationNodeView({
  node,
  selected,
  lead,
  panelId,
  onSelect,
  buttonRef,
}: {
  node: RelationItem;
  selected: boolean;
  lead: boolean;
  panelId: string;
  onSelect: (id: string) => void;
  buttonRef: ElementRef;
}) {
  return (
    <Button
      ref={buttonRef(node.id)}
      id={node.buttonId}
      aria-pressed={selected}
      aria-controls={panelId}
      data-selected={selected || undefined}
      onClick={() => onSelect(node.id)}
      className={cx(nodeBox, 'flex min-h-11 flex-col gap-1.5 px-4 py-3')}
    >
      <Row as={TAG.SPAN} className='items-center gap-2 mono'>
        <ChoiceDot on={selected} />
        <Text as={TAG.SPAN}>
          {node.code}
          {lead ? ` · ${node.rel}` : null}
        </Text>
      </Row>
      <Column as={TAG.SPAN}>
        <Text
          as={TAG.SPAN}
          className={cx(
            'leading-[1.3] font-medium',
            lead ? 'text-[19px]' : 'text-[17px]',
            nodeName
          )}
        >
          {node.label}
        </Text>
      </Column>
    </Button>
  );
}
