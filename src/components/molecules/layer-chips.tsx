import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import type { Layer } from '@/dto/layer.dto';
import { FLOORS, FLOOR_LABEL } from '@/constants/floor';
import { STATUS_KIND } from '@/constants/status';
import { TAG } from '@/constants/tag';

export function LayerChips({
  layers,
  label,
  className,
}: {
  layers: Layer[];
  label: string;
  className?: string;
}) {
  const lit = FLOORS.flatMap((floor) => {
    const layer = layers.find((l) => l.floor === floor);
    return layer ? [layer] : [];
  });
  if (!lit.length) return null;
  return (
    <List className={className ?? 'layer-chips'} aria-label={label}>
      {lit.map((l) => (
        <ListItem key={l.floor} className='layer-chip' data-kind={l.kind}>
          {FLOOR_LABEL[l.floor]}
          {l.tech ? (
            <Text as={TAG.SPAN} className='layer-chip-tech'>
              {l.tech}
            </Text>
          ) : null}
          {l.kind === STATUS_KIND.EXPERIMENT ? (
            <Text as={TAG.SPAN} className='sr-only'>
              {' (실험)'}
            </Text>
          ) : null}
        </ListItem>
      ))}
    </List>
  );
}
