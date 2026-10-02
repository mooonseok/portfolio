import { Cta } from '@/components/atoms/cta';
import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import type { StoryCard } from '@/dto/profile.dto';
import { HEADING, TAG } from '@/constants/tag';

export function StoryCardView({ story }: StoryCard) {
  return (
    <Column as={TAG.ARTICLE} className='gap-5 border-t border-t-ink pt-5'>
      <Text as={TAG.SPAN} className='mono muted'>
        {story.id}
      </Text>
      <Heading
        level={HEADING.H3}
        className='text-[20px] leading-[1.4] font-medium'
      >
        {story.title}
      </Heading>
      <Text className='text-small leading-[1.7]'>{story.description}</Text>
      <Cta href={story.href} label={story.linkLabel} />
    </Column>
  );
}
