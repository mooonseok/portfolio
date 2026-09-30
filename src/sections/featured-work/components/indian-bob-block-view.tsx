import { FeaturedMetaView } from './featured-meta-view';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Cta } from '@/components/atoms/cta';
import { Heading } from '@/components/atoms/heading';
import { NavLink } from '@/components/atoms/nav-link';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import { ScopeList } from '@/components/molecules/scope-list';
import { SurfaceRelation } from '@/components/molecules/surface-relation';
import { ConceptFrame } from '@/components/organisms/concept-frame/concept-frame';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { IndianBobBlock } from '@/dto/featured-work.dto';
import { BREAKPOINT } from '@/constants/breakpoint';
import { HEADING, TAG } from '@/constants/tag';

export function IndianBobBlockView({
  project: p,
  href,
  meta,
  surfaces,
  relationLabel,
  rows,
  hasSurfaces,
  hasRelation,
}: IndianBobBlock) {
  return (
    <ScrollScene
      as={TAG.ARTICLE}
      steps={false}
      className='col-span-full flex flex-col gap-5 tab:grid tab:grid-cols-subgrid tab:[align-items:start] lap:col-[1/9]'
    >
      <FeaturedMetaView
        project={p}
        className='flex flex-wrap items-center gap-x-4 gap-y-1.5 mono tab:col-[1/3] tab:flex-col tab:items-start tab:gap-2 tab:pt-2'
      />
      <Column className='gap-5 tab:col-[3/-1] tab:gap-4 lap:col-[3/9] lap:gap-0'>
        <Column className='gap-2.5 tab:gap-4 lap:gap-[18px]'>
          <Heading
            level={HEADING.H3}
            className='text-ib leading-[0.98] font-medium tracking-[-0.016em] text-balance lap:tracking-[-0.018em]'
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
          className='block tab:mt-2 lap:mt-12'
          aria-label={`${p.title} case study`}
          data-reveal-item='visual'
        >
          <ConceptFrame
            visual={p.visuals.home}
            className='[--ratio:4/3]'
            parallax={6}
            meta={meta}
          />
        </NavLink>
        {hasSurfaces ? (
          <Box
            as={TAG.DL}
            className='hidden lap:mt-10 lap:mb-0 lap:grid lap:grid-cols-3 lap:gap-6'
          >
            {surfaces.map((x) => (
              <Box
                key={x.label}
                className='lap:flex lap:flex-col lap:gap-1.5 lap:border-t lap:border-t-ink lap:pt-3.5'
              >
                <Text as={TAG.DT} className='mono'>
                  {x.label}
                </Text>
                <Text
                  as={TAG.DD}
                  className='lap:m-0 lap:text-[15px] lap:leading-[1.5] lap:text-subtle'
                >
                  {x.sub}
                </Text>
              </Box>
            ))}
          </Box>
        ) : null}
        <Box className='flex flex-col gap-5 tab:mt-4 lap:mt-16 lap:grid lap:grid-cols-2 lap:gap-6'>
          {hasRelation ? (
            <SurfaceRelation label={relationLabel} rows={rows} />
          ) : null}
          <ScopeList
            list={p.home.scope}
            mobile={p.home.scopeMobile}
            labelFrom={BREAKPOINT.DESKTOP}
            className='tab:!hidden lap:!flex'
          />
        </Box>
        <Row className='tab:mt-4 lap:mt-14'>
          <Cta href={href} label={p.home.cta} />
        </Row>
      </Column>
    </ScrollScene>
  );
}
