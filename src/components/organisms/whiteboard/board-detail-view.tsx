import { MarkerPathView } from './marker-path-view';
import { Box } from '@/components/atoms/box';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import type { BoardColumn, BoardCopy } from '@/dto/board.dto';
import { TAG } from '@/constants/tag';

export function BoardDetailView({
  column,
  copy,
  visualsNoteKo,
}: {
  column: BoardColumn;
  copy: BoardCopy;
  visualsNoteKo: string;
}) {
  return (
    <Box
      as={TAG.FIGURE}
      className='board board-detail'
      aria-label={`${column.title} ${copy.label}`}
    >
      <Box className='board-surface'>
        <List className='detail-rows'>
          {column.boxes
            .filter((b) => b.lit)
            .map((b) => (
              <ListItem
                key={b.floor}
                className='detail-row'
                data-lit={b.lit || undefined}
                data-kind={b.kind}
                aria-hidden={b.lit ? undefined : true}
              >
                <Text as={TAG.SPAN} className='detail-floor'>
                  {b.label}
                  {b.experiment ? (
                    <Text as={TAG.SPAN} className='sr-only'>
                      {` (${copy.experiment})`}
                    </Text>
                  ) : null}
                </Text>
                <Box className='detail-box'>
                  {b.joinNext ? (
                    <MarkerPathView d={b.joinNext} className='detail-join' />
                  ) : null}
                  {b.tech ? (
                    <Text as={TAG.SPAN} className='detail-tech'>
                      {b.tech}
                    </Text>
                  ) : null}
                  {b.lit ? (
                    <Text as={TAG.SPAN} className='detail-lines'>
                      {b.summary}
                    </Text>
                  ) : null}
                </Box>
              </ListItem>
            ))}
        </List>
      </Box>
      <Box as={TAG.FIGCAPTION} className='board-legend'>
        <Box className='flex flex-wrap gap-x-6 gap-y-2'>
          {column.boxes.some((b) => b.lit && !b.experiment) ? (
            <Text as={TAG.SPAN} className='legend-item' data-kind='built'>
              {copy.legendBuilt}
            </Text>
          ) : null}
          {column.boxes.some((b) => b.lit && b.experiment) ? (
            <Text as={TAG.SPAN} className='legend-item' data-kind='experiment'>
              {copy.legendExperiment}
            </Text>
          ) : null}
        </Box>
        {copy.note ? <Text className='legend-note'>{copy.note}</Text> : null}
        <Text>{visualsNoteKo}</Text>
      </Box>
    </Box>
  );
}
