import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import { cx } from '@/lib/cx';
import type { ControlCondition } from '@/dto/experiment.dto';
import { HEADING, TAG } from '@/constants/tag';

export function ControlPanelView({
  panelId,
  current,
  className,
}: {
  panelId: string;
  current: ControlCondition;
  className?: string;
}) {
  return (
    <Column
      id={panelId}
      className={cx('gap-4 border-t border-t-ink pt-4', className)}
    >
      <Column
        key={current.id}
        className='gap-4 motion-safe:animate-[fade-in_150ms_var(--ease)]'
      >
        <Heading
          level={HEADING.H3}
          className='text-d3 leading-[1.25] font-medium tracking-[-0.012em]'
        >
          {current.label}
        </Heading>
        <Text as={TAG.SPAN} className='mono'>
          ▲ 설명 위치 · {current.location}
        </Text>
        {current.fields.map((f) => (
          <Column key={f.label} className='gap-1'>
            <Text as={TAG.SPAN} className='text-[14.5px] font-medium'>
              {f.label}
            </Text>
            {f.body.map((b) => (
              <Text key={b} className='text-body leading-[1.65]'>
                {b}
              </Text>
            ))}
          </Column>
        ))}
      </Column>
    </Column>
  );
}
