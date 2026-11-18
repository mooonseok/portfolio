import { Anchor } from '@/components/atoms/anchor';
import { Box } from '@/components/atoms/box';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import type { PropsWithChildren } from 'react';
import type { SiteFooterViewProps } from '@/dto/chrome.dto';
import { TAG } from '@/constants/tag';

export function SiteFooterView({
  name,
  email,
  github,
  contact,
  children,
}: PropsWithChildren<SiteFooterViewProps>) {
  return (
    <Box
      as={TAG.FOOTER}
      id={contact ? 'contact' : undefined}
      className='site-colophon'
    >
      <Text as={TAG.SPAN}>{name}</Text>
      <Row className='flex-wrap items-center gap-x-5'>
        {email ? <Anchor href={`mailto:${email}`}>{email}</Anchor> : null}
        {github ? <Anchor href={github}>GitHub ↗</Anchor> : null}
        {children}
      </Row>
    </Box>
  );
}
