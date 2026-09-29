import { ExperienceItemView } from './experience-item-view';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import type { ExperienceYear } from '@/dto/site.dto';
import { LIST_TAG, TAG } from '@/constants/tag';

export function ExperienceTimelineView({ years }: { years: ExperienceYear[] }) {
  return (
    <List
      as={LIST_TAG.OL}
      className="relative mt-7 flex flex-col gap-7 pl-6 before:absolute before:top-1.5 before:bottom-1.5 before:left-1 before:border-l before:border-l-ink before:content-[''] tab:hidden"
    >
      {years.map((y) => (
        <ListItem key={y.year} className='flex flex-col gap-3'>
          <Text as={TAG.SPAN} className='relative mono'>
            <Text
              as={TAG.SPAN}
              className='absolute top-[5px] left-[-24px] h-[9px] w-[9px] rounded-[50%] border-[1.25px] border-ink bg-paper'
              aria-hidden='true'
            />
            {y.year}
          </Text>
          {y.items.map((it) => (
            <ExperienceItemView key={it.name} {...it} />
          ))}
        </ListItem>
      ))}
    </List>
  );
}
