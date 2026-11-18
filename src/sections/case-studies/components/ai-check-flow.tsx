'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { AiCheckFlowView } from './ai-check-flow-view';
import { MEDIA } from '@/constants/breakpoint';
import { workflows } from '@/content/ai-workflow';
import { useMediaQuery } from '@/hooks/use-media-query';
import { workflowRoute } from '@/lib/ai-workflow';
import type { WorkflowIssue } from '@/dto/ai-workflow.dto';

const subscribeHydration = () => () => {};
const browserReady = () => true;
const serverReady = () => false;

export function AiCheckLoop() {
  const enhanced = useSyncExternalStore(
    subscribeHydration,
    browserReady,
    serverReady
  );
  const reduced = useMediaQuery(MEDIA.REDUCED_MOTION);
  const [request, setRequest] = useState(workflows[0]);
  const [issue, setIssue] = useState<WorkflowIssue | undefined>(
    workflows[0].issues[0]
  );
  const [cursor, setCursor] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [travel, setTravel] = useState(false);
  const route = workflowRoute(issue?.target);
  const end = route.length - 1;

  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setTimeout(() => {
      const next = Math.min(cursor + 1, end);
      setCursor(next);
      setTravel(true);
      if (next === end) setPlaying(false);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [cursor, end, playing, reduced]);

  useEffect(() => {
    const media = window.matchMedia(MEDIA.REDUCED_MOTION);
    const stop = () => {
      if (media.matches) setPlaying(false);
    };
    media.addEventListener('change', stop);
    return () => media.removeEventListener('change', stop);
  }, []);

  function selectNode(node: number) {
    const latest = route.lastIndexOf(node);
    setCursor(
      cursor >= 4 && issue && latest >= 4 ? latest : route.indexOf(node)
    );
    setPlaying(false);
    setTravel(false);
  }

  function selectIssue(next?: WorkflowIssue) {
    setIssue(next);
    setCursor(4);
    setTravel(true);
    if (!next) setPlaying(false);
  }

  return (
    <AiCheckFlowView
      requests={workflows}
      request={request}
      issue={issue}
      active={route[cursor]}
      revisiting={Boolean(issue && cursor >= 4 && cursor !== end)}
      returning={Boolean(issue && cursor === 4)}
      travel={travel}
      playing={playing}
      reduced={reduced}
      enhanced={enhanced}
      finished={cursor === end}
      onRequest={(next) => {
        setRequest(next);
        setIssue(next.issues[0]);
        setCursor(0);
        setTravel(false);
        setPlaying(false);
      }}
      onIssue={selectIssue}
      onSelect={selectNode}
      onPlay={() => {
        if (cursor === end) {
          setCursor(0);
          setTravel(false);
        }
        setPlaying(!playing);
      }}
      onNext={() => {
        setPlaying(false);
        setCursor(Math.min(end, cursor + 1));
        setTravel(true);
      }}
    />
  );
}
