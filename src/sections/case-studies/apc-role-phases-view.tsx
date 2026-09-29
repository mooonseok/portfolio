import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Text } from '@/components/atoms/text';
import type { RolePhase } from '@/dto/case.dto';
import { TAG } from '@/constants/tag';

export function ApcRolePhasesView({ phases }: { phases: RolePhase[] }) {
  return (
    <Box
      as={TAG.UL}
      className='flex flex-col tab:grid tab:grid-cols-2 tab:gap-(--gutter)'
    >
      {phases.map((ph) => (
        <Box
          as={TAG.LI}
          key={ph.title}
          className='grid grid-cols-[56px_1fr] gap-3 border-t border-t-hairline py-3 tab:flex tab:flex-col tab:gap-2 tab:border-t-ink tab:pt-3.5'
        >
          <Text as={TAG.SPAN} className='mono muted'>
            {ph.year}
          </Text>
          <Column
            as={TAG.SPAN}
            className='gap-0.5 text-[14px] tab:gap-2 tab:text-[15px]'
          >
            <Text
              as={TAG.SPAN}
              className='text-[17px] font-medium tab:text-[20px]'
            >
              {ph.title}
            </Text>
            <Text as={TAG.SPAN} className='muted'>
              {ph.scope}
            </Text>
          </Column>
        </Box>
      ))}
    </Box>
  );
}
