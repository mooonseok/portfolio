import type { RefCallback } from 'react';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import { AI_LOOP_TITLE_ID } from '@/constants/ai-practice';
import { HEADING, TAG } from '@/constants/tag';
import type { WorkflowRequest } from '@/dto/ai-workflow.dto';
import { AiCircuitCanvas } from './ai-circuit-canvas';
import { WorkflowTextView } from './ai-check-flow-static-view';
import styles from './ai-check-flow.module.css';
import consoleStyles from './ai-review-console.module.css';

interface Props {
  lanes: WorkflowRequest[];
  request: WorkflowRequest;
  copy: {
    title: string;
    introduction: string;
    controls: string;
    request: string;
    result: string;
    pass: string;
    detailsTitle: string;
    escalation: string;
  };
  result: number;
  active: number;
  returning: boolean;
  source?: number;
  target?: number;
  note: string;
  playLabel: string;
  finished: boolean;
  pathRef: RefCallback<SVGPathElement>;
  dotRef: RefCallback<SVGGElement>;
  onRequest: (request: WorkflowRequest) => void;
  onResult: (result: number) => void;
  onPlay: () => void;
}

export function AiCheckFlowView({
  lanes,
  request,
  copy,
  result,
  note,
  playLabel,
  finished,
  onRequest,
  onResult,
  onPlay,
  ...map
}: Props) {
  const choices = [...request.issues.map((issue) => issue.label), copy.pass];
  const stage = request.stages[map.active];
  return (
    <Box
      as={TAG.SECTION}
      id='work'
      aria-labelledby={AI_LOOP_TITLE_ID}
      className={styles.flow}
      data-request={request.id}
    >
      <Box className={styles.heading}>
        <Heading id={AI_LOOP_TITLE_ID} level={HEADING.H1}>
          {copy.title}
        </Heading>
        <Text className={styles.introduction}>{copy.introduction}</Text>
        <Box className={styles.tabs} role='group' aria-label={copy.controls}>
          {lanes.map((item) => (
            <Button
              className={styles.tab}
              key={item.id}
              aria-pressed={item.id === request.id}
              onClick={() => onRequest(item)}
            >
              {item.label} {copy.request}
            </Button>
          ))}
        </Box>
      </Box>
      <Box className={consoleStyles.decisions}>
        <Text
          as={TAG.SPAN}
          id='review-outcome-label'
          className={consoleStyles.label}
        >
          {copy.result}
        </Text>
        <Box
          role='group'
          aria-labelledby='review-outcome-label'
          className={consoleStyles.outcomes}
        >
          {choices.map((label, index) => (
            <Button
              key={index}
              aria-pressed={index === result}
              onClick={() => onResult(index)}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Box>
      <Box className={styles.diagram}>
        <AiCircuitCanvas lanes={lanes} lane={request.id} {...map} />
      </Box>
      <Box className={consoleStyles.console}>
        <Box
          className={consoleStyles.note}
          role='status'
          aria-live='polite'
          aria-atomic='true'
        >
          <Box className={consoleStyles.byline}>
            <Text as={TAG.SPAN} className={consoleStyles.stage}>
              {stage.label}
            </Text>
            <Text as={TAG.SPAN} className={consoleStyles.owner}>
              {stage.owner}
            </Text>
          </Box>
          <Text className={consoleStyles.description}>{note}</Text>
        </Box>
        <Button
          className={consoleStyles.play}
          onClick={onPlay}
          data-finished={finished}
        >
          {playLabel}
        </Button>
      </Box>
      <WorkflowTextView
        requests={lanes}
        selected={request.id}
        title={copy.detailsTitle}
        escalation={copy.escalation}
      />
    </Box>
  );
}
