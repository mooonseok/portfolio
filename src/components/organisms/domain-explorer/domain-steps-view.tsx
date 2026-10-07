import { Box } from '@/components/atoms/box';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import type { DomainStep } from '@/dto/domain.dto';
import { LIST_TAG, TAG } from '@/constants/tag';

export function DomainStepsView({
  steps,
  label,
}: {
  steps: DomainStep[];
  label: string;
}) {
  return (
    <List
      as={LIST_TAG.OL}
      aria-label={label}
      className='flex flex-col tab:flex-row'
    >
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <ListItem
            key={s.code}
            className='relative grid grid-cols-[11px_minmax(0,1fr)] gap-x-3.5 pb-5 last:pb-0 tab:flex tab:min-w-0 tab:flex-1 tab:flex-col tab:gap-2.5 tab:pr-3 tab:pb-0 tab:last:flex-none tab:last:pr-0'
          >
            <Box
              as={TAG.SPAN}
              aria-hidden='true'
              className='relative z-1 mt-1.5 size-[11px] rounded-[50%] border-[1.25px] border-ink bg-paper tab:mt-0'
            />
            {last ? null : (
              <Box
                as={TAG.SPAN}
                aria-hidden='true'
                className='absolute top-[17px] bottom-[-6px] left-[5px] border-l-[1.25px] border-l-ink tab:top-[5px] tab:right-0 tab:bottom-auto tab:left-[11px] tab:border-t-[1.25px] tab:border-l-0 tab:border-t-ink'
              />
            )}
            <Box className='flex min-w-0 flex-col gap-0.5'>
              <Text as={TAG.SPAN} className='mono [overflow-wrap:anywhere]'>
                {s.code}
              </Text>
              <Text
                as={TAG.SPAN}
                className='text-[14px] leading-[1.45] text-subtle'
              >
                {s.sub}
              </Text>
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
}
