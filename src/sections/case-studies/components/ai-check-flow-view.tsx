import type { WorkflowCircuitProps } from '@/components/atoms/workflow-circuit';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Text } from '@/components/atoms/text';
import { TAG } from '@/constants/tag';
import { AiCircuitCanvas } from './ai-circuit-canvas';
import { WorkflowTextView } from './ai-check-flow-static-view';
import styles from './ai-check-flow.module.css';
import consoleStyles from './ai-review-console.module.css';

interface Props extends WorkflowCircuitProps {
  copy: {
    introduction: string;
    result: string;
    pass: string;
    next: string;
    detailsTitle: string;
    escalation: string;
  };
  result: number;
  note: string;
  onResult: (result: number) => void;
  onNext?: () => void;
}

export function AiCheckFlowView({
  request,
  copy,
  result,
  note,
  onResult,
  onNext,
  ...map
}: Props) {
  const choices = [...request.issues.map((issue) => issue.label), copy.pass];
  const stage = request.stages[map.active];
  return (
    <Box className={styles.designFlow}>
      <Box className={consoleStyles.decisions}>
        <Text className={styles.introduction}>{copy.introduction}</Text>
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
        <AiCircuitCanvas request={request} {...map} />
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
              {stage.label}
            </Text>
            <Text as={TAG.SPAN} className={consoleStyles.owner}>
              {stage.owner}
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
        requests={[request]}
        selected={request.id}
        title={copy.detailsTitle}
        escalation={copy.escalation}
      />
    </Box>
  );
}
