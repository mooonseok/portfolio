import { Box } from '@/components/atoms/box';
import { Cta } from '@/components/atoms/cta';
import { List, ListItem } from '@/components/atoms/list';
import { StatusLabel } from '@/components/atoms/status-label';
import { Text } from '@/components/atoms/text';
import type { BoardColumn } from '@/dto/board.dto';
import { TAG } from '@/constants/tag';
import { TONE } from '@/constants/tone';

export function BoardNoteView({
  column,
  id,
  open,
  read,
}: {
  column: BoardColumn;
  id: string;
  open: boolean;
  read: string;
}) {
  return (
    <Box id={id} className='board-note' hidden={!open}>
      <Box className='note-heading'>
        <Text className='note-title'>{column.title}</Text>
        <Box className='note-meta'>
          <Text as={TAG.SPAN} className='nowrap'>
            {column.period}
          </Text>
          <StatusLabel
            kind={column.kind}
            label={column.statusLabel}
            tone={TONE.INK}
          />
        </Box>
      </Box>
      <List className='note-layers'>
        {column.boxes
          .filter((b) => b.lit)
          .map((b) => (
            <ListItem key={b.floor} className='note-layer' data-kind={b.kind}>
              <Text as={TAG.SPAN} className='note-floor'>
                {b.label}
                {b.tech ? (
                  <Text as={TAG.SPAN} className='note-tech'>
                    {b.tech}
                  </Text>
                ) : null}
              </Text>
              <Text as={TAG.SPAN} className='note-lines'>
                {b.lines.join(' · ')}
              </Text>
            </ListItem>
          ))}
      </List>
      <Cta href={column.href} label={`${column.title} ${read}`} />
    </Box>
  );
}
