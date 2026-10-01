import { WorkAreas } from './work-areas';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Cta } from '@/components/atoms/cta';
import { NavLink } from '@/components/atoms/nav-link';
import { Text } from '@/components/atoms/text';
import { ProjectHeader } from '@/components/molecules/project-header';
import { ScopeList } from '@/components/molecules/scope-list';
import { ConceptFrame } from '@/components/organisms/concept-frame/concept-frame';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { FarmFamWorkBlock } from '@/dto/selected-work.dto';
import { BREAKPOINT } from '@/constants/breakpoint';
import { TITLE_FS } from '@/constants/project-header';
import { TAG } from '@/constants/tag';

export function FarmFamBlockView({
  project: p,
  href,
  caseLabel,
  surfaces,
  areas,
  hasAreas,
}: FarmFamWorkBlock) {
  return (
    <ScrollScene
      as={TAG.SECTION}
      id={p.slug}
      steps={false}
      className='container pt-12 [--title-lh:0.98] [--title-ls:-0.016em] tab:pb-40 lap:pt-20 lap:pb-(--section)'
    >
      <ProjectHeader project={p} fs={TITLE_FS.FARM} reveal />
      <Box className='mt-7 grid-page gap-y-7 tab:mt-12 tab:[align-items:end] lap:mt-16'>
        <Box
          className='hidden mono lap:col-[1/3] lap:flex lap:flex-col lap:gap-2 lap:[align-self:end]'
          data-reveal-item='meta'
        >
          <Text as={TAG.SPAN} className='muted'>
            SURFACES
          </Text>
          <Text as={TAG.SPAN}>{surfaces}</Text>
        </Box>
        <NavLink
          href={href}
          className='col-[1/-1] -mx-(--margin) block tab:col-[1/6] tab:mx-0 lap:col-[3/9]'
          aria-label={caseLabel}
          data-reveal-item='visual'
        >
          <ConceptFrame
            visual={p.visuals.home}
            className='[--ratio:4_/_5] mob:[&_.concept-caption]:mx-(--margin)'
            parallax={10}
          />
        </NavLink>
        <Column className='col-[1/-1] gap-5 tab:col-[6/-1] tab:gap-7 lap:col-[10/13] lap:gap-10'>
          <Text className='text-body leading-[1.65]'>{p.summary}</Text>
          <ScopeList
            list={p.home.scope}
            mobile={p.home.scopeMobile}
            labelFrom={BREAKPOINT.DESKTOP}
          />
          <Box className='hidden tab:block'>
            <Cta href={href} label={p.home.cta} />
          </Box>
        </Column>
      </Box>
      {hasAreas ? (
        <Box className='mt-5 grid-page gap-y-5 border-t border-t-hairline pt-[18px] tab:mt-20 tab:gap-y-7 tab:pt-5 lap:mt-30 lap:pt-6'>
          <Text
            as={TAG.SPAN}
            id={areas.labelId}
            className='col-[1/-1] mono muted lap:col-[1/3]'
          >
            WORK AREAS
          </Text>
          <Box className='col-[1/-1] lap:col-[3/13]'>
            <WorkAreas {...areas} />
          </Box>
        </Box>
      ) : null}
      <Box className='mt-5 tab:hidden'>
        <Cta href={href} label={p.home.cta} />
      </Box>
    </ScrollScene>
  );
}
