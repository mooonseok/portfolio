import { WorkflowMapView } from './ai-check-map-view';
import { WorkflowTextView } from './ai-check-flow-static-view';
import { Anchor } from '@/components/atoms/anchor';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Heading } from '@/components/atoms/heading';
import { Text } from '@/components/atoms/text';
import { AI_LOOP_TITLE_ID } from '@/constants/ai-practice';
import { HEADING, TAG } from '@/constants/tag';
import type { WorkflowIssue, WorkflowRequest } from '@/dto/ai-workflow.dto';
import styles from './ai-check-flow.module.css';

interface Props {
  requests: WorkflowRequest[];
  request: WorkflowRequest;
  issue?: WorkflowIssue;
  active: number;
  revisiting: boolean;
  returning: boolean;
  travel: boolean;
  playing: boolean;
  reduced: boolean;
  enhanced: boolean;
  finished: boolean;
  onRequest: (request: WorkflowRequest) => void;
  onSelect: (node: number) => void;
  onIssue: (issue?: WorkflowIssue) => void;
  onPlay: () => void;
  onNext: () => void;
}

export function AiCheckFlowView({
  requests,
  request,
  issue,
  active,
  revisiting,
  returning,
  travel,
  playing,
  reduced,
  enhanced,
  finished,
  onRequest,
  onIssue,
  onSelect,
  onPlay,
  onNext,
}: Props) {
  const stage = request.stages[active];
  const playLabel = finished
    ? '다시 보기'
    : playing
      ? '일시정지'
      : active === 0 && !revisiting
        ? '재생'
        : '이어 보기';
  return (
    <Box
      as={TAG.SECTION}
      id='work'
      aria-labelledby={AI_LOOP_TITLE_ID}
      className={styles.flow}
    >
      <Box className={styles.heading}>
        <Heading
          level={HEADING.H2}
          id={AI_LOOP_TITLE_ID}
          className='text-[clamp(23px,3vw,38px)] leading-tight font-medium tracking-tight'
        >
          요청별 작업 흐름
        </Heading>
        <Box className={styles.tabs} role='group' aria-label='요청 종류'>
          {requests.map((item) =>
            enhanced ? (
              <Button
                className={styles.tab}
                key={item.id}
                data-request={item.id}
                aria-pressed={item === request}
                onClick={() => onRequest(item)}
              >
                {item.label}
              </Button>
            ) : (
              <Anchor
                className={styles.tab}
                key={item.id}
                href={'#workflow-' + item.id}
              >
                {item.label}
              </Anchor>
            )
          )}
        </Box>
      </Box>
      <Box className={styles.spread}>
        <WorkflowMapView
          {...{ request, active, issue, returning, travel, enhanced, onSelect }}
        />
        <Box as={TAG.ARTICLE} id='ai-current-stage' className={styles.note}>
          <Text className={styles.count}>
            {String(active + 1).padStart(2, '0')} / 05 ·{' '}
            {revisiting ? (active === 3 ? '재검토' : '수정') : request.label}
          </Text>
          <Heading
            level={HEADING.H3}
            className='mt-3 text-2xl leading-tight font-medium'
          >
            {stage.label}
          </Heading>
          <Text className='mt-2 text-sm text-signal'>{stage.owner}</Text>
          <Text className='mt-4 leading-relaxed'>
            {returning && issue ? issue.reason : stage.body}
          </Text>
          {enhanced && (
            <Box className={styles.controls}>
              {!reduced && (
                <Button className={styles.control} onClick={onPlay}>
                  {playLabel}
                </Button>
              )}
              <Button
                aria-label='다음 단계'
                className={styles.control}
                onClick={onNext}
                disabled={finished}
              >
                다음 단계 →
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      {enhanced ? (
        <Box className={styles.review} role='group' aria-label='검토 결과 선택'>
          <Text className='font-medium'>검토 결과 선택</Text>
          <Box className={styles.options}>
            <Button
              className={styles.outcome}
              data-outcome='pass'
              aria-pressed={!issue}
              onClick={() => onIssue()}
            >
              통과
            </Button>
            {request.issues.map((choice) => (
              <Button
                className={styles.outcome}
                key={choice.id}
                data-outcome={choice.id}
                data-target={choice.target}
                aria-pressed={issue === choice}
                onClick={() => onIssue(choice)}
              >
                {choice.label}
              </Button>
            ))}
          </Box>
          <Text className={styles.verdict}>
            {issue
              ? request.stages[3].label +
                ' → ' +
                request.stages[issue.target].label +
                ' → 재검토'
              : request.stages[3].label + ' → ' + request.stages[4].label}
          </Text>
        </Box>
      ) : (
        <WorkflowTextView requests={requests} />
      )}
    </Box>
  );
}
