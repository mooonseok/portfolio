import { Anchor } from '@/components/atoms/anchor';
import { Box } from '@/components/atoms/box';
import { JumpLink } from '@/components/atoms/jump-link';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import type { HeroViewProps } from '@/dto/hero.dto';
import { HEADING, TAG } from '@/constants/tag';

export function HeroView({
  name,
  primaryAction,
  role,
  disciplines,
  range,
  headline,
  introduction,
  github,
  board,
}: HeroViewProps) {
  return (
    <Box
      as={TAG.SECTION}
      className='container grid-page gap-y-12 pt-10 pb-16 tab:pt-14 lap:pt-12 lap:pb-24 wide:gap-y-0 short-land:pt-6'
      aria-label='Intro'
    >
      <Box className='hero-intro col-span-full wide:col-[1/5] wide:pt-4 wide:pr-4'>
        <Box className='hero-identity'>
          <Heading level={HEADING.H1} className='hero-name'>
            {name}
          </Heading>
          <Text className='mono text-subtle'>
            {role}
            <Text as={TAG.SPAN} aria-hidden='true'>
              {' · '}
            </Text>
            <Text as={TAG.SPAN} className='nowrap'>
              {disciplines}
            </Text>
          </Text>
        </Box>
        <Box className='hero-description'>
          <Text className='hero-headline'>{headline}</Text>
          {introduction ? (
            <Text className='hero-lead'>{introduction}</Text>
          ) : null}
          <Box className='flex flex-wrap items-center gap-x-6 gap-y-2'>
            <JumpLink href={primaryAction.href} label={primaryAction.label} />
            <Anchor
              href={github}
              target='_blank'
              rel='noreferrer'
              className='inline-flex min-h-11 items-center text-[16px] underline underline-offset-4'
            >
              GitHub ↗
            </Anchor>
          </Box>
        </Box>
        <Text className='hero-range border-t border-t-ink pt-3 mono text-subtle'>
          {range.label}{' '}
          <Text as={TAG.SPAN} className='nowrap text-ink'>
            {range.years}
          </Text>
        </Text>
      </Box>
      <Box className='col-span-full wide:col-[5/13] wide:pl-2'>{board}</Box>
    </Box>
  );
}
