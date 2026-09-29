import { Column } from '@/components/atoms/column';
import { Text } from '@/components/atoms/text';
import { has } from '@/lib/has';

export function ParagraphsView({
  list,
  lead,
}: {
  list: string[];
  lead?: boolean;
}) {
  if (!has(list)) return null;
  return (
    <Column className='gap-3.5'>
      {list.map((t) => (
        <Text
          key={t}
          className={
            lead
              ? 'text-lead leading-[1.55] tracking-[-0.004em]'
              : 'text-body leading-[1.7]'
          }
        >
          {t}
        </Text>
      ))}
    </Column>
  );
}
