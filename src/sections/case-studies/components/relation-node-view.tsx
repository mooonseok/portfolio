import type { CSSProperties, ReactNode } from 'react';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Column } from '@/components/atoms/column';
import { Text } from '@/components/atoms/text';
import { cx } from '@/lib/cx';
import type { RelationItem } from '@/dto/explorer.dto';
import { TAG } from '@/constants/tag';

export function RelationNodeView({
  node,
  selected,
  onSelect,
  className,
  style,
  children,
}: {
  node: RelationItem;
  selected: boolean;
  onSelect: (id: string) => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <Box className={cx('relative', className)} style={style}>
      {children}
      <Button
        aria-pressed={selected}
        aria-controls={node.descId}
        data-selected={selected || undefined}
        onClick={() => onSelect(node.id)}
        className='group/node relative grid min-h-11 w-full cursor-pointer grid-cols-[9px_minmax(0,1fr)] items-center gap-x-3 border-0 bg-transparent px-0 py-2 text-left'
      >
        <Box
          as={TAG.SPAN}
          aria-hidden='true'
          className='size-[9px] rounded-[50%] border-[1.25px] border-ink bg-paper [transition:background-color_150ms_var(--ease),border-color_150ms_var(--ease)] group-data-selected/node:border-signal group-data-selected/node:bg-signal'
        />
        <Column as={TAG.SPAN} className='min-w-0 gap-0.5'>
          <Text
            as={TAG.SPAN}
            className='text-[17px] leading-[1.35] font-medium decoration-graphite decoration-1 underline-offset-[5px] group-data-selected/node:underline group-data-selected/node:decoration-ink fine:group-hover/node:underline'
          >
            {node.label}
          </Text>
          <Text as={TAG.SPAN} className='text-small text-graphite'>
            {node.sub}
          </Text>
        </Column>
      </Button>
    </Box>
  );
}
