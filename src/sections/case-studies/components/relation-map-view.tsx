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
  const nodes = [origin, ...targets];
  const selected = nodes.some((n) => n.id === props.selected)
    ? props.selected
    : origin.id;
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
      <Grid className='grid-cols-[minmax(0,1fr)] gap-y-5 tab:gap-y-6 lap:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lap:[align-items:start] lap:gap-x-14 lap:gap-y-5'>
        <Column className='lap:col-[1] lap:row-[1]'>
          <RelationGraphView {...props} />
          <RelationTreeView {...props} />
        </Column>
        <RelationPanelView
          panelId={props.panelId}
          nodes={nodes}
          selected={selected}
          className='lap:col-[2] lap:row-[1/3]'
        />
        {check ? (
          <Column className='lap:col-[1] lap:row-[2]'>
            <RelationCheckView check={check} />
          </Column>
        ) : null}
      </Grid>
      <Text as={TAG.SPAN} id={noteId} className='text-small text-subtle'>
        {note}
      </Text>
    </Box>
  );
}
