import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { TAG } from '@/constants/tag';
import { plazaExampleCopy as copy } from '@/content/ai-practice-checks';
import styles from './ai-plaza-example.module.css';

export function AiPlazaExample({ stageId }: { stageId: string }) {
  const state =
    stageId === 'check'
      ? 'overlap'
      : stageId === 'repair' || stageId === 'verify'
        ? 'fixed'
        : 'idle';

  return (
    <Box
      className={styles.scene}
      data-state={state}
      role='img'
      aria-label={copy[state]}
    >
      <Box className={styles.floor} aria-hidden />
      <Box className={styles.station} aria-hidden>
        <Box className={styles.model} />
        <Text as={TAG.SPAN} className={styles.label}>
          {copy.label}
        </Text>
      </Box>
      <Box className={styles.panel} aria-hidden>
        <Text as={TAG.SPAN}>{copy.panel}</Text>
        <Box className={styles.line} />
        <Box className={styles.line} />
      </Box>
    </Box>
  );
}
