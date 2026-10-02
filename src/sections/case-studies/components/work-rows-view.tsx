import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Text } from '@/components/atoms/text';
import type { WorkItem } from '@/dto/work.dto';
import { TAG } from '@/constants/tag';

export function WorkRowsView({ items }: { items: WorkItem[] }) {
  if (!items.length) return null;
  return (
    <Box as={TAG.DL} className='m-0 border-b border-b-hairline'>
      {items.map((w) => (
        <Box
          key={w.title}
          className='flex flex-col gap-1.5 border-t border-t-hairline py-3.5 tab:grid tab:grid-cols-[minmax(120px,0.4fr)_minmax(0,1fr)] tab:gap-4 tab:py-4'
        >
          <Text as={TAG.DT} className='text-[17px] font-medium'>
            {w.title}
          </Text>
          <Column as={TAG.DD} className='m-0 gap-1.5 text-[16px] leading-[1.7]'>
            {w.body.map((b) => (
              <Text key={b}>{b}</Text>
            ))}
          </Column>
        </Box>
      ))}
    </Box>
  );
}
