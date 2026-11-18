import type { RefCallback } from 'react';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Heading } from '@/components/atoms/heading';
import { SelectField } from '@/components/atoms/select-field';
import { Text } from '@/components/atoms/text';
import { AI_LOOP_TITLE_ID } from '@/constants/ai-practice';
import { HEADING, TAG } from '@/constants/tag';
import type { WorkflowRequest } from '@/dto/ai-workflow.dto';
import { AiCircuitCanvas } from './ai-circuit-canvas';
import { WorkflowTextView } from './ai-check-flow-static-view';
import styles from './ai-check-flow.module.css';

interface Props {
  lanes: WorkflowRequest[];
  request: WorkflowRequest;
  copy: {
    title: string;
    controls: string;
    request: string;
    result: string;
    pass: string;
  };
  result: number;
  active: number;
  returning: boolean;
  target?: number;
  note: string;
  playLabel: string;
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
  onRequest,
  onResult,
  onPlay,
  ...map
}: Props) {
  const choices = [
    ...request.issues.map((issue) => issue.label),
    copy.pass,
  ].map((label, index) => ({ label, value: String(index) }));
  return (
    <Box
      as={TAG.SECTION}
      id='work'
      aria-labelledby={AI_LOOP_TITLE_ID}
      className={styles.flow}
    >
      <Box className={styles.heading}>
        <Heading id={AI_LOOP_TITLE_ID} level={HEADING.H1}>
          {copy.title}
        </Heading>
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
      <AiCircuitCanvas lanes={lanes} lane={request.id} {...map} />
      <Box className={styles.controls}>
        <SelectField
          label={copy.result}
          choices={choices}
          value={result}
          onChange={(event) => onResult(Number(event.currentTarget.value))}
        />
        <Button className={styles.control} onClick={onPlay}>
          {playLabel}
        </Button>
      </Box>
      <Text className={styles.note} role='status' aria-live='polite'>
        {note}
      </Text>
      <noscript>
        <WorkflowTextView requests={lanes} />
      </noscript>
    </Box>
  );
}
