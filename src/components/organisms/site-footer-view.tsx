import { Anchor } from '@/components/atoms/anchor';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import type { SiteFooterViewProps } from '@/dto/chrome.dto';
import { TAG } from '@/constants/tag';

export function SiteFooterView({
  name,
  email,
  github,
  contact,
}: SiteFooterViewProps) {
  return (
    <Box
      as={TAG.FOOTER}
      className='pt-12 pb-[calc(24px_+_env(safe-area-inset-bottom))] surface-dark tab:pt-16 tab:pb-[calc(36px_+_env(safe-area-inset-bottom))] lap:pt-20 lap:pb-[calc(48px_+_env(safe-area-inset-bottom))]'
      id={contact ? 'contact' : undefined}
    >
      <Box className='container'>
        {contact ? (
          <Box className='mb-8 grid-page gap-y-4 tab:mb-10 lap:mb-12'>
            <Text
              as={TAG.SPAN}
              className='col-span-full mono tab:col-[1/3] tab:pt-2.5 lap:pt-3'
            >
              CONTACT
            </Text>
            <Column className='col-span-full gap-1 tab:col-[3/-1] tab:gap-2'>
              {email ? (
                <Anchor
                  href={`mailto:${email}`}
                  className='flex min-h-11 items-center self-start text-[20px] leading-normal font-medium wrap-anywhere tab:text-[24px]'
                >
                  {email}
                </Anchor>
              ) : null}
              {github ? (
                <Anchor
                  href={github}
                  className='inline-flex min-h-11 items-center self-start border-b border-b-current text-body hover:border-b-signal'
                  target='_blank'
                  rel='noreferrer'
                >
                  GitHub 프로필 ↗
                </Anchor>
              ) : null}
            </Column>
          </Box>
        ) : null}
        <Row className='items-center justify-between gap-4 border-t border-t-dark-line pt-3.5 mono lap:pt-4'>
          <Text as={TAG.SPAN} className='muted'>
            © 2026
            <Text as={TAG.SPAN} className='hidden tab:inline'>
              {' '}
              {name}
            </Text>
          </Text>
        </Row>
      </Box>
    </Box>
  );
}
