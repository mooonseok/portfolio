import { Box } from '@/components/atoms/box';
import { Cta } from '@/components/atoms/cta';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import type { BoardColumn } from '@/dto/board.dto';
import { TAG } from '@/constants/tag';

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
              <List className='note-lines'>
                {b.lines.map((line) => (
                  <ListItem key={line}>{line}</ListItem>
                ))}
              </List>
            </ListItem>
          ))}
      </List>
      <Cta href={column.href} label={`${column.title} ${read}`} />
    </Box>
  );
}
