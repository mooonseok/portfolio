import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import type { Layer } from '@/dto/layer.dto';
import { FLOOR_LABEL } from '@/constants/floor';
import { STATUS_KIND } from '@/constants/status';
import { TAG } from '@/constants/tag';
import { cx } from '@/lib/cx';

export function ProjectScopeListView({
  layers,
  label,
  experimentLabel,
}: {
  layers: Layer[];
  label: string;
  experimentLabel: string;
}) {
  return (
    <Box as={TAG.DL} aria-label={label} className='m-0 max-w-[56rem]'>
      {layers.map((layer) => (
        <Box
          key={layer.floor}
          className='grid grid-cols-[80px_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 border-t border-t-hairline py-4 first:border-t-0 first:pt-0 last:pb-0 tab:grid-cols-[104px_minmax(0,1fr)_144px] tab:gap-x-6 tab:py-5 on-dark:border-t-dark-line'
        >
          <Text
            as={TAG.DT}
            className='col-start-1 row-span-2 row-start-1 text-[14px] leading-[1.65] font-medium tab:row-span-1'
          >
            {FLOOR_LABEL[layer.floor]}
            {layer.kind === STATUS_KIND.EXPERIMENT ? (
              <Text
                as={TAG.SPAN}
                className='mt-1 block text-small font-normal text-subtle on-dark:text-dark-sub'
              >
                {experimentLabel}
              </Text>
            ) : null}
          </Text>
          <Text
            as={TAG.DD}
            className={cx(
              'col-start-2 row-start-1 m-0 text-body leading-[1.65]',
              !layer.tech && 'tab:col-start-2 tab:col-end-4'
            )}
          >
            {layer.summary}
          </Text>
          {layer.tech ? (
            <Text
              as={TAG.DD}
              className='col-start-2 row-start-2 m-0 text-[14px] leading-[1.65] text-subtle tab:col-start-3 tab:row-start-1 on-dark:text-dark-sub'
            >
              {layer.tech}
            </Text>
          ) : null}
        </Box>
      ))}
    </Box>
  );
}
