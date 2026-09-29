import { ExperienceItemView } from './experience-item-view';
import { Box } from '@/components/atoms/box';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import type { ExperienceYear } from '@/dto/site.dto';
import { LIST_TAG, TAG } from '@/constants/tag';

export function ExperienceAxisView({ years }: { years: ExperienceYear[] }) {
  return (
    <Box className='grid-page tab:mt-10 lap:mt-16 mob:hidden'>
      <Box
        className='tab:col-span-full lap:col-[3/13]'
        data-reveal-item='visual'
      >
        <Box className='tab:grid tab:grid-cols-5 tab:[align-items:end]'>
          {years.map((y) => (
            <Box
              key={y.year}
              className='tab:flex tab:h-full tab:flex-col tab:justify-end tab:gap-[18px] tab:pr-3.5 lap:gap-6 lap:pr-6'
            >
              {y.items.map((it) => (
                <ExperienceItemView key={it.name} {...it} />
              ))}
            </Box>
          ))}
        </Box>
        <List
          as={LIST_TAG.OL}
          className='tab:mt-6 tab:grid tab:grid-cols-5 tab:border-t tab:border-t-ink lap:mt-8'
          aria-hidden='true'
        >
          {years.map((y) => (
            <ListItem
              key={y.year}
              className='mono tab:flex tab:flex-col tab:gap-3 lap:gap-3.5'
            >
              <Text as={TAG.SPAN} className='tab:h-2.5 tab:w-px tab:bg-ink' />
              {y.year}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
