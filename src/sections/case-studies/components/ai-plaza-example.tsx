import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import type { PlazaExampleState } from '@/constants/ai-practice';
import { TAG } from '@/constants/tag';
import { plazaCase as copy } from '@/content/ai-plaza-case';
import styles from './ai-plaza-example.module.css';

export function AiPlazaExample({ state }: { state: PlazaExampleState }) {
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
