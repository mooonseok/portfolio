import { Box } from '@/components/atoms/box';
import { Cta } from '@/components/atoms/cta';
import { NavLink } from '@/components/atoms/nav-link';
import { Text } from '@/components/atoms/text';
import { ProjectHeader } from '@/components/molecules/project-header';
import { ScopeList } from '@/components/molecules/scope-list';
import { ConceptFrame } from '@/components/organisms/concept-frame/concept-frame';
import { DomainExplorer } from '@/components/organisms/domain-explorer/domain-explorer';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { ApcWorkBlock } from '@/dto/selected-work.dto';
import { BREAKPOINT } from '@/constants/breakpoint';
import { CATEGORY_PLACEMENT, TITLE_FS } from '@/constants/project-header';
import { TAG } from '@/constants/tag';
import { IMAGE_SIZES } from '@/constants/visual';

export function ApcBlockView({
  project: p,
  href,
  caseLabel,
  surfaces,
  domains,
  domainsLabelId,
  hasDomains,
}: ApcWorkBlock) {
  return (
    <ScrollScene
      as={TAG.SECTION}
      id={p.slug}
      steps={false}
      className='relative pt-24 surface-dark [--title-lh:0.96] tab:pt-30 lap:pt-40'
    >
      <Box className='container'>
        <ProjectHeader
          project={p}
          fs={TITLE_FS.APC}
          category={CATEGORY_PLACEMENT.INLINE}
          reveal
        />
      </Box>
      <Box className="pb-24 tab:relative tab:isolate tab:pb-40 tab:before:absolute tab:before:inset-x-0 tab:before:top-[calc(min(100vw,1440px)*9/32)] tab:before:bottom-0 tab:before:-z-1 tab:before:bg-dark-2 tab:before:content-[''] lap:pb-(--section) lap:before:top-[calc(min(100vw,1440px)*9/42)]">
        <NavLink
          href={href}
          className='mx-auto mt-7 mb-0 block max-w-[1440px] tab:mt-14 lap:mt-20'
          aria-label={caseLabel}
          data-reveal-item='visual'
        >
          <ConceptFrame
            visual={p.visuals.home}
            className='[--ratio:4_/_5] tab:[--ratio:16_/_9] lap:[--ratio:21_/_9] [&_.concept-caption]:mx-(--margin)'
            parallax={20}
            sizes={IMAGE_SIZES.FULL}
          />
        </NavLink>
        <Box className='container mt-7 grid-page gap-y-5 tab:mt-18 tab:gap-y-0 lap:mt-30 lap:grid-rows-[auto_1fr]'>
          <Box
            className='col-[1/-1] hidden mono lap:col-[1/3] lap:row-[1/3] lap:flex lap:flex-col lap:gap-2 lap:[align-self:start]'
            data-reveal-item='meta'
          >
            <Text as={TAG.SPAN} className='muted'>
              SURFACES
            </Text>
            <Text as={TAG.SPAN}>{surfaces}</Text>
          </Box>
          <Text className='col-[1/-1] text-body leading-[1.65] tab:col-[1/5] lap:col-[3/7] lap:row-1'>
            {p.summary}
          </Text>
          <Box className='col-[1/-1] hidden tab:col-[6/-1] tab:block lap:col-[8/13] lap:row-1 lap:flex lap:flex-col lap:gap-10 lap:[align-self:start]'>
            <ScopeList list={p.home.scope} labelFrom={BREAKPOINT.DESKTOP} />
            <Box className='hidden lap:block'>
              <Cta href={href} label={p.home.cta} />
            </Box>
          </Box>
          {hasDomains ? (
            <Box className='col-[1/-1] mt-6 grid-page gap-y-5 tab:mt-16 lap:mt-24'>
              <Text
                as={TAG.SPAN}
                id={domainsLabelId}
                className='col-[1/-1] mono text-dark-sub lap:col-[1/3] lap:pt-3.5'
              >
                FIELD WORK
              </Text>
              <Box className='col-[1/-1] lap:col-[3/13]'>
                <DomainExplorer {...domains} />
              </Box>
            </Box>
          ) : null}
          <Box className='col-[1/-1] mt-8 tab:mt-12 lap:hidden'>
            <Cta href={href} label={p.home.cta} />
          </Box>
        </Box>
      </Box>
    </ScrollScene>
  );
}
