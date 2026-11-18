'use client';

import { useState } from 'react';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Heading } from '@/components/atoms/heading';
import { RequestRoutingBoard } from '@/components/atoms/request-routing-board';
import { Text } from '@/components/atoms/text';
import { HEADING, TAG } from '@/constants/tag';
import { designRoutingRequests } from '@/content/design-routing';
import { routingRequests } from '@/content/request-routing';
import type { RoutingLane, RoutingRequest } from '@/dto/request-routing.dto';
import { useRequestRouting } from '@/hooks/use-request-routing';
import { useRequestRoutingBoard } from '@/hooks/use-request-routing-board';
import styles from './ai-request-routing.module.css';

function RequestTranscript({ request }: { request: RoutingRequest }) {
  const issue = request.issue;
  const design = request.lane === 'design';
  return (
    <Box as={TAG.DETAILS}>
      <Box as={TAG.SUMMARY}>
        {design ? '디자인' : '개발'} 요청 · {request.label}
      </Box>
      <Text>{request.quote}</Text>
      <Box as={TAG.OL}>
        <Box as={TAG.LI}>{request.decision}</Box>
        <Box as={TAG.LI}>
          {request.route} {request.work}
        </Box>
        <Box as={TAG.LI}>{request.review}</Box>
        {issue && (
          <Box as={TAG.LI}>
            {issue.back} {issue.repair} {issue.retry}
          </Box>
        )}
        <Box as={TAG.LI}>
          {request.finish} {design && '시안 전달 · 요청자 확인 대기'}
        </Box>
      </Box>
    </Box>
  );
}

export function AiRequestRouting({ lane }: { lane: RoutingLane }) {
  const requests = lane === 'design' ? designRoutingRequests : routingRequests;
  const [id, select] = useState(requests[0].id);
  const request = requests.find((item) => item.id === id) ?? requests[0];
  const { phase, reduced, paintRef, viewportRef } = useRequestRouting(request);
  const board = useRequestRoutingBoard(request, reduced, paintRef);
  const reading = phase === 'request' && !reduced;
  return (
    <Box
      className={styles.panel}
      data-lane={lane}
      data-phase={phase}
      data-example={request.id}
    >
      <Box className={styles.player}>
        <Box className={styles.picker} role='group' aria-label='요청 예시 선택'>
          {requests.map((item) => (
            <Button
              key={item.id}
              className={styles.choice}
              aria-pressed={request.id === item.id}
              onClick={() => select(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        <Box
          as={TAG.HEADER}
          className={styles.header}
          aria-current={reading ? 'step' : undefined}
        >
          <Box className={styles.stage}>
            <Text as={TAG.SPAN}>요청</Text>
            {reading && (
              <Text as={TAG.SPAN} className={styles.reading}>
                읽는 중
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
        <Text className='sr-only' role='status' aria-atomic='true'>
          {phase === 'done' &&
            (lane === 'design' ? '시안 전달 · 요청자 확인 대기. ' : '')}
          {phase === 'done' && request.finish}
        </Text>
      </Box>
      <Box className={styles.transcript}>
        {[...routingRequests, ...designRoutingRequests].map((item) => (
          <RequestTranscript key={item.id} request={item} />
        ))}
      </Box>
    </Box>
  );
}
