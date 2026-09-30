import { Column } from '@/components/atoms/column';
import { JumpLink } from '@/components/atoms/jump-link';
import { Text } from '@/components/atoms/text';
import type { RelationItem } from '@/dto/explorer.dto';
import { TAG } from '@/constants/tag';

const label = 'text-[14.5px] leading-[1.5] font-medium';

export function RelationDetailView({ node }: { node: RelationItem }) {
  return (
    <>
      <Column className='gap-1'>
        <Text as={TAG.SPAN} className={label}>
          관계의 의미
        </Text>
        <Text className='text-body leading-[1.65]'>{node.why}</Text>
      </Column>
      <Column className='gap-1'>
        <Text as={TAG.SPAN} className={label}>
          실제 작업
        </Text>
        <Text className='text-body leading-[1.65]'>{node.work}</Text>
      </Column>
      {node.scope ? (
        <Column className='gap-1 border-l border-l-hairline pl-3'>
          <Text as={TAG.SPAN} className='mono text-subtle'>
            확인된 트랜잭션 범위
          </Text>
          <Text className='text-small leading-[1.6] text-subtle'>
            {node.scope}
          </Text>
        </Column>
      ) : null}
      {node.note && node.noteHref ? (
        <JumpLink
          href={node.noteHref}
          label={`기술 노트 · ${node.note.label}`}
        />
      ) : null}
    </>
  );
}
