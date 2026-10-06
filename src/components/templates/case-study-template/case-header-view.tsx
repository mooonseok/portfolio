import { CaseMetaView } from './case-meta-view';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { StatusLabel } from '@/components/atoms/status-label';
import { Text } from '@/components/atoms/text';
import { ProjectLinks } from '@/components/molecules/project-links';
import type { CaseHeaderViewProps } from '@/dto/case-template.dto';
import { STATUS_KIND } from '@/constants/status';
import { HEADING, TAG } from '@/constants/tag';
import { TONE } from '@/constants/tone';

export function CaseHeaderView({
  project,
  darkHeader,
  titleTone,
  showSummary,
  meta,
}: CaseHeaderViewProps) {
  return (
    <Box
      as={TAG.HEADER}
      id='overview'
      className='container pt-12 tab:pt-16 lap:pt-20 short-land:pt-8'
    >
      <Column className='max-w-[40em]'>
        <Heading
          level={HEADING.H1}
          className='text-[36px] leading-[1.15] font-medium tracking-[-0.02em] text-balance wrap-anywhere tab:text-[48px] lap:text-[56px]'
          data-reveal-item='title'
        >
          {project.title}
        </Heading>
        <Box className='mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 mono'>
          <Text as={TAG.SPAN} className='muted'>
            {project.period}
          </Text>
          {project.status.map((st) => (
            <StatusLabel
              key={st.label}
              kind={st.kind}
              label={st.label}
              tone={st.kind === STATUS_KIND.PRODUCT ? titleTone : TONE.INK}
            />
          ))}
        </Box>
        {showSummary ? (
          <Text className='mt-6 text-[18px] leading-[1.65] tab:text-[20px]'>
            {project.summary}
          </Text>
        ) : null}
        {project.case.role.length ? (
          <Column className='mt-6 gap-3'>
            <Text as={TAG.SPAN} className='mono muted'>
              담당 역할
            </Text>
            {project.case.role.map((body) => (
              <Text key={body} className='text-body leading-[1.7]'>
                {body}
              </Text>
            ))}
          </Column>
        ) : null}
        {meta.length ? (
          <CaseMetaView meta={meta} darkHeader={darkHeader} />
        ) : null}
        {project.links?.length ? (
          <Box className='mt-4 tab:mt-6'>
            <ProjectLinks links={project.links} />
          </Box>
        ) : null}
      </Column>
    </Box>
  );
}
