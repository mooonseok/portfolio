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
      className='mt-12 border-t border-hairline pt-7 tab:mt-16 tab:pt-9'
    >
      <Heading
        level={HEADING.H2}
        id='plaza-case-title'
        className='text-[clamp(22px,2.4vw,32px)] leading-tight font-medium tracking-tight'
      >
        {plazaCase.title}
      </Heading>
      <Box className='mt-5 grid items-start gap-6 lap:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lap:gap-10'>
        <Box className='max-w-[48em] space-y-3 text-body leading-relaxed text-subtle'>
          <Text>{plazaCase.finding}</Text>
          <Text>{plazaCase.response}</Text>
        </Box>
        <Box className='grid gap-5 tab:grid-cols-2'>
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
