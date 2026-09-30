import { Column } from '@/components/atoms/column';
import { JumpLink } from '@/components/atoms/jump-link';
import { Text } from '@/components/atoms/text';
import type { RelationCheckItem } from '@/dto/explorer.dto';
import { TAG } from '@/constants/tag';

export function RelationCheckView({ check }: { check: RelationCheckItem }) {
  return (
    <Column
      as={TAG.ASIDE}
      aria-label={check.label}
      className='gap-2 px-4 py-3.5 [border:1px_dashed_var(--graphite)]'
    >
      <Text as={TAG.SPAN} className='mono text-subtle'>
        {check.label}
      </Text>
      <Text as={TAG.SPAN} className='text-[17px] leading-[1.35] font-medium'>
        {check.title}
      </Text>
      <Text className='text-small leading-[1.6]'>{check.body}</Text>
      {check.note && check.noteHref ? (
        <JumpLink
          href={check.noteHref}
          label={`기술 노트 · ${check.note.label}`}
        />
      ) : null}
    </Column>
  );
}
