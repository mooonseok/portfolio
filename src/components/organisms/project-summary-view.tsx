import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Cta } from '@/components/atoms/cta';
import { NavLink } from '@/components/atoms/nav-link';
import { Text } from '@/components/atoms/text';
import { ProjectHeader } from '@/components/molecules/project-header';
import { ConceptFrame } from '@/components/organisms/concept-frame/concept-frame';
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
        <Column className='col-span-full min-w-0 gap-7 tab:col-[3/-1] lap:col-[3/7] lap:row-start-1 lap:gap-9'>
          <Text className='max-w-[36em] text-body leading-[1.7]'>
            {p.summary}
          </Text>
          <Box
            as={TAG.DL}
            className='flex flex-col gap-5 border-t border-t-current pt-5'
          >
            {p.home.features.map((feature) => (
              <Column key={feature.title} className='gap-1.5'>
                <Text as={TAG.DT} className='text-[17px] font-medium'>
                  {feature.title}
                </Text>
                <Text
                  as={TAG.DD}
                  className='m-0 text-[15px] leading-[1.7] text-subtle on-dark:text-dark-sub'
                >
                  {feature.body.join(' ')}
                </Text>
              </Column>
            ))}
          </Box>
        </Column>
        <NavLink
          href={href}
          aria-label={`${p.title} 상세 보기`}
          className='col-span-full min-w-0 tab:col-[3/-1] lap:col-[8/13] lap:row-start-1'
        >
          <ConceptFrame
            visual={p.visuals.home}
            className='[--ratio:4/3]'
            parallax={0}
          />
        </NavLink>
        <Box className='col-span-full tab:col-[3/-1] lap:col-[3/7] lap:row-start-2'>
          <Cta href={href} label='프로젝트 자세히 보기' />
        </Box>
      </Box>
    </Column>
  );
}
