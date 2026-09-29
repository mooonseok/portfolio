import { Box } from '@/components/atoms/box';
import type { StatusKind } from '@/constants/status';
import { TAG } from '@/constants/tag';
import { TONE, type AccentTone } from '@/constants/tone';

export function StatusLabel({
  kind,
  label,
  tone = TONE.SIGNAL,
  pulse = false,
}: {
  kind: StatusKind;
  label: string;
  tone?: AccentTone;
  pulse?: boolean;
}) {
  return (
    <Box
      as={TAG.SPAN}
      className='status-label inline-flex items-center gap-2 font-mono text-(length:--fs-meta) leading-[1.5] tracking-[0.06em] whitespace-nowrap'
      data-kind={kind}
      data-tone={tone}
    >
      <Box
        as={TAG.SPAN}
        className='status-mark'
        aria-hidden='true'
        data-pulse={pulse || undefined}
      />
      <Box as={TAG.SPAN}>{label}</Box>
    </Box>
  );
}
