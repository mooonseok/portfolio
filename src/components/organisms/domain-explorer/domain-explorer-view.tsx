import { DomainDetailPanelView } from './domain-detail-panel-view';
import { DomainHomePanelsView } from './domain-home-panels-view';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { ChoiceDot } from '@/components/atoms/choice-dot';
import { Grid } from '@/components/atoms/grid';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import type { DomainExplorerViewProps } from '@/dto/domain.dto';
import { EXPLORER_MODE } from '@/constants/explorer';
import { TAG } from '@/constants/tag';

export function DomainExplorerView({
  label,
  items,
  mode,
  selected,
  onSelect,
  onKeyDown,
  tabRef,
}: DomainExplorerViewProps) {
  const detail = mode === EXPLORER_MODE.DETAIL;
  const d = items.find((x) => x.id === selected) ?? items[0];
  return (
    <Box>
      <Grid
        role='tablist'
        aria-label={label}
        className='grid-cols-3 border-t border-b border-t-paper border-b-dark-rule'
      >
        {items.map((x) => {
          const on = x.id === selected;
          return (
            <Button
              key={x.id}
              ref={tabRef(x.id)}
              id={x.tabId}
              role='tab'
              aria-selected={on}
              aria-controls={detail ? items[0].panelId : x.panelId}
              tabIndex={on ? 0 : -1}
              data-selected={on || undefined}
              onClick={() => onSelect(x.id)}
              onKeyDown={onKeyDown}
              className='press-feedback group/tab -mb-px flex min-h-14 cursor-pointer flex-col items-start gap-1.5 bg-transparent px-2.5 pt-3 pb-2.5 text-left text-dark-sub [box-shadow:inset_0_-2px_0_transparent] [border:0] [transition:background-color_150ms_var(--ease),box-shadow_150ms_var(--ease),color_150ms_var(--ease)] focus-visible:outline-offset-[-2px] data-selected:bg-dark-tint data-selected:text-paper data-selected:[box-shadow:inset_0_-2px_0_var(--paper)] tab:px-4 tab:pt-3.5 tab:pb-3 fine:hover:text-paper'
            >
              <Row as={TAG.SPAN} className='items-center gap-2 mono'>
                <ChoiceDot on={on} />
                <Text as={TAG.SPAN}>{x.code}</Text>
              </Row>
              <Text
                as={TAG.SPAN}
                className='text-[15px] leading-[1.3] decoration-1 underline-offset-[5px] group-data-selected/tab:font-medium tab:text-[19px] fine:group-hover/tab:underline'
              >
                {x.label}
              </Text>
            </Button>
          );
        })}
      </Grid>
      {detail ? (
        <DomainDetailPanelView items={items} current={d} />
      ) : (
        <DomainHomePanelsView items={items} selected={d.id} />
      )}
    </Box>
  );
}
