import { Box } from '@/components/atoms/box';
import { TAG } from '@/constants/tag';

export function NotShipped() {
  return (
    <Box
      as={TAG.SPAN}
      className='inline-flex flex-none items-center border border-current px-2 py-1 font-mono text-(length:--fs-meta) leading-[1.3] tracking-[0.06em] whitespace-nowrap'
    >
      NOT SHIPPED
    </Box>
  );
}
