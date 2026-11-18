import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import { PLAZA_EXAMPLE } from '@/constants/ai-practice';
import { HEADING, TAG } from '@/constants/tag';
import { plazaCase } from '@/content/ai-plaza-case';
import { AiPlazaExample } from './ai-plaza-example';

export function AiPlazaCase() {
  return (
    <Box
      as={TAG.SECTION}
      id='plaza-case'
      aria-labelledby='plaza-case-title'
      className='border-t border-hairline pt-6'
    >
      <Text className='mb-1 text-sm text-subtle'>{plazaCase.category}</Text>
      <Heading
        level={HEADING.H2}
        id='plaza-case-title'
        className='text-[clamp(22px,2.4vw,32px)] leading-tight font-medium tracking-tight'
      >
        {plazaCase.title}
      </Heading>
      <Text className='mt-2 max-w-[64ch] text-body leading-relaxed text-subtle'>
        {plazaCase.summary}
      </Text>
      <Box as={TAG.DETAILS} className='mt-3'>
        <Text as={TAG.SUMMARY} className='min-h-11 cursor-pointer py-2 text-sm'>
          {plazaCase.evidence}
        </Text>
        <Box className='mt-2 grid gap-5 tab:grid-cols-2'>
          {Object.values(PLAZA_EXAMPLE).map((state) => (
            <Box key={state} as={TAG.FIGURE} className='m-0'>
              <AiPlazaExample state={state} />
              <Text
                as={TAG.FIGCAPTION}
                className='mt-2 text-sm leading-relaxed'
              >
                {state === PLAZA_EXAMPLE.OVERLAP
                  ? plazaCase.before
                  : plazaCase.after}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
