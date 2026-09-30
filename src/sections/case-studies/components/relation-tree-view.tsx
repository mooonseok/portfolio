import { RelationDetailView } from './relation-detail-view';
import { nodeBox, nodeName } from './relation-node-view';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { ChoiceDot } from '@/components/atoms/choice-dot';
import { Column } from '@/components/atoms/column';
import { List, ListItem } from '@/components/atoms/list';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import { cx } from '@/lib/cx';
import { type TreeSegments, treeSegments } from '@/lib/relation-path';
import type { RelationItem, RelationMapViewProps } from '@/dto/explorer.dto';
import { TAG } from '@/constants/tag';

const line =
  'absolute border-graphite [transition:border-color_150ms_var(--ease)] data-on:border-ink';

function TreeNode({
  node,
  open,
  onToggle,
  toggleRef,
  seg,
}: {
  node: RelationItem;
  open: boolean;
  onToggle: (id: string) => void;
  toggleRef: RelationMapViewProps['toggleRef'];
  seg?: TreeSegments;
}) {
  return (
    <>
      <Box className='relative flex flex-col'>
        {seg ? (
          <>
            <Box
              as={TAG.SPAN}
              aria-hidden='true'
              className={cx(
                line,
                '-top-2 bottom-1/2 -left-4 z-1 border-l data-on:border-l-2'
              )}
              data-on={seg.upper || undefined}
            />
            <Box
              as={TAG.SPAN}
              aria-hidden='true'
              className={cx(
                line,
                'top-1/2 -left-4 w-4 border-t data-on:border-t-2'
              )}
              data-on={seg.branch || undefined}
            />
          </>
        ) : null}
        <Button
          ref={toggleRef(node.id)}
          aria-expanded={open}
          aria-controls={node.regionId}
          data-selected={open || undefined}
          onClick={() => onToggle(node.id)}
          className={cx(
            nodeBox,
            'flex min-h-15 items-center justify-between gap-3 px-3.5 py-2.5'
          )}
        >
          <Column as={TAG.SPAN} className='min-w-0 gap-1'>
            <Row as={TAG.SPAN} className='items-center gap-2 mono'>
              <ChoiceDot on={open} />
              <Text as={TAG.SPAN}>{node.rel}</Text>
            </Row>
            <Text
              as={TAG.SPAN}
              className={cx('text-[17px] leading-[1.3] font-medium', nodeName)}
            >
              {node.label}
            </Text>
          </Column>
          <Text
            as={TAG.SPAN}
            aria-hidden='true'
            className='w-5 flex-none text-center text-[20px] leading-none'
          >
            {open ? '−' : '+'}
          </Text>
        </Button>
      </Box>
      <Column
        id={node.regionId}
        role='region'
        aria-label={node.label}
        hidden={!open}
        className='gap-3.5 border border-t-0 border-ink px-3.5 pt-3.5 pb-4.5 [&[hidden]]:hidden'
      >
        <RelationDetailView node={node} />
      </Column>
    </>
  );
}

export function RelationTreeView({
  titleId,
  origin,
  targets,
  open,
  onToggle,
  toggleRef,
}: RelationMapViewProps) {
  const all = open === origin.id;
  const segs = treeSegments(
    targets.map((t) => t.id),
    origin.id,
    open
  );
  return (
    <List aria-labelledby={titleId} className='flex flex-col tab:hidden'>
      <ListItem className='flex flex-col'>
        <TreeNode
          node={origin}
          open={all}
          onToggle={onToggle}
          toggleRef={toggleRef}
        />
      </ListItem>
      {targets.map((t, i) => {
        const seg = segs[i];
        return (
          <ListItem key={t.id} className='relative mt-2 flex flex-col pl-6'>
            {i < targets.length - 1 ? (
              <Box
                as={TAG.SPAN}
                aria-hidden='true'
                className={cx(
                  line,
                  'inset-y-0 left-2 border-l data-on:border-l-2'
                )}
                data-on={seg.lower || undefined}
              />
            ) : null}
            <TreeNode
              node={t}
              open={t.id === open}
              onToggle={onToggle}
              toggleRef={toggleRef}
              seg={seg}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
