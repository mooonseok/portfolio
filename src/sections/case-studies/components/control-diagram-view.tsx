import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import { cx } from '@/lib/cx';
import type { ControlExperiment, ControlNode } from '@/dto/experiment.dto';
import { CONTROL_ZONE, type ControlZone } from '@/constants/control';
import { TAG } from '@/constants/tag';

const zoneBox =
  'flex min-h-12 flex-1 flex-col justify-center gap-1 px-3 py-2 [border:1px_dashed_var(--graphite)] [transition:background-color_150ms_var(--ease)] data-on:border-ink data-on:[box-shadow:inset_0_0_0_0.5px_var(--ink)] data-on:bg-tint';

function End({ node }: { node: ControlNode }) {
  return (
    <Row className='flex-none flex-wrap items-baseline justify-between gap-x-3 border border-ink px-3 py-2.5'>
      <Text as={TAG.SPAN} className='mono'>
        {node.code}
      </Text>
      <Text as={TAG.SPAN} className='text-small text-subtle'>
        {node.sub}
      </Text>
    </Row>
  );
}

function Wire({ label }: { label?: string }) {
  return (
    <Row className='relative min-h-9 flex-none items-center'>
      <Box
        as={TAG.SPAN}
        className='absolute inset-y-0 left-6 border-l-ink [border-left:1px_dashed_var(--ink)]'
      />
      {label ? (
        <Text as={TAG.SPAN} className='relative ml-9 mono'>
          {label}
        </Text>
      ) : null}
    </Row>
  );
}

export function ControlDiagramView({
  c,
  zone,
  className,
}: {
  c: ControlExperiment;
  zone: ControlZone;
  className?: string;
}) {
  const whole = zone === CONTROL_ZONE.CONTROLLER;
  const mark = (z: ControlZone) => (
    <Text as={TAG.SPAN} className={cx('mono', z !== zone && 'invisible')}>
      ▲ 설명 위치
    </Text>
  );
  return (
    <Column as={TAG.FIGURE} className={cx('min-w-0 gap-4', className)}>
      <Box aria-hidden='true' className='flex flex-col'>
        <End node={c.command} />
        <Wire label={c.link.label} />
        <Column
          data-on={whole || undefined}
          className='min-w-0 flex-1 gap-2.5 border border-ink p-3 [transition:background-color_150ms_var(--ease)] data-on:bg-tint data-on:[box-shadow:inset_0_0_0_0.5px_var(--ink)]'
        >
          <Row className='flex-wrap items-baseline justify-between gap-x-3'>
            <Text as={TAG.SPAN} className='mono'>
              {c.controller.code}
            </Text>
            <Text as={TAG.SPAN} className='text-small text-subtle'>
              {c.controller.sub}
            </Text>
          </Row>
          <Box className='flex flex-col gap-2 tab:flex-row'>
            {[CONTROL_ZONE.RECEIVE, CONTROL_ZONE.ACTUATE].map((z) => (
              <Box
                key={z}
                className={zoneBox}
                data-on={z === zone || undefined}
              >
                <Text as={TAG.SPAN} className='text-small leading-[1.4]'>
                  {c.zones[z]}
                </Text>
                {mark(z)}
              </Box>
            ))}
          </Box>
          <Text as={TAG.SPAN} className={cx('mono', !whole && 'invisible')}>
            ▲ 설명 위치 · {c.zones[CONTROL_ZONE.CONTROLLER]}
          </Text>
        </Column>
        <Wire />
        <End node={c.equipment} />
      </Box>
      <Box
        as={TAG.FIGCAPTION}
        className='flex flex-col gap-1.5 text-small leading-[1.6]'
      >
        <Text as={TAG.SPAN} id={c.link.id}>
          <Text as={TAG.SPAN} className='mr-2 mono'>
            {c.link.label}
          </Text>
          {c.link.body}
        </Text>
        <Text as={TAG.SPAN} className='text-subtle'>
          {c.caption}
        </Text>
      </Box>
    </Column>
  );
}
