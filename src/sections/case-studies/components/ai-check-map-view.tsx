import { Anchor } from '@/components/atoms/anchor';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import { LIST_TAG, TAG } from '@/constants/tag';
import type { WorkflowIssue, WorkflowRequest } from '@/dto/ai-workflow.dto';
import graph from './ai-check-map.module.css';
import motion from './ai-check-map-motion.module.css';

interface Props {
  request: WorkflowRequest;
  active: number;
  issue?: WorkflowIssue;
  returning: boolean;
  travel: boolean;
  enhanced: boolean;
  onSelect: (node: number) => void;
}

export function WorkflowMapView({
  request,
  active,
  issue,
  returning,
  travel,
  enhanced,
  onSelect,
}: Props) {
  const edge = returning ? 'back' + active : 'forward' + active;
  return (
    <Box
      className={graph.graph}
      data-active={active}
      data-type={request.id}
      data-return={issue?.target}
      data-edge={edge}
    >
      <Box className={graph.branch} aria-hidden />
      {request.id === 'feature' && (
        <Box className={graph.fork} aria-hidden>
          <Text as={TAG.SPAN}>화면</Text>
          <Text as={TAG.SPAN}>데이터</Text>
        </Box>
      )}
      {issue && <Box className={graph.feedback} aria-hidden />}
      {travel && (
        <Box
          key={request.id + edge}
          className={motion.traveller}
          data-edge={edge}
          data-type={request.id}
          aria-hidden
        />
      )}
      <List
        as={LIST_TAG.OL}
        aria-label={request.label + ' 단계'}
        className={graph.stations}
      >
        {request.stages.map((stage, index) => (
          <ListItem className={graph.station} key={stage.label}>
            {enhanced ? (
              <Button
                className={graph.node}
                data-node={index}
                aria-controls='ai-current-stage'
                aria-pressed={active === index}
                onClick={() => onSelect(index)}
              >
                <Text as={TAG.SPAN} className={graph.serial}>
                  {String(index + 1).padStart(2, '0')}
                </Text>
                {stage.label}
              </Button>
            ) : (
              <Anchor
                className={graph.node}
                href={'#workflow-' + request.id + '-' + index}
              >
                {stage.label}
              </Anchor>
            )}
          </ListItem>
        ))}
      </List>
      <Box className={graph.key}>
        <Text as={TAG.SPAN} className={graph.solid}>
          진행
        </Text>
        {issue && (
          <Text as={TAG.SPAN} className={graph.dashed}>
            수정 후 재검토
          </Text>
        )}
      </Box>
    </Box>
  );
}
