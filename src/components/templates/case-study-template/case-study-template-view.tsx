import { CaseContents } from './case-contents';
import { CaseHeaderView } from './case-header-view';
import { CaseNextView } from './case-next-view';
import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { ScrollScene } from '@/components/organisms/scroll-scene';
import { SiteFooter } from '@/components/organisms/site-footer';
import { SiteHeader } from '@/components/organisms/site-header';
import { cx } from '@/lib/cx';
import type { CaseStudyTemplateViewProps } from '@/dto/case-template.dto';
import { NAV_ID } from '@/constants/navigation';
import { TAG } from '@/constants/tag';

export function CaseStudyTemplateView({
  hero,
  children,
  groups,
  next,
  visualsNoteKo,
  ...header
}: CaseStudyTemplateViewProps) {
  return (
    <>
      <Box className='relative'>
        <Text
          as={TAG.SPAN}
          className='hidden tab:pointer-events-none tab:absolute tab:top-[300px] tab:bottom-[260px] tab:left-[max(var(--rail-x),calc((100%_-_1440px)_/_2_+_var(--rail-x)))] tab:z-2 tab:block tab:border-l tab:border-l-graphite'
          aria-hidden='true'
        />
        <Box className={cx(header.darkHeader && 'surface-dark')}>
          <SiteHeader dark={header.darkHeader} back current={NAV_ID.WORK} />
        </Box>
        <Box as={TAG.MAIN} id='main-content' tabIndex={-1} className='relative'>
          <Box className={cx('pb-0', header.darkHeader && 'surface-dark')}>
            <ScrollScene>
              <CaseHeaderView {...header} />
              <Box
                className='mt-8 tab:mt-12 lap:mt-14'
                data-reveal-item='visual'
              >
                {hero}
                <Text className='container mt-4 text-small text-subtle on-dark:text-dark-sub'>
                  {visualsNoteKo}
                </Text>
              </Box>
            </ScrollScene>
          </Box>
          <CaseContents groups={groups} />
          {children}
        </Box>
        <CaseNextView next={next} />
      </Box>
      <SiteFooter />
    </>
  );
}
