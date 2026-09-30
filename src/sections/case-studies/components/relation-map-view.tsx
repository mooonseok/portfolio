import { RelationCheckView } from './relation-check-view';
import { RelationGraphView } from './relation-graph-view';
import { RelationPanelView } from './relation-panel-view';
import { RelationTreeView } from './relation-tree-view';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Grid } from '@/components/atoms/grid';
import { Text } from '@/components/atoms/text';
import type { RelationMapViewProps } from '@/dto/explorer.dto';
import { TAG } from '@/constants/tag';

export function RelationMapView(props: RelationMapViewProps) {
  const { rootRef, noteId, note, hint, hintMobile, origin, targets, check } =
    props;
  const current =
    [origin, ...targets].find((n) => n.id === props.selected) ?? origin;
  return (
    <Box ref={rootRef} className='flex flex-col gap-5 tab:gap-6'>
      <Text as={TAG.SPAN} className='mono text-subtle'>
        <Text as={TAG.SPAN} className='hidden tab:inline'>
          {hint}
        </Text>
        <Text as={TAG.SPAN} className='tab:hidden'>
          {hintMobile}
        </Text>
      </Text>
      <Grid className='grid-cols-[minmax(0,1fr)] gap-y-10 lap:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lap:[align-items:start] lap:gap-x-14'>
        <Column className='gap-4 tab:gap-5'>
          <RelationGraphView {...props} />
          <RelationTreeView {...props} />
          {check ? <RelationCheckView check={check} /> : null}
        </Column>
        <RelationPanelView panelId={props.panelId} node={current} />
      </Grid>
      <Text as={TAG.SPAN} id={noteId} className='text-small text-graphite'>
        {note}
      </Text>
    </Box>
  );
}
