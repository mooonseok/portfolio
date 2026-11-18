'use client';

import { Box } from '@/components/atoms/box';
import { Heading } from '@/components/atoms/heading';
import { RequestRoutingBoard } from '@/components/atoms/request-routing-board';
import { Text } from '@/components/atoms/text';
import { HEADING, TAG } from '@/constants/tag';
import { designFlow } from '@/content/design-routing';
import { developmentFlow } from '@/content/request-routing';
import type { RoutingLane, RoutingRequest } from '@/dto/request-routing.dto';
import { useRequestRouting } from '@/hooks/use-request-routing';
import { useRequestRoutingBoard } from '@/hooks/use-request-routing-board';
import styles from './ai-request-routing.module.css';

function RequestTranscript({ request }: { request: RoutingRequest }) {
  const issue = request.issue;
  return (
    <Box as={TAG.DETAILS}>
      <Box as={TAG.SUMMARY}>{request.label}</Box>
      <Text>{request.quote}</Text>
      <Box as={TAG.OL}>
        <Box as={TAG.LI}>{request.decision}</Box>
        <Box as={TAG.LI}>{request.work}</Box>
        <Box as={TAG.LI}>{request.review}</Box>
        {issue && (
          <Box as={TAG.LI}>
            {issue.back} {issue.retry}
          </Box>
        )}
        <Box as={TAG.LI}>{request.finish}</Box>
      </Box>
    </Box>
  );
}

export function AiRequestRouting({ lane }: { lane: RoutingLane }) {
  const request = lane === 'design' ? designFlow : developmentFlow;
  const { phase, reduced, paintRef, viewportRef } = useRequestRouting(request);
  const board = useRequestRoutingBoard(request, reduced, paintRef);
  const reading = !reduced && (phase === 'request' || phase === 'entry');
  return (
    <Box className={styles.panel} data-lane={lane} data-phase={phase}>
      <Box className={styles.player}>
        <Box
          as={TAG.HEADER}
          className={styles.header}
          aria-current={reading ? 'step' : undefined}
        >
          <Box className={styles.stage}>
            <Text as={TAG.SPAN}>요청</Text>
            {reading && (
              <Text as={TAG.SPAN} className={styles.reading}>
                {phase === 'entry' ? '판단으로 전달' : '읽는 중'}
              </Text>
            )}
          </Box>
          <Heading className={styles.quote} level={HEADING.H2}>
            {request.quote}
          </Heading>
        </Box>
        <Box ref={viewportRef}>
          <RequestRoutingBoard
            {...board}
            lane={lane}
            request={request}
            phase={phase}
            reduced={reduced}
          />
        </Box>
      </Box>
      <Box className={styles.transcript}>
        {[developmentFlow, designFlow].map((item) => (
          <RequestTranscript key={item.id} request={item} />
        ))}
      </Box>
    </Box>
  );
}
