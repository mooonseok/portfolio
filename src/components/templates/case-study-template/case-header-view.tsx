import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { StatusLabel } from '@/components/atoms/status-label';
import { Text } from '@/components/atoms/text';
import { ProjectConceptImage } from '@/components/molecules/project-concept-image';
import { NavLink } from '@/components/atoms/nav-link';
import { ROUTE } from '@/constants/navigation';
import type { CaseHeaderViewProps } from '@/dto/case-template.dto';
import { STATUS_KIND } from '@/constants/status';
import { HEADING, TAG } from '@/constants/tag';
import { TONE } from '@/constants/tone';

export function CaseHeaderView({
  header,
  titleTone,
  showSummary,
}: CaseHeaderViewProps) {
  return (
    <Box
      as={TAG.HEADER}
      id='overview'
      className='mx-auto w-[92%] max-w-[1220px] pt-10 tab:pt-16'
    >
      {header.visual && (
        <NavLink
          href={ROUTE.HISTORY}
          className='mb-5 inline-flex min-h-11 items-center text-signal hover:underline'
        >
          ← 프로젝트 이력
        </NavLink>
      )}
      <Box
        className={
          header.visual
            ? 'grid items-center gap-6 tab:grid-cols-2 tab:gap-[6vw]'
            : undefined
        }
      >
        <Column className='min-w-0'>
          {header.period || header.status?.length ? (
            <Box className='mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 mono'>
              {header.period ? (
                <Text as={TAG.SPAN} className='muted'>
                  {header.period}
                </Text>
              ) : null}
              {header.status?.map((st) => (
                <StatusLabel
                  key={st.label}
                  kind={st.kind}
                  label={st.label}
                  tone={st.kind === STATUS_KIND.PRODUCT ? titleTone : TONE.INK}
                />
              ))}
            </Box>
          ) : null}
          <Heading
            level={HEADING.H1}
            className='text-[clamp(44px,6vw,84px)] leading-[1.08] font-medium tracking-[-.05em] text-balance wrap-anywhere'
            data-reveal-item='title'
          >
            {header.title}
          </Heading>
          {showSummary ? (
            <Text className='mt-6 text-[18px] leading-[1.65] tab:text-[20px]'>
              {header.summary}
            </Text>
          ) : null}
        </Column>
        {header.visual && <ProjectConceptImage visual={header.visual} />}
      </Box>
    </Box>
  );
}
