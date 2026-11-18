import { CaseDetailsView } from './case-details-view';
import { CaseContents } from './case-contents';
import { CaseHeaderView } from './case-header-view';
import { CaseNextView } from './case-next-view';
import { Box } from '@/components/atoms/box';
import { SiteFooter } from '@/components/organisms/site-footer';
import { SiteHeader } from '@/components/organisms/site-header';
import { cx } from '@/lib/cx';
import type {
  CaseNav,
  CaseStudyTemplateViewProps,
} from '@/dto/case-template.dto';
import { NAV_ID } from '@/constants/navigation';
import { TAG } from '@/constants/tag';

const PROJECT_NAV: CaseNav = { back: true, current: NAV_ID.WORK };

export function CaseStudyTemplateView({
  intro,
  hero,
  children,
  groups,
  next,
  nav = PROJECT_NAV,
  ...header
}: CaseStudyTemplateViewProps) {
  return (
    <>
      <Box className='relative'>
        <Box className={cx(header.darkHeader && 'surface-dark')}>
          <SiteHeader
            dark={header.darkHeader}
            back={nav.back}
            current={nav.current}
          />
        </Box>
        <Box as={TAG.MAIN} id='main-content' tabIndex={-1} className='relative'>
          <Box className={cx('pb-0', header.darkHeader && 'surface-dark')}>
            {intro ?? <CaseHeaderView {...header} />}
            <Box className='mx-auto mt-8 w-[92%] max-w-[1220px] pb-10 tab:mt-12'>
              {hero}
              <CaseDetailsView {...header} />
            </Box>
          </Box>
          {groups?.length ? <CaseContents groups={groups} /> : null}
          {children}
        </Box>
        <CaseNextView next={next} />
      </Box>
      <SiteFooter />
    </>
  );
}
