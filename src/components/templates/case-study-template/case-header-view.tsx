import { CaseMetaView } from './case-meta-view';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Text } from '@/components/atoms/text';
import { ProjectHeader } from '@/components/molecules/project-header';
import { cx } from '@/lib/cx';
import type { CaseHeaderViewProps } from '@/dto/case-template.dto';
import { TITLE_FS } from '@/constants/project-header';
import type { CaseTitleSize } from '@/constants/size';
import { HEADING, TAG } from '@/constants/tag';

const titleScale: Record<CaseTitleSize, string> = {
  xl: '[--fs-case-title:clamp(48px,16vw,64px)] tab:[--fs-case-title:clamp(96px,11vw,112px)] lap:[--fs-case-title:clamp(112px,9.7vw,140px)]',
  lg: '[--fs-case-title:clamp(48px,16vw,64px)] tab:[--fs-case-title:clamp(58px,7.8vw,96px)] lap:[--fs-case-title:clamp(96px,7.8vw,112px)]',
  md: '[--fs-case-title:clamp(40px,13vw,56px)] tab:[--fs-case-title:clamp(64px,7.4vw,80px)] lap:[--fs-case-title:clamp(80px,6.4vw,92px)]',
  sm: '[--fs-case-title:clamp(36px,11.5vw,48px)] tab:[--fs-case-title:clamp(56px,6.4vw,68px)] lap:[--fs-case-title:clamp(68px,5.56vw,80px)]',
};

export function CaseHeaderView({
  project,
  darkHeader,
  overviewExtra,
  titleSize,
  titleTone,
  showSummary,
  meta,
}: CaseHeaderViewProps) {
  return (
    <Box
      as={TAG.HEADER}
      className={cx(
        'container pt-12 tab:pt-30 lap:pt-40 short-land:pt-8 [&_h1]:whitespace-nowrap',
        titleScale[titleSize]
      )}
      data-title={titleSize}
    >
      <Box data-reveal-item='title'>
        <ProjectHeader
          project={project}
          fs={TITLE_FS.CASE}
          as={HEADING.H1}
          tone={titleTone}
        />
      </Box>
      <Box
        id='overview'
        className='mt-10 grid-page gap-y-3 border-t border-t-current pt-4 tab:mt-16 tab:gap-y-5 tab:pt-6 lap:mt-20 on-dark:border-t-dark-rule'
      >
        <Box className='col-[1/-1] flex flex-wrap items-center gap-x-2.5 gap-y-1.5 mono tab:col-[1/3] tab:flex-col tab:items-start tab:gap-2 tab:pt-1.5'>
          <Text as={TAG.SPAN}>01</Text>
          <Text as={TAG.SPAN} className='muted'>
            OVERVIEW
          </Text>
        </Box>
        <Column className='col-[1/-1] gap-3.5 tab:col-[3/-1] lap:col-[3/9]'>
          {showSummary ? (
            <Text className='text-lead leading-[1.55] tracking-[-0.006em]'>
              {project.summary}
            </Text>
          ) : null}
          {overviewExtra}
        </Column>
        <CaseMetaView meta={meta} darkHeader={darkHeader} />
      </Box>
    </Box>
  );
}
