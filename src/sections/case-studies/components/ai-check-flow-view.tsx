import { AiPlazaExample } from './ai-plaza-example';
import { Anchor } from '@/components/atoms/anchor';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { Heading } from '@/components/atoms/heading';
import { List, ListItem } from '@/components/atoms/list';
import { Text } from '@/components/atoms/text';
import { AI_LOOP_TITLE_ID } from '@/constants/ai-practice';
import { HEADING, LIST_TAG, TAG } from '@/constants/tag';
import type { AiCheckFlow, AiCheckStage } from '@/dto/ai-practice.dto';
import styles from './ai-check-flow.module.css';
import graph from './ai-check-map.module.css';

interface Props {
  flow: AiCheckFlow;
  active: number;
  enhanced: boolean;
  playing: boolean;
  reduced: boolean;
  onSelect: (index: number) => void;
  onPlay: () => void;
  onReplay: () => void;
}

const twoDigits = (value: number) => String(value).padStart(2, '0');
const panelId = (id: string) => 'ai-stage-' + id;

export function AiCheckFlowView({
  flow,
  active,
  enhanced,
  playing,
  reduced,
  onSelect,
  onPlay,
  onReplay,
}: Props) {
  const finished = active === flow.stages.length - 1;
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
          {flow.title}
        </Heading>
        {enhanced && !reduced && (
          <Box className={styles.controls}>
            <Button
              onClick={finished ? onReplay : onPlay}
              className={styles.control}
            >
              <Text as={TAG.SPAN} aria-hidden>
                {finished ? '↺' : playing ? 'Ⅱ' : '▷'}
              </Text>
              {finished
                ? '다시 보기'
                : playing
                  ? '일시정지'
                  : active === 0
                    ? '재생'
                    : '이어 보기'}
            </Button>
            {active > 0 && !finished && (
              <Button onClick={onReplay} className={styles.control}>
                <Text as={TAG.SPAN} aria-hidden>
                  ↺
                </Text>
                다시 보기
              </Button>
            )}
          </Box>
        )}
      </Box>
      <Box className={styles.spread}>
        <Box className={graph.graph} data-stage={active + 1}>
          <Box key={active} className={graph.trail} aria-hidden />
          <List
            as={LIST_TAG.OL}
            aria-label='진행 순서'
            className={graph.stations}
          >
            {flow.stages.map((stage, index) => {
              const label = (
                <>
                  <Text as={TAG.SPAN} className={graph.serial}>
                    {twoDigits(index + 1)}
                  </Text>
                  {stage.label}
                </>
              );
              return (
                <ListItem key={stage.id} className={graph.station}>
                  {enhanced ? (
                    <Button
                      className={graph.node}
                      aria-pressed={active === index}
                      aria-controls='ai-current-stage'
                      onClick={() => onSelect(index)}
                    >
                      {label}
                    </Button>
                  ) : (
                    <Anchor
                      className={graph.node}
                      href={'#' + panelId(stage.id)}
                    >
                      {label}
                    </Anchor>
                  )}
                </ListItem>
              );
            })}
          </List>
          <Text className={graph.home}>홈</Text>
          <Text className={graph.inside}>내부 화면</Text>
          <Text className={graph.return}>{flow.loopLabel}</Text>
        </Box>
        <Box className={styles.notes} data-interactive={enhanced}>
          {enhanced ? (
            <StageDetail
              stage={flow.stages[active]}
              index={active}
              count={flow.stages.length}
              interactive
            />
          ) : (
            flow.stages.map((stage, index) => (
              <StageDetail
                key={stage.id}
                stage={stage}
                index={index}
                count={flow.stages.length}
              />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}

function StageDetail({
  stage,
  index,
  count,
  interactive,
}: {
  stage: AiCheckStage;
  index: number;
  count: number;
  interactive?: boolean;
}) {
  return (
    <Box
      as={TAG.ARTICLE}
      id={interactive ? 'ai-current-stage' : panelId(stage.id)}
      className={styles.note}
    >
      <Text className={styles.count}>
        {twoDigits(index + 1)} / {twoDigits(count)}
      </Text>
      <Heading
        level={HEADING.H3}
        className='mt-3 text-2xl leading-tight font-medium'
      >
        {stage.label}
      </Heading>
      <Text className='mt-4 text-base leading-relaxed'>{stage.body}</Text>
      {interactive && <AiPlazaExample stageId={stage.id} />}
      {stage.evidence.length > 0 && (
        <List className={styles.evidence}>
          {stage.evidence.map((item) => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
