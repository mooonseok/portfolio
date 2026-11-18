import type { WorkflowCircuitProps } from '@/components/atoms/workflow-circuit';
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

interface Props extends Omit<WorkflowCircuitProps, 'lane' | 'lanes'> {
  lanes: WorkflowRequest[];
  examples: WorkflowRequest[];
  request: WorkflowRequest;
  copy: {
    title: string;
    introduction: string;
    controls: string;
    request: string;
    result: string;
    pass: string;
    next: string;
    detailsTitle: string;
    escalation: string;
  };
  result: number;
  statusTitle?: string;
  statusOwner?: string;
  note: string;
  onRequest: (request: WorkflowRequest) => void;
  onResult: (result: number) => void;
  onNext?: () => void;
}

export function AiCheckFlowView({
  lanes,
  examples,
  request,
  copy,
  result,
  note,
  statusTitle,
  statusOwner,
  onRequest,
  onResult,
  onNext,
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
        <Text className={styles.introduction}>
          {request.example ?? copy.introduction}
        </Text>
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
        {request.exampleLabel && (
          <Box className={consoleStyles.examples}>
            <Text
              as={TAG.SPAN}
              id='workflow-example-label'
              className={consoleStyles.label}
            >
              요청 예시
            </Text>
            <Box
              role='group'
              aria-labelledby='workflow-example-label'
              className={consoleStyles.outcomes}
            >
              {examples.map((example) => (
                <Button
                  key={example.exampleLabel}
                  aria-pressed={example === request}
                  onClick={() => onRequest(example)}
                >
                  {example.exampleLabel}
                </Button>
              ))}
            </Box>
          </Box>
        )}
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
              key={label}
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
          aria-live={onNext ? 'polite' : 'off'}
          aria-atomic='true'
        >
          <Box className={consoleStyles.byline}>
            <Text as={TAG.SPAN} className={consoleStyles.stage}>
              {statusTitle ?? stage.label}
            </Text>
            <Text as={TAG.SPAN} className={consoleStyles.owner}>
              {statusOwner ?? stage.owner}
            </Text>
          </Box>
          <Text className={consoleStyles.description}>{note}</Text>
        </Box>
        {onNext && (
          <Button className={consoleStyles.next} onClick={onNext}>
            {copy.next}
          </Button>
        )}
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
