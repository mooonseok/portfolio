import { Column } from '@/components/atoms/column';
import { Text } from '@/components/atoms/text';
import type { ExperienceItem } from '@/dto/site.dto';
import { TAG } from '@/constants/tag';

export function ExperienceItemView({
  name,
  scope,
  year,
}: ExperienceItem & { year?: string }) {
  return (
    <Column className='gap-0.5 tab:gap-1 lap:gap-1.5'>
      {year ? (
        <Text as={TAG.SPAN} className='sr-only'>
          {year}년
        </Text>
      ) : null}
      <Text
        as={TAG.SPAN}
        className='text-[17px] font-medium tab:text-[16px] lap:text-[20px] lap:tracking-[-0.01em]'
      >
        {name}
      </Text>
      <Text as={TAG.SPAN} className='text-small leading-[1.4] text-subtle'>
        {scope}
      </Text>
    </Column>
  );
}
