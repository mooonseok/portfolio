import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import type { Layer } from '@/dto/layer.dto';
import { FLOOR_LABEL } from '@/constants/floor';
import { STATUS_KIND } from '@/constants/status';
import { TAG } from '@/constants/tag';
import { List, ListItem } from '@/components/atoms/list';
import { Heading } from '@/components/atoms/heading';
import { HEADING } from '@/constants/tag';

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
    <Box
      as={TAG.SECTION}
      className='rounded-[22px] border border-hairline bg-dark-2 p-[clamp(20px,3vw,40px)]'
    >
      <Heading level={HEADING.H2} className='mb-5 text-2xl font-medium'>
        담당 업무
      </Heading>
      <Box as={TAG.DL} aria-label={label} className='m-0'>
        {layers.map((layer) => (
          <Box
            key={layer.floor}
            className='grid items-baseline gap-x-4 gap-y-2 border-t border-hairline py-4 last:pb-0 tab:grid-cols-[100px_1fr]'
          >
            <Text as={TAG.DT} className='font-medium text-signal'>
              {FLOOR_LABEL[layer.floor]}
              {layer.kind === STATUS_KIND.EXPERIMENT && (
                <Text as={TAG.SPAN} className='ml-2 text-small text-subtle'>
                  {experimentLabel}
                </Text>
              )}
            </Text>
            <Box as={TAG.DD} className='m-0'>
              <Text className='text-body font-medium'>{layer.summary}</Text>
              <List className='mt-2 grid list-none gap-1 p-0'>
                {layer.lines.map((line) => (
                  <ListItem
                    key={line}
                    className='text-base leading-relaxed text-subtle'
                  >
                    {line}
                  </ListItem>
                ))}
              </List>
              {layer.tech && (
                <Text className='mt-2 text-sm text-subtle'>{layer.tech}</Text>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
