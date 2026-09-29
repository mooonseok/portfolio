import type { ReactNode } from 'react';
import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { StatusLabel } from '@/components/atoms/status-label';
import { Text } from '@/components/atoms/text';
import type { Project } from '@/dto/project.dto';
import {
  CATEGORY_PLACEMENT,
  type CategoryPlacement,
  type TitleFs,
} from '@/constants/project-header';
import { STATUS_KIND } from '@/constants/status';
import { HEADING, TAG, type HeadingLevel } from '@/constants/tag';
import { type AccentTone, TONE } from '@/constants/tone';

export function ProjectHeader({
  project,
  fs,
  as = HEADING.H3,
  tone = TONE.SIGNAL,
  titleNode,
  category = CATEGORY_PLACEMENT.BELOW,
  reveal = false,
}: {
  project: Project;
  fs: TitleFs;
  as?: HeadingLevel;
  tone?: AccentTone;
  titleNode?: ReactNode;
  category?: CategoryPlacement;
  reveal?: boolean;
}) {
  return (
    <Box className='grid-page gap-y-5'>
      <Box
        className='col-span-full flex flex-wrap items-center gap-x-4 gap-y-1.5 mono tab:col-[1/3] tab:flex-col tab:items-start tab:gap-x-2 tab:gap-y-2 tab:pt-2 lap:pt-3'
        data-reveal-item={reveal ? 'meta' : undefined}
      >
        <Text as={TAG.SPAN} data-signal-anchor={project.slug}>
          {project.num}
        </Text>
        <Text as={TAG.SPAN} className='nowrap muted'>
          {project.period}
        </Text>
        <Box
          as={TAG.SPAN}
          className='inline-flex flex-wrap gap-x-4 gap-y-1.5 tab:flex-col tab:gap-x-2 tab:gap-y-2'
        >
          {project.status.map((st) => (
            <StatusLabel
              key={st.label}
              kind={st.kind}
              label={st.label}
              tone={st.kind === STATUS_KIND.PRODUCT ? tone : TONE.INK}
              pulse={tone === TONE.SIGNAL}
            />
          ))}
        </Box>
      </Box>
      <Box
        className='group/title col-span-full flex flex-col gap-2.5 tab:col-[3/-1] tab:gap-4 tab:data-[category=inline]:flex-row tab:data-[category=inline]:flex-wrap tab:data-[category=inline]:items-end tab:data-[category=inline]:justify-between lap:gap-5'
        data-category={category}
      >
        <Heading
          level={as}
          className='leading-[var(--title-lh,0.98)] font-medium tracking-[var(--title-ls,-0.016em)] text-balance tab:leading-[var(--title-lh,0.96)] tab:tracking-[var(--title-ls,-0.02em)]'
          style={{ fontSize: `var(${fs})` }}
          data-reveal-item={reveal ? 'title' : undefined}
        >
          {titleNode ?? project.title}
        </Heading>
        <Text
          as={TAG.SPAN}
          className='mono tab:group-data-[category=inline]/title:pb-2.5 lap:group-data-[category=inline]/title:pb-3'
        >
          {project.category}
        </Text>
      </Box>
    </Box>
  );
}
