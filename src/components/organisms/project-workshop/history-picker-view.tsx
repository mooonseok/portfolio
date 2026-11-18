import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Heading } from '@/components/atoms/heading';
import { NavLink } from '@/components/atoms/nav-link';
import { Text } from '@/components/atoms/text';
import { ProjectConceptImage } from '@/components/molecules/project-concept-image';
import { DIORAMA } from '@/constants/diorama';
import { HEADING, TAG } from '@/constants/tag';
import type { Project } from '@/dto/project.dto';
import type { Visual } from '@/dto/visual.dto';

export type HistoryEntry = Pick<
  Project,
  'slug' | 'title' | 'period' | 'surfaces' | 'summary'
> & { visual: Visual };

const labelClass =
  'min-h-12 border-b border-hairline px-2 py-3 text-left text-base text-subtle aria-pressed:border-signal aria-pressed:font-semibold aria-pressed:text-signal tab:text-xl';

export function HistoryPickerView({
  entries,
  project,
  onSelect,
}: {
  entries: HistoryEntry[];
  project: HistoryEntry;
  onSelect?: (slug: Project['slug']) => void;
}) {
  return (
    <Box className='grid items-start gap-6 tab:grid-cols-[minmax(160px,.42fr)_minmax(0,1fr)] tab:gap-[4vw]'>
      <Box
        role='group'
        aria-label='프로젝트 선택'
        className='grid grid-cols-2 tab:grid-cols-1'
      >
        {entries.map((item) => {
          const labelId = DIORAMA.LABEL_ID + '-' + item.slug;
          if (!onSelect)
            return (
              <NavLink
                key={item.slug}
                id={labelId}
                href={'/work/' + item.slug}
                className={labelClass}
              >
                {item.title}
              </NavLink>
            );
          return (
            <Button
              key={item.slug}
              id={labelId}
              aria-pressed={project.slug === item.slug}
              aria-controls={DIORAMA.PANEL_ID}
              onClick={() => onSelect(item.slug)}
              className={labelClass}
            >
              {item.title}
            </Button>
          );
        })}
      </Box>
      <Box
        as={TAG.ARTICLE}
        id={DIORAMA.PANEL_ID}
        aria-labelledby='selected-project-title'
        className='min-w-0 rounded-[22px] border border-hairline bg-dark-2 p-[clamp(20px,3vw,40px)]'
      >
        <ProjectConceptImage visual={project.visual} />
        <Heading
          level={HEADING.H2}
          id='selected-project-title'
          className='mt-5 text-[32px] leading-tight font-medium'
        >
          {project.title}
        </Heading>
        <Text className='mt-3 text-body leading-relaxed text-subtle'>
          {project.summary}
        </Text>
        <Text className='mt-3 text-sm text-subtle'>
          {project.period} · {project.surfaces}
        </Text>
        <NavLink
          href={'/work/' + project.slug}
          className='mt-5 inline-flex min-h-11 items-center rounded-full bg-action px-5 text-ink'
        >
          담당 업무 보기
        </NavLink>
      </Box>
    </Box>
  );
}
