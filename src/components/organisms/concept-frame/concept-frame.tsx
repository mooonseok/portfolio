import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import { MotionLayer } from './motion-layer';
import { Box } from '@/components/atoms/box';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import { ConceptArt } from '@/components/organisms/concept-art/concept-art';
import type { MetaPair, Pin, Visual } from '@/dto/visual.dto';
import { NODE_STATE } from '@/constants/flow';
import { MEDIA } from '@/constants/breakpoint';
import { PARALLAX_DEFAULT } from '@/constants/motion-layer';
import { TAG } from '@/constants/tag';
import { IMAGE_SIZES } from '@/constants/visual';
import { cx } from '@/lib/cx';

const isDev = process.env.NODE_ENV !== 'production';

const pinPosition = (p: Pin) =>
  ({
    '--x': `${p.x}%`,
    '--y': `${p.y}%`,
    '--x-t': `${(p.tablet ?? p).x}%`,
    '--y-t': `${(p.tablet ?? p).y}%`,
    '--x-m': `${(p.mobile ?? p.tablet ?? p).x}%`,
    '--y-m': `${(p.mobile ?? p.tablet ?? p).y}%`,
  }) as CSSProperties;

export function ConceptFrame({
  visual,
  className,
  ratio,
  radius,
  meta,
  metaDelay,
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
  meta?: MetaPair;
  metaDelay?: number;
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
    <Box as={TAG.PICTURE}>
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
          className='relative font-mono text-[12px] tracking-[0.06em] text-graphite'
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
  if (metaDelay) vars['--meta-delay'] = `${metaDelay}ms`;
  return (
    <Box
      as={TAG.FIGURE}
      className={cx('concept-figure', className)}
      style={Object.keys(vars).length ? (vars as CSSProperties) : undefined}
    >
      <Box className='concept-frame absolute inset-0 overflow-hidden rounded-[var(--radius,0)] bg-placeholder on-dark:bg-dark-2'>
        {range > 0 || shift ? (
          <MotionLayer parallax={range} pointer={shift}>
            {media}
          </MotionLayer>
        ) : (
          <Box className='absolute inset-0'>{media}</Box>
        )}
        {visual.pins?.map((p) => (
          <Box
            as={TAG.SPAN}
            key={p.label}
            className='group/pin pointer-events-none absolute top-(--y-m) left-(--x-m) flex items-center gap-2 tab:top-(--y-t) tab:left-(--x-t) lap:top-(--y) lap:left-(--x) mob:data-hide-mobile:hidden tab-only:data-hide-tablet:hidden'
            data-node={p.label}
            data-link={p.link}
            data-hide-mobile={p.hideOnMobile || undefined}
            data-hide-tablet={p.hideOnTablet || undefined}
            style={pinPosition(p)}
            aria-hidden='true'
          >
            <Box
              as={TAG.SPAN}
              className={cx(
                'size-[9px] rounded-[50%] border-[1.25px] border-ink bg-paper [transition:background-color_150ms_var(--ease),border-color_150ms_var(--ease)] on-dark:border-paper on-dark:bg-dark',
                p.state === NODE_STATE.EXPERIMENT
                  ? 'group-data-active/pin:border-ink group-data-active/pin:bg-ink on-dark:group-data-active/pin:border-paper on-dark:group-data-active/pin:bg-paper'
                  : 'group-data-active/pin:border-signal group-data-active/pin:bg-signal'
              )}
            />
            <Text
              as={TAG.SPAN}
              className='bg-paper px-2 py-1 font-mono text-(length:--fs-meta) tracking-[0.06em] whitespace-nowrap text-ink'
            >
              {p.label}
            </Text>
          </Box>
        ))}
        {children}
        {meta ? (
          <Box
            as={TAG.SPAN}
            className='concept-meta absolute inset-x-0 bottom-0 flex justify-between gap-4 bg-paper px-3 py-2.5 font-mono text-(length:--fs-meta) tracking-[0.06em] text-ink'
            aria-hidden='true'
          >
            <Text as={TAG.SPAN}>{meta[0]}</Text>
            <Text as={TAG.SPAN}>{meta[1]}</Text>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
