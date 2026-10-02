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
      className='pt-(--section) pb-[calc(24px_+_env(safe-area-inset-bottom))] surface-dark tab:pb-[calc(36px_+_env(safe-area-inset-bottom))] lap:pb-[calc(48px_+_env(safe-area-inset-bottom))]'
      id={contact ? 'contact' : undefined}
    >
      <Box className='container'>
        {contact ? (
          <Box className='mb-16 grid-page gap-y-4 tab:mb-20 lap:mb-24'>
            <Text
              as={TAG.SPAN}
              className='col-span-full mono tab:col-[1/3] tab:pt-2.5 lap:pt-3'
            >
              CONTACT
            </Text>
            <Column className='col-span-full gap-4 tab:col-[3/-1] tab:gap-6 lap:gap-8'>
              {email ? (
                <Anchor
                  href={`mailto:${email}`}
                  className='flex min-h-11 items-center text-[length:clamp(24px,7vw,32px)] leading-[1.15] font-medium tracking-[-0.01em] wrap-anywhere tab:block tab:text-[length:clamp(36px,5.8vw,56px)] tab:leading-none tab:tracking-[-0.016em] lap:text-[64px] lap:tracking-[-0.018em]'
                >
                  {email}
                </Anchor>
              ) : null}
              {github ? (
                <Anchor
                  href={github}
                  className='inline-flex min-h-11 items-center self-start border-b border-b-current text-[20px] hover:border-b-signal tab:text-[22px] lap:pb-1 lap:text-[28px] lap:tracking-[-0.01em]'
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
          <Text as={TAG.SPAN} className='inline-flex items-center gap-2 muted'>
            <Text
              as={TAG.SPAN}
              className='h-[7px] w-[7px] rounded-[50%] bg-signal'
              aria-hidden='true'
              data-signal-end=''
            />
            200 OK
          </Text>
        </Row>
      </Box>
    </Box>
  );
}
