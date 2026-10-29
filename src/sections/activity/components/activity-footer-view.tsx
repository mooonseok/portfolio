import { Anchor } from '@/components/atoms/anchor';
import { Box } from '@/components/atoms/box';
import { TAG } from '@/constants/tag';

const linkClassName =
  'inline-flex min-h-11 items-center underline decoration-far underline-offset-6 fine:hover:decoration-moonlight';

export function ActivityFooterView({
  email,
  github,
  newTab,
}: {
  email: string;
  github: string;
  newTab: string;
}) {
  const label = github.replace('https://', '');
  return (
    <Box
      as={TAG.FOOTER}
      id='contact'
      className='flex flex-wrap gap-x-8 gap-y-2 bg-night-deep px-[max(20px,env(safe-area-inset-left))] pt-14 pb-[calc(56px_+_env(safe-area-inset-bottom))] text-moonlight shadow-[inset_0_1px_0_var(--color-night-line)] tab:px-10 lap:px-12 wide:px-16'
    >
      <Anchor
        href={github}
        target='_blank'
        rel='noreferrer'
        aria-label={`${label}, ${newTab}`}
        className={linkClassName}
      >
        {label}
      </Anchor>
      <Anchor href={`mailto:${email}`} className={linkClassName}>
        {email}
      </Anchor>
    </Box>
  );
}
