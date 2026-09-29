import { StatusLabel } from '@/components/atoms/status-label';
import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import type { Project } from '@/dto/project.dto';
import { TAG } from '@/constants/tag';
import { TONE } from '@/constants/tone';

export function FeaturedMetaView({
  project: p,
  className,
}: {
  project: Project;
  className: string;
}) {
  const status = p.status[0];
  return (
    <Box className={className} data-reveal-item='meta'>
      <Text as={TAG.SPAN} data-signal-anchor={p.slug}>
        {p.num}
      </Text>
      <Text as={TAG.SPAN} className='nowrap muted'>
        {p.period}
      </Text>
      {status ? (
        <StatusLabel kind={status.kind} label={status.label} tone={TONE.INK} />
      ) : null}
    </Box>
  );
}
