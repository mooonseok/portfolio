import { Text } from '@/components/atoms/text';
import { site } from '@/content/site';

export function VisualsNote() {
  return (
    <Text className='mt-4 max-w-[40em] text-small leading-[1.65] text-subtle on-dark:text-dark-sub'>
      {site.visualsNoteKo}
    </Text>
  );
}
