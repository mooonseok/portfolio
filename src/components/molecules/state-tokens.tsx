import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import { FLOW_ROLE } from '@/constants/flow';
import { SIZE, type TokenSize } from '@/constants/size';
import { LIST_TAG, TAG } from '@/constants/tag';
import { cx } from '@/lib/cx';

export function StateTokens({
  states,
  size = SIZE.MD,
  hover = false,
  className,
}: {
  states: string[];
  size?: TokenSize;
  hover?: boolean;
  className?: string;
}) {
  return (
    <Row
      as={LIST_TAG.OL}
      className={cx(
        'state-tokens items-start mono [--shape:28px] data-[size=lg]:[--shape:40px]',
        className
      )}
      data-size={size}
      data-hover={hover || undefined}
      data-flow={FLOW_ROLE.PRIMARY}
      aria-label={states.join(' → ')}
    >
      {states.map((st, i) => (
        <Row
          as={TAG.LI}
          key={st}
          className='items-start not-first:flex-1'
          data-step={i}
          data-node={st}
          data-default={i === 1 || undefined}
        >
          {i > 0 ? (
            <Box
              as={TAG.SPAN}
              className='mx-2.5 mt-[calc(var(--shape)/2)] mb-0 min-w-4 flex-1 border-t-[1.25px] border-t-ink'
              aria-hidden='true'
            />
          ) : null}
          <Column
            as={TAG.SPAN}
            className='group/token flex-none items-center gap-2.5'
            data-kind={i}
          >
            <Row
              as={TAG.SPAN}
              className='size-(--shape) flex-none items-center justify-center rounded-[50%] border-[1.25px] border-ink group-data-[kind=1]/token:rounded-[calc(var(--shape)*0.32)] group-data-[kind=2]/token:w-[calc(var(--shape)*1.6)] group-data-[kind=2]/token:rounded-[calc(var(--shape)/2)] group-data-[kind=2]/token:bg-ink group-data-[kind=2]/token:[border:0]'
              aria-hidden='true'
            >
              <Box
                as={TAG.SPAN}
                className='state-dot size-[7px] rounded-[50%] bg-signal [transition:opacity_150ms_var(--ease)]'
              />
            </Row>
            <Text as={TAG.SPAN}>{st}</Text>
          </Column>
        </Row>
      ))}
    </Row>
  );
}
