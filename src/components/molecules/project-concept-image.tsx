import Image from 'next/image';
import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { IMAGE_SIZES } from '@/constants/visual';
import { TAG } from '@/constants/tag';
import type { Visual } from '@/dto/visual.dto';

export function ProjectConceptImage({ visual }: { visual: Visual }) {
  if (!visual.src) return null;
  return (
    <Box as={TAG.FIGURE} className='m-0 min-w-0'>
      <Box className='relative h-[clamp(160px,22vw,330px)] overflow-hidden rounded-[15px] bg-tint'>
        <Image
          fill
          priority
          src={visual.src}
          alt={visual.alt}
          sizes={IMAGE_SIZES.HALF_DESKTOP}
          className='object-cover'
          style={{ objectPosition: visual.position }}
        />
      </Box>
      <Text as={TAG.FIGCAPTION} className='mt-2 text-[13px] text-subtle'>
        {visual.caption ?? '개념 재구성 이미지'}
      </Text>
    </Box>
  );
}
