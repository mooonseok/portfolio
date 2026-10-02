import { Anchor } from '@/components/atoms/anchor';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import type { ProjectLink } from '@/dto/project.dto';
import { TAG } from '@/constants/tag';

export function ProjectLinks({ links }: { links?: ProjectLink[] }) {
  if (!links?.length) return null;
  return (
    <Row className='flex-wrap gap-x-5 gap-y-2' aria-label='앱 등록 페이지'>
      {links.map((link) => (
        <Anchor
          key={link.href}
          href={link.href}
          target='_blank'
          rel='noreferrer'
          aria-label={`${link.label} (새 창)`}
          className='inline-flex min-h-11 items-center gap-2 border-b border-b-current text-[15px] hover:border-b-signal'
        >
          {link.label}
          <Text as={TAG.SPAN} aria-hidden='true'>
            ↗
          </Text>
        </Anchor>
      ))}
    </Row>
  );
}
