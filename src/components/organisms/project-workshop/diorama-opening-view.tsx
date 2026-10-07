import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import { HEADING, TAG } from '@/constants/tag';
import type { DioramaOpeningProps } from '@/dto/diorama-opening.dto';
import styles from './diorama-opening.module.css';

export function DioramaOpeningView({
  active,
  onSkip,
  onReplay,
}: DioramaOpeningProps) {
  if (!active) {
    return (
      <Button data-opening-replay onClick={onReplay} className={styles.replay}>
        오프닝 다시 보기
      </Button>
    );
  }

  return (
    <Box
      role='dialog'
      aria-modal
      aria-label='박문석 프로젝트 작업실 오프닝'
      className={styles.overlay}
    >
      <Box className={styles.titleBlock}>
        <Heading level={HEADING.H2} className={styles.name}>
          <Text as={TAG.SPAN} className={styles.nameLine}>
            PARK
          </Text>
          <Text as={TAG.SPAN} className={styles.nameLine}>
            MOONSEOK
          </Text>
        </Heading>
        <Box aria-hidden className={styles.stroke} />
        <Text className={styles.caption}>프로젝트 작업실</Text>
      </Box>
      <Button
        ref={(node) => node?.focus({ preventScroll: true })}
        data-opening-skip
        onClick={onSkip}
        className={styles.skip}
      >
        건너뛰기
      </Button>
    </Box>
  );
}
