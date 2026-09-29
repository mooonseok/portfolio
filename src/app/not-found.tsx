import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { NavLink } from '@/components/atoms/nav-link';
import { Text } from '@/components/atoms/text';
import { HEADING, TAG } from '@/constants/tag';

export default function NotFound() {
  return (
    <Box
      as={TAG.MAIN}
      className='container'
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      <Text as={TAG.SPAN} className='mono muted'>
        404
      </Text>
      <Heading
        level={HEADING.H1}
        style={{ fontSize: 'var(--fs-h2)', lineHeight: 1.05 }}
      >
        Not found
      </Heading>
      <NavLink
        href='/'
        className='mono'
        style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center' }}
      >
        ← PARK MOONSEOK
      </NavLink>
    </Box>
  );
}
