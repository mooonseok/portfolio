import type { CSSProperties } from 'react';
import { BoardNoteView } from './board-note-view';
import { MarkerPathView } from './marker-path-view';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import type { BoardColumn, BoardCopy } from '@/dto/board.dto';
import { TAG } from '@/constants/tag';

export function BoardColumnView({
  column: c,
  index,
  selected,
  copy,
  onSelect,
}: {
  column: BoardColumn;
  index: number;
  selected: boolean;
  copy: BoardCopy;
  onSelect: (slug: string, pointer: boolean) => void;
}) {
  const noteId = `board-note-${c.slug}`;
  return (
    <ListItem
      className='board-col'
      data-selected={selected || undefined}
      style={{ '--col': index + 2 } as CSSProperties}
    >
      <Box className='board-head'>
        <Button
          className='board-title'
          aria-expanded={selected}
          aria-controls={noteId}
          onClick={(event) => onSelect(c.slug, event.detail > 0)}
        >
          <Text as={TAG.SPAN} className='board-title-text'>
            {c.title}
            <MarkerPathView d={c.loop} className='board-loop' />
          </Text>
          <Text as={TAG.SPAN} className='board-toggle'>
            {selected ? copy.hide : copy.show}
          </Text>
        </Button>
        <Text className='board-service'>{c.service}</Text>
      </Box>
      <Box className='board-boxes'>
        {c.boxes.map((b) => (
          <Box
            key={b.floor}
            className='board-box'
            data-lit={b.lit || undefined}
            data-kind={b.kind}
            aria-hidden={b.lit ? undefined : true}
          >
            <MarkerPathView d={b.path} className='box-stroke' />
            {b.joinNext ? (
              <MarkerPathView d={b.joinNext} className='box-join' />
            ) : null}
            {b.lit ? (
              <>
                <Text as={TAG.SPAN} className='box-floor'>
                  {b.label}
                  {b.experiment ? (
                    <Text as={TAG.SPAN} className='sr-only'>
                      {` (${copy.experiment})`}
                    </Text>
                  ) : null}
                </Text>
                {b.tech ? (
                  <Text as={TAG.SPAN} className='box-tech'>
                    {b.tech}
                  </Text>
                ) : null}
                <Text as={TAG.SPAN} className='box-line'>
                  {b.lines[0]}
                </Text>
              </>
            ) : null}
          </Box>
        ))}
      </Box>
      <BoardNoteView column={c} id={noteId} open={selected} read={copy.read} />
    </ListItem>
  );
}
