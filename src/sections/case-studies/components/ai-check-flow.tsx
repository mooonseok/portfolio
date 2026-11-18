'use client';

import { useState } from 'react';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Heading } from '@/components/atoms/heading';
import { AI_LOOP_TITLE_ID } from '@/constants/ai-practice';
import { HEADING, TAG } from '@/constants/tag';
import type { RoutingLane } from '@/dto/request-routing.dto';
import { AiRequestRouting } from './ai-request-routing';
import styles from './ai-check-flow.module.css';

export function AiCheckLoop() {
  const [lane, setLane] = useState<RoutingLane>('development');
  return (
    <Box
      as={TAG.SECTION}
      id='work'
      aria-labelledby={AI_LOOP_TITLE_ID}
      className={styles.flow}
    >
      <Box className={styles.heading}>
        <Heading id={AI_LOOP_TITLE_ID} level={HEADING.H1}>
          AI와 일하는 방식
        </Heading>
        <Box className={styles.tabs} role='group' aria-label='요청 유형'>
          <Button
            className={styles.tab}
            aria-pressed={lane === 'development'}
            onClick={() => setLane('development')}
          >
            개발 요청
          </Button>
          <Button
            className={styles.tab}
            aria-pressed={lane === 'design'}
            onClick={() => setLane('design')}
          >
            디자인 요청
          </Button>
        </Box>
      </Box>
      <AiRequestRouting key={lane} lane={lane} />
    </Box>
  );
}
