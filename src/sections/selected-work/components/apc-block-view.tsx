import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Cta } from '@/components/atoms/cta';
import { NavLink } from '@/components/atoms/nav-link';
import { Text } from '@/components/atoms/text';
import { FlowDiagram } from '@/components/molecules/flow-diagram';
import { ProjectHeader } from '@/components/molecules/project-header';
import { ScopeList } from '@/components/molecules/scope-list';
import { ConceptFrame } from '@/components/organisms/concept-frame/concept-frame';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import type { ApcWorkBlock } from '@/dto/selected-work.dto';
import { BREAKPOINT } from '@/constants/breakpoint';
import { FLOW_ORIENT, FLOW_ROLE } from '@/constants/flow';
import { CATEGORY_PLACEMENT, TITLE_FS } from '@/constants/project-header';
import { TAG } from '@/constants/tag';
import { TONE } from '@/constants/tone';
import { IMAGE_SIZES } from '@/constants/visual';

export function ApcBlockView({
  project: p,
  href,
  caseLabel,
  surfaces,
  meta,
  material,
  secondary,
}: ApcWorkBlock) {
  return (
    <ScrollScene
      as={TAG.SECTION}
      id={p.slug}
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
            className='[--ratio:4_/_5] tab:[--ratio:16_/_9] lap:[--ratio:21_/_9]'
            meta={meta}
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
          <Text className='col-[1/-1] text-body leading-[1.65] tab:col-[1/5] lap:col-[3/6] lap:row-1'>
            {p.summary}
          </Text>
          <Box className='col-[1/-1] hidden tab:col-[6/-1] tab:block lap:col-[3/6] lap:row-2 lap:mt-10 lap:flex lap:flex-col lap:gap-10 lap:[align-self:start]'>
            <ScopeList list={p.home.scope} labelFrom={BREAKPOINT.DESKTOP} />
            <Box className='hidden lap:block'>
              <Cta href={href} label={p.home.cta} />
            </Box>
          </Box>
          <Box className='col-[1/-1] flex flex-col gap-5 tab:mt-16 tab:gap-12 lap:col-[7/13] lap:row-[1/3] lap:mt-0 lap:grid lap:grid-cols-3 lap:gap-6 lap:[align-self:start]'>
            <Column className='gap-[18px] border-t border-t-paper pt-[18px] [--flow-gap:26px] tab:gap-5 tab:pt-4 lap:gap-6 lap:pt-4 lap:[--flow-gap:28px]'>
              <Text as={TAG.SPAN} className='mono lap:text-graphite'>
                {material.label}
              </Text>
              <FlowDiagram
                nodes={material.nodes}
                orient={FLOW_ORIENT.TABLET}
                tone={TONE.DARK}
                label={material.label}
              />
            </Column>
            <Box className='flex flex-col gap-5 tab:grid tab:grid-cols-2 tab:gap-5 lap:contents'>
              {secondary.map((f) => (
                <Column
                  key={f.id}
                  className='gap-3 border-t border-t-dark-rule pt-4 lap:gap-6 lap:pt-4 lap:[--flow-gap:28px]'
                >
                  <Text as={TAG.SPAN} className='mono muted'>
                    {f.label}
                  </Text>
                  <FlowDiagram
                    nodes={f.nodes}
                    orient={FLOW_ORIENT.SEQUENCE_TABLET}
                    tone={TONE.DARK_MUTED}
                    role={FLOW_ROLE.SECONDARY}
                    label={f.label}
                  />
                </Column>
              ))}
            </Box>
          </Box>
          <Box className='col-[1/-1] tab:mt-12 lap:hidden'>
            <Cta href={href} label={p.home.cta} />
          </Box>
        </Box>
      </Box>
    </ScrollScene>
  );
}
