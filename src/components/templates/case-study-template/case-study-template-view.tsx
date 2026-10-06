import { CaseContents } from './case-contents';
import { CaseHeaderView } from './case-header-view';
import { CaseNextView } from './case-next-view';
import { Box } from '@/components/atoms/box';
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
  ...header
}: CaseStudyTemplateViewProps) {
  return (
    <>
      <Box className='relative'>
        <Box className={cx(header.darkHeader && 'surface-dark')}>
          <SiteHeader dark={header.darkHeader} back current={NAV_ID.WORK} />
        </Box>
        <Box as={TAG.MAIN} id='main-content' tabIndex={-1} className='relative'>
          <Box className={cx('pb-0', header.darkHeader && 'surface-dark')}>
            <ScrollScene>
              <CaseHeaderView {...header} />
              <Box className='container mt-8 pb-12 tab:mt-12 tab:pb-16'>
                {hero}
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
