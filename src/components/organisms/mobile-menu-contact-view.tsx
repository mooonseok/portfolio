import { Anchor } from '@/components/atoms/anchor';
import { Column } from '@/components/atoms/column';
import type { Contact } from '@/dto/site.dto';

export function MobileMenuContactView({ contact }: { contact: Contact }) {
  return (
    <Column className='border-t border-t-ink pt-2 short-land:col-[1] short-land:row-[1]'>
      {contact.email ? (
        <Anchor
          href={`mailto:${contact.email}`}
          className='flex min-h-11 items-center text-[17px] wrap-anywhere'
        >
          {contact.email}
        </Anchor>
      ) : null}
      {contact.github ? (
        <Anchor
          href={contact.github}
          className='flex min-h-11 items-center text-[17px] wrap-anywhere'
          target='_blank'
          rel='noreferrer'
        >
          GitHub 프로필 ↗
        </Anchor>
      ) : null}
    </Column>
  );
}
