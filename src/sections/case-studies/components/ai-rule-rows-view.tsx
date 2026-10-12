import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Text } from '@/components/atoms/text';
import type { AiRule } from '@/dto/ai-practice.dto';
import { TAG } from '@/constants/tag';

export function AiRuleRowsView({
  id,
  showLabel = true,
  label,
  rules,
  note,
}: {
  id: string;
  showLabel?: boolean;
  label: string;
  rules: AiRule[];
  note: string[];
}) {
  return (
    <Column className='max-w-[56rem] gap-4 tab:gap-5'>
      <Text
        as={TAG.SPAN}
        id={id}
        className={showLabel ? 'mono muted' : 'sr-only'}
      >
        {label}
      </Text>
      <Box as={TAG.DL} aria-labelledby={id} className='m-0'>
        {rules.map((rule) => (
          <Box
            key={rule.title}
            className='grid grid-cols-[80px_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 border-t border-t-hairline py-4 tab:grid-cols-[104px_minmax(0,1fr)] tab:gap-x-6 tab:py-5'
          >
            <Text
              as={TAG.DT}
              className='col-start-1 row-span-2 row-start-1 text-[14px] leading-[1.65] font-medium'
            >
              {rule.title}
            </Text>
            <Text
              as={TAG.DD}
              className='col-start-2 row-start-1 m-0 text-body leading-[1.65]'
            >
              {rule.summary}
            </Text>
            <Text
              as={TAG.DD}
              className='col-start-2 row-start-2 m-0 text-[14px] leading-[1.65] text-subtle'
            >
              {rule.example}
            </Text>
          </Box>
        ))}
      </Box>
      {note.map((body) => (
        <Text
          key={body}
          className='max-w-[40em] border-t border-t-hairline pt-4 text-body leading-[1.7] tab:pt-5'
        >
          {body}
        </Text>
      ))}
    </Column>
  );
}
