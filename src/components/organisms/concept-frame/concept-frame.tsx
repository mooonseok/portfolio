import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import { MotionLayer } from './motion-layer';
import { Box } from '@/components/atoms/box';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import { ConceptArt } from '@/components/organisms/concept-art/concept-art';
import type { Visual } from '@/dto/visual.dto';
import { MEDIA } from '@/constants/breakpoint';
import { PARALLAX_DEFAULT } from '@/constants/motion-layer';
import { TAG } from '@/constants/tag';
import { IMAGE_SIZES } from '@/constants/visual';
import { cx } from '@/lib/cx';

const isDev = process.env.NODE_ENV !== 'production';

export function ConceptFrame({
  visual,
  className,
  ratio,
  radius,
  parallax = PARALLAX_DEFAULT,
  pointer = true,
  fallback,
  sizes = visual.sizes ?? IMAGE_SIZES.HALF_DESKTOP,
  priority,
  motion = true,
  children,
}: {
  visual: Visual;
  className?: string;
  ratio?: string;
  radius?: number;
  parallax?: number;
  pointer?: boolean;
  fallback?: ReactNode;
  sizes?: string;
  priority?: boolean;
  motion?: boolean;
  children?: ReactNode;
}) {
  const range = motion ? parallax : 0;
  const shift = motion && pointer;
  const media = visual.src ? (
    <Box as={TAG.PICTURE} className='absolute inset-0'>
      {visual.srcMobile ? (
        <Box as={TAG.SOURCE} media={MEDIA.MOBILE} srcSet={visual.srcMobile} />
      ) : null}
      <Image
        src={visual.src}
        alt={visual.alt}
        fill
        sizes={sizes}
        priority={priority}
        className='object-cover'
        style={{
          objectPosition: visual.position,
          transform: visual.scale ? `scale(${visual.scale})` : undefined,
          transformOrigin: visual.origin,
        }}
      />
    </Box>
  ) : (
    <Row
      className='absolute inset-0 items-end p-4 [background:none]'
      role='img'
      aria-label={visual.alt}
    >
      {fallback ?? <ConceptArt id={visual.id} />}
      {isDev ? (
        <Text
          as={TAG.SPAN}
          className='relative font-mono text-[12px] tracking-[0.06em] text-subtle'
          data-dev-brief=''
        >
          {visual.brief}
        </Text>
      ) : null}
    </Row>
  );
  const vars: Record<string, string> = {};
  if (ratio) vars['--ratio'] = ratio;
  if (radius) vars['--radius'] = `${radius}px`;
  return (
    <Box
      as={TAG.FIGURE}
      className={cx('concept-figure', className)}
      style={Object.keys(vars).length ? (vars as CSSProperties) : undefined}
    >
      <Box className='concept-frame relative overflow-hidden rounded-[var(--radius,0)] bg-placeholder on-dark:bg-dark-2'>
        {range > 0 || shift ? (
          <MotionLayer parallax={range} pointer={shift}>
            {media}
          </MotionLayer>
        ) : (
          <Box className='absolute inset-0'>{media}</Box>
        )}
        {children}
      </Box>
      {visual.caption ? (
        <Box
          as={TAG.FIGCAPTION}
          className='concept-caption flex flex-col gap-1.5 border-t border-hairline py-3 text-subtle tab:flex-row tab:items-baseline tab:gap-4 on-dark:border-dark-rule on-dark:text-dark-sub'
        >
          <Text
            as={TAG.SPAN}
            className='shrink-0 font-mono text-[10px] tracking-[0.12em]'
          >
            CONCEPT IMAGE
          </Text>
          <Text as={TAG.SPAN} className='text-[12px] leading-relaxed'>
            {visual.caption}
          </Text>
        </Box>
      ) : null}
    </Box>
  );
}
