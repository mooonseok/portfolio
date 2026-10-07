import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import type { DomainItem } from '@/dto/domain.dto';
import type { HeadingLevel } from '@/constants/tag';

export function DomainHeadView({
  domain: d,
  level,
}: {
  domain: DomainItem;
  level: HeadingLevel;
}) {
  return (
    <Column className='gap-3.5'>
      <Heading
        level={level}
        className='text-[22px] leading-[1.25] font-medium tracking-[-0.012em] tab:text-d3'
      >
        {d.title}
      </Heading>
      <Text className='text-[15.5px] leading-[1.65] text-subtle tab:text-body'>
        {d.lead}
      </Text>
    </Column>
  );
}
