import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Text } from '@/components/atoms/text';
import { TAG } from '@/constants/tag';
import type { Field } from '@/dto/field.dto';

export function FieldRows({ rows }: { rows: Field[] }) {
  return (
    <Column as={TAG.DL} className='m-0 max-w-[820px] gap-4'>
      {rows.map((r) => (
        <Box
          key={r.label}
          className='flex flex-col gap-1 tab:grid tab:grid-cols-[140px_minmax(0,1fr)] tab:gap-4'
        >
          <Text as={TAG.DT} className='mono muted tab:pt-1'>
            {r.label}
          </Text>
          <Column as={TAG.DD} className='m-0 gap-1.5 text-body leading-[1.65]'>
            {r.body.map((b) => (
              <Text key={b}>{b}</Text>
            ))}
          </Column>
        </Box>
      ))}
    </Column>
  );
}
