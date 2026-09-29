import { FeaturedMetaView } from './featured-meta-view';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Cta } from '@/components/atoms/cta';
import { Heading } from '@/components/atoms/heading';
import { NavLink } from '@/components/atoms/nav-link';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import { ScopeList } from '@/components/molecules/scope-list';
import { StateTokens } from '@/components/molecules/state-tokens';
import { ConceptFrame } from '@/components/organisms/concept-frame/concept-frame';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { EmosaveBlock } from '@/dto/featured-work.dto';
import { HEADING, TAG } from '@/constants/tag';

export function EmosaveBlockView({
  project: p,
  href,
  meta,
  states,
  hasStates,
}: EmosaveBlock) {
  return (
    <ScrollScene
      as={TAG.ARTICLE}
      className='col-span-full flex flex-col gap-5 border-t border-t-hairline pt-5 lap:col-[9/13] lap:mt-30 lap:gap-0 lap:pt-0 lap:[border-top:0] tab-only:grid tab-only:grid-cols-subgrid tab-only:grid-rows-[auto_auto_auto_1fr] tab-only:[align-items:start] tab-only:gap-x-(--gutter) tab-only:gap-y-[18px]'
    >
      <FeaturedMetaView
        project={p}
        className='flex flex-wrap items-center gap-x-4 gap-y-1.5 mono lap:flex-nowrap lap:justify-between lap:gap-3 tab-only:col-[1/3] tab-only:row-[1/-1] tab-only:flex-col tab-only:items-start tab-only:gap-2 tab-only:pt-2'
      />
      <Column className='gap-2.5 lap:mt-6 lap:gap-4 tab-only:col-[6/9] tab-only:row-[1] tab-only:gap-[18px]'>
        <Heading
          level={HEADING.H3}
          className='text-emo leading-[0.98] font-medium tracking-[-0.016em] text-balance'
          data-reveal-item='title'
        >
          {p.title}
        </Heading>
        <Text as={TAG.SPAN} className='mono'>
          {p.category}
        </Text>
      </Column>
      <NavLink
        href={href}
        className='block lap:mt-10 tab-only:col-[3/6] tab-only:row-[1/-1]'
        aria-label={`${p.title} project note`}
        data-reveal-item='visual'
      >
        <ConceptFrame
          visual={p.visuals.home}
          className='[--ratio:4/5]'
          radius={20}
          parallax={6}
          meta={meta}
        />
      </NavLink>
      {hasStates ? (
        <Box className='flex flex-col gap-4 lap:mt-7 tab-only:hidden'>
          <Text as={TAG.SPAN} className='hidden mono muted lap:block'>
            STATE
          </Text>
          <StateTokens states={states} hover />
        </Box>
      ) : null}
      <Text className='text-body leading-[1.65] lap:mt-8 tab-only:col-[6/9] tab-only:row-[2] tab-only:text-[16px]'>
        {p.summary}
      </Text>
      <ScopeList list={p.home.scope} className='!hidden lap:mt-8 lap:!flex' />
      <Row className='lap:mt-10 tab-only:col-[6/9] tab-only:row-[3]'>
        <Cta href={href} label={p.home.cta} />
      </Row>
    </ScrollScene>
  );
}
