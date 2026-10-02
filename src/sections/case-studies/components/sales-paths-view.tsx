import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Text } from '@/components/atoms/text';
import type { WorkItem } from '@/dto/work.dto';
import { TAG } from '@/constants/tag';

export function SalesPathsView({ items }: { items: WorkItem[] }) {
  return (
    <Box
      as={TAG.DL}
      className='grid grid-cols-1 gap-8 tab:grid-cols-2 tab:gap-10'
    >
      {items.map((item) => (
        <Column key={item.title} className='gap-4 border-t border-t-ink pt-5'>
          <Text as={TAG.DT} className='text-[22px] font-medium'>
            {item.title}
          </Text>
          {item.body.map((body) => (
            <Text
              key={body}
              as={TAG.DD}
              className='m-0 border-b border-b-hairline pb-4 text-body leading-[1.65]'
            >
              {body}
            </Text>
          ))}
        </Column>
      ))}
    </Box>
  );
}
