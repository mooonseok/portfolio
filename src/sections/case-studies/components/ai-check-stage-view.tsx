import type { CSSProperties } from 'react';
import { Box } from '@/components/atoms/box';
import { Column } from '@/components/atoms/column';
import { Heading } from '@/components/atoms/heading';
import { List, ListItem } from '@/components/atoms/list';
import { Row } from '@/components/atoms/row';
import { Text } from '@/components/atoms/text';
import { MarkerPathView } from '@/components/organisms/whiteboard/marker-path-view';
import type {
  AiCheckStage,
  AiLoopMark,
  AiLoopMarks,
} from '@/dto/ai-practice.dto';
import { AI_CHECK_LABEL, LOOP_DIR } from '@/constants/ai-practice';
import { HEADING, TAG } from '@/constants/tag';

const order = (value: number) => ({ '--order': value }) as CSSProperties;

const DOT_WORD = /(\S*·\S*)/;

const keepDots = (text: string) =>
  text.split(DOT_WORD).map((part, i) =>
    DOT_WORD.test(part) ? (
      <Text as={TAG.SPAN} key={`${i}-${part}`} className='whitespace-nowrap'>
        {part}
      </Text>
    ) : (
      part
    )
  );

function HeadMark({ d }: { d: string }) {
  return (
    <Box as={TAG.SPAN} className='ai-loop-tip'>
      <MarkerPathView d={d} className='ai-loop-stroke' />
    </Box>
  );
}

export function AiCheckStageView({
  stage,
  index,
  mark,
  down,
  back,
}: {
  stage: AiCheckStage;
  index: number;
  mark: AiLoopMark;
  down?: AiLoopMarks['down'];
  back?: AiLoopMarks['back'];
}) {
  return (
    <ListItem className='ai-loop-stage'>
      <Row className='ai-loop-top'>
        <Heading level={HEADING.H3} className='ai-loop-name'>
          {stage.label}
        </Heading>
        {mark.span ? (
          <Box
            as={TAG.SPAN}
            className='ai-loop-span ai-loop-draw'
            data-dir={mark.dir}
            aria-hidden='true'
            style={order(mark.order)}
          >
            <MarkerPathView d={mark.span} className='ai-loop-stroke' />
            {mark.head ? <HeadMark d={mark.head} /> : null}
          </Box>
        ) : null}
      </Row>
      {mark.bend ? (
        <Box
          as={TAG.SPAN}
          className='ai-loop-bend ai-loop-draw'
          data-dir={LOOP_DIR.RIGHT}
          aria-hidden='true'
          style={order(mark.order + 1)}
        >
          <MarkerPathView d={mark.bend} className='ai-loop-stroke' />
        </Box>
      ) : null}
      {back ? (
        <Box
          as={TAG.SPAN}
          className='ai-loop-bend ai-loop-draw'
          data-dir={LOOP_DIR.LEFT}
          aria-hidden='true'
          style={order(back.order)}
        >
          <MarkerPathView
            d={back.bend}
            className='ai-loop-stroke ai-loop-mirror'
          />
          <HeadMark d={back.head} />
        </Box>
      ) : null}
      <Column className='ai-loop-content'>
        <Text className='ai-loop-body'>{keepDots(stage.body)}</Text>
        <Row as={TAG.SPAN} className='ai-loop-device'>
          <Text as={TAG.SPAN} className='ai-loop-kind'>
            {AI_CHECK_LABEL[stage.device.kind]}
          </Text>
          <Text as={TAG.SPAN} className='ai-loop-device-name'>
            {stage.device.name}
          </Text>
        </Row>
        <List role='list' className='ai-loop-items'>
          {stage.device.items.map((item) => (
            <ListItem key={item} className='ai-loop-item'>
              {keepDots(item)}
            </ListItem>
          ))}
        </List>
      </Column>
      {down ? (
        <Box
          as={TAG.SPAN}
          className='ai-loop-down ai-loop-draw'
          aria-hidden='true'
          style={order(index)}
        >
          <MarkerPathView d={down.line} className='ai-loop-stroke' />
          <HeadMark d={down.head} />
        </Box>
      ) : null}
    </ListItem>
  );
}
