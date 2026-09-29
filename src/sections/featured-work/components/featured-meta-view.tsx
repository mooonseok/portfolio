import { StatusLabel } from '@/components/atoms/status-label';
import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import type { Project } from '@/dto/project.dto';
import { STATUS_KIND } from '@/constants/status';
import { TAG } from '@/constants/tag';
import { TONE } from '@/constants/tone';

export function FeaturedMetaView({
  project: p,
  className,
}: {
  project: Project;
  className: string;
}) {
  return (
    <Box className={className} data-reveal-item='meta'>
      <Text as={TAG.SPAN}>{p.num}</Text>
      <Text as={TAG.SPAN} className='nowrap muted'>
        {p.period}
      </Text>
      <StatusLabel
        kind={STATUS_KIND.PRODUCT}
        label={p.status[0].label}
        tone={TONE.INK}
      />
    </Box>
  );
}
