import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Cta } from '@/components/atoms/cta';
import { Text } from '@/components/atoms/text';
import { ProjectLinks } from '@/components/molecules/project-links';
import { ProjectHeader } from '@/components/molecules/project-header';
import type { Project } from '@/dto/project.dto';
import { TITLE_FS } from '@/constants/project-header';
import { TAG } from '@/constants/tag';
import { TONE } from '@/constants/tone';

export function ProjectSummaryView({
  project: p,
  href,
}: {
  project: Project;
  href: string;
}) {
  return (
    <Column className='gap-8 [--fs-case-title:clamp(36px,9vw,64px)] tab:gap-12 tab:[--fs-case-title:clamp(56px,7.5vw,100px)] lap:gap-14'>
      <ProjectHeader project={p} fs={TITLE_FS.CASE} tone={TONE.INK} />
      <Box className='grid-page gap-y-8 tab:gap-y-10'>
        <Column className='col-span-full min-w-0 gap-7 tab:col-[3/-1] lap:col-[3/-1] lap:row-start-1 lap:gap-9'>
          <Text className='max-w-[36em] text-body leading-[1.7]'>
            {p.summary}
          </Text>
          <Box
            as={TAG.DL}
            className='work-sheet grid grid-cols-1 gap-x-10 gap-y-7 lap:grid-cols-2'
          >
            {p.home.features.map((feature) => (
              <Column key={feature.title} className='gap-1.5'>
                <Text as={TAG.DT} className='text-[17px] font-medium'>
                  {feature.title}
                </Text>
                <Text
                  as={TAG.DD}
                  className='m-0 text-[15px] leading-[1.7] text-subtle'
                >
                  {feature.body.join(' ')}
                </Text>
              </Column>
            ))}
          </Box>
        </Column>

        <Column className='col-span-full items-start gap-3 tab:col-[3/-1] lap:col-[3/7] lap:row-start-2'>
          <Cta href={href} label='프로젝트 자세히 보기' />
          <ProjectLinks links={p.links} />
        </Column>
      </Box>
    </Column>
  );
}
