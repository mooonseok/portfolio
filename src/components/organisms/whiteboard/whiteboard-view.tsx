import { BoardColumnView } from './board-column-view';
import { Box } from '@/components/atoms/box';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import type { WhiteboardViewProps } from '@/dto/board.dto';
import { LIST_TAG, TAG } from '@/constants/tag';

export function WhiteboardView({
  floors,
  columns,
  copy,
  selected,
  animate,
  onSelect,
}: WhiteboardViewProps) {
  return (
    <Box
      as={TAG.FIGURE}
      id='scope-board'
      className='board'
      aria-label={copy.label}
      data-animate={animate || undefined}
    >
      <Box className='board-surface'>
        <Text className='board-hint'>{copy.hint}</Text>
        <Box className='board-grid'>
          <List className='board-floors' aria-hidden='true'>
            {floors.map((f) => (
              <ListItem key={f.floor} className='board-floor'>
                {f.label}
              </ListItem>
            ))}
          </List>
          <List as={LIST_TAG.OL} className='board-cols'>
            {columns.map((c, i) => (
              <BoardColumnView
                key={c.slug}
                column={c}
                index={i}
                selected={c.slug === selected}
                copy={copy}
                onSelect={onSelect}
              />
            ))}
          </List>
        </Box>
      </Box>
      <Box className='board-tray' aria-hidden='true'>
        <Box as={TAG.SPAN} className='tray-marker' data-color='ink' />
        <Box as={TAG.SPAN} className='tray-marker' data-color='blue' />
        <Box as={TAG.SPAN} className='tray-marker' data-color='red' />
        <Box as={TAG.SPAN} className='tray-eraser' />
      </Box>
      <Box as={TAG.FIGCAPTION} className='board-legend'>
        <Text as={TAG.SPAN} className='legend-item' data-kind='built'>
          {copy.legendBuilt}
        </Text>
        <Text as={TAG.SPAN} className='legend-item' data-kind='experiment'>
          {copy.legendExperiment}
        </Text>
        {copy.legendEmpty ? (
          <Text as={TAG.SPAN} className='legend-empty'>
            {copy.legendEmpty}
          </Text>
        ) : null}
        {copy.note ? <Text className='legend-note'>{copy.note}</Text> : null}
      </Box>
    </Box>
  );
}
