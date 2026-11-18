'use client';

import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Heading } from '@/components/atoms/heading';
import { RequestRoutingBoard } from '@/components/atoms/request-routing-board';
import { Text } from '@/components/atoms/text';
import { HEADING, TAG } from '@/constants/tag';
import { routingCaption, routingRequests } from '@/content/request-routing';
import { useRequestRouting } from '@/hooks/use-request-routing';
import { useRequestRoutingBoard } from '@/hooks/use-request-routing-board';
import styles from './ai-request-routing.module.css';

export function AiRequestRouting() {
  const { request, phase, reduced, paintRef, nextRequest } =
    useRequestRouting(routingRequests);
  const board = useRequestRoutingBoard(request, reduced, paintRef);
  return (
    <Box className={styles.panel} data-phase={phase} data-example={request.id}>
      <Box as={TAG.HEADER} className={styles.header}>
        <Box className={styles.line}>
          <Text as={TAG.SPAN}>들어온 요청</Text>
          <Button className={styles.next} onClick={nextRequest}>
            다음 요청{' '}
            <Text as={TAG.SPAN} aria-hidden='true'>
              →
            </Text>
          </Button>
        </Box>
        <Heading className={styles.quote} level={HEADING.H2}>
          {request.quote}
        </Heading>
      </Box>
      <RequestRoutingBoard
        {...board}
        request={request}
        phase={phase}
        reduced={reduced}
      />
      <Text
        className={styles.narration}
        aria-live={reduced ? 'polite' : 'off'}
        aria-atomic='true'
      >
        {routingCaption(request, phase, reduced)}
      </Text>
      <Box className={styles.transcript}>
        {routingRequests.map((item) => (
          <Text key={item.id}>
            {item.quote} {routingCaption(item, 'work', true)}
          </Text>
        ))}
      </Box>
    </Box>
  );
}
