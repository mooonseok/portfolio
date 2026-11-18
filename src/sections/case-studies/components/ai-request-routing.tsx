'use client';

import { Box } from '@/components/atoms/box';
import { RequestRoutingBoard } from '@/components/atoms/request-routing-board';
import { TAG } from '@/constants/tag';
import { designFlow } from '@/content/design-routing';
import { developmentFlow } from '@/content/request-routing';
import type { RoutingLane, RoutingRequest } from '@/dto/request-routing.dto';
import { useRequestRouting } from '@/hooks/use-request-routing';
import { useRequestRoutingBoard } from '@/hooks/use-request-routing-board';
import styles from './ai-request-routing.module.css';

function RequestTranscript({ request }: { request: RoutingRequest }) {
  const issue = request.issue;
  return (
    <Box as={TAG.DETAILS} open>
      <Box as={TAG.SUMMARY}>{request.label}</Box>
      <Box as={TAG.OL}>
        <Box as={TAG.LI}>{request.decision}</Box>
        <Box as={TAG.LI}>{request.work}</Box>
        <Box as={TAG.LI}>{request.review}</Box>
        {issue && <Box as={TAG.LI}>{issue.back}</Box>}
        <Box as={TAG.LI}>{request.finish}</Box>
      </Box>
    </Box>
  );
}

export function AiRequestRouting({ lane }: { lane: RoutingLane }) {
  const request = lane === 'design' ? designFlow : developmentFlow;
  const { phase, reduced, paintRef, viewportRef } = useRequestRouting(request);
  const board = useRequestRoutingBoard(request, reduced, paintRef);
  return (
    <Box className={styles.panel} data-lane={lane} data-phase={phase}>
      <Box className={styles.player}>
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
