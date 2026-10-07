import Image from 'next/image';
import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { Heading } from '@/components/atoms/heading';
import { Anchor } from '@/components/atoms/anchor';
import { Button } from '@/components/atoms/button';
import { DIORAMA } from '@/constants/diorama';
import { HEADING, TAG } from '@/constants/tag';
import type { DioramaPreviewProps } from '@/dto/diorama-preview.dto';
import { DioramaDetailsView } from './diorama-details-view';

export function DioramaPreviewView(props: DioramaPreviewProps) {
  return (
    <Box
      as={TAG.MAIN}
      id='main-content'
      tabIndex={-1}
      onKeyDown={props.onKeyDown}
      className='min-h-screen bg-paper px-5 py-6 text-ink tab:px-10 lap:px-12'
    >
      <Box
        as={TAG.HEADER}
        className='mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 border-b border-hairline pb-5'
      >
        <Anchor
          href='/'
          className='min-h-11 content-center text-sm underline underline-offset-4'
        >
          박문석 포트폴리오
        </Anchor>
        <Text className='text-sm text-subtle'>FarmFam+ · 화면 미리보기</Text>
      </Box>
      <Box className='mx-auto max-w-[1440px] pt-10 tab:pt-14'>
        <Heading
          level={HEADING.H1}
          className='font-sans text-[clamp(40px,7vw,80px)] leading-none tracking-[-0.035em]'
        >
          {props.title}
        </Heading>
        <Text className='mt-5 max-w-[48ch] text-lg leading-relaxed'>
          {props.summary}
        </Text>
        <Text className='mt-3 text-sm text-subtle'>
          {props.period} · 관리자 웹 / 서버 API / DB
        </Text>
        <Box className='mt-8 grid items-start gap-8 lap:grid-cols-[minmax(0,1.4fr)_minmax(320px,1fr)] lap:gap-10'>
          <Box>
            <Box as={TAG.FIGURE} className='m-0'>
              <Box className='relative aspect-[6/5] overflow-hidden rounded-[20px] bg-[#e9e7df] tab:aspect-[4/3]'>
                <Image
                  src={DIORAMA.POSTER}
                  alt='FarmFam+의 관리자 웹, 서버와 데이터베이스를 표현한 개념 모형'
                  fill
                  priority
                  sizes={DIORAMA.POSTER_SIZES}
                  className={
                    props.ready ? 'object-contain opacity-0' : 'object-contain'
                  }
                />
                <Box
                  ref={props.hostRef}
                  aria-hidden
                  className={`absolute inset-0 [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full ${props.ready ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                />
              </Box>
              <Text
                as={TAG.FIGCAPTION}
                className='mt-3 text-sm leading-relaxed text-subtle'
              >
                관리자 웹·서버·DB를 표현한 개념 모형입니다. 실제 서비스 화면이나
                시스템 구조도는 아닙니다.
              </Text>
            </Box>
            <Button
              ref={props.labelRef}
              id={DIORAMA.LABEL_ID}
              aria-pressed={props.selected}
              aria-controls={DIORAMA.PANEL_ID}
              onClick={props.onSelect}
              className={`mt-5 flex min-h-16 w-full items-center justify-between gap-4 rounded-lg border-2 px-5 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--marker-blue)] active:scale-[0.99] motion-reduce:transform-none ${props.selected ? 'border-[var(--marker-red)] bg-[var(--note-paper)]' : 'border-ink bg-paper hover:bg-[var(--board-white)]'}`}
            >
              <Text as={TAG.SPAN} className='font-sans text-xl font-semibold'>
                {props.title}
              </Text>
              <Text as={TAG.SPAN} className='text-sm'>
                {props.selected ? '담당 영역 닫기' : '담당 영역 보기'}
              </Text>
            </Button>
            <Box className='mt-3 flex flex-wrap items-center justify-between gap-2'>
              <Text
                role='status'
                aria-live='polite'
                className='text-sm text-subtle'
              >
                {props.failed
                  ? '3D를 불러오지 못해 정적 화면을 표시합니다.'
                  : props.enabled && !props.ready
                    ? '3D를 준비하고 있습니다.'
                    : props.ready
                      ? '모형이나 아래 이름표로 선택할 수 있습니다.'
                      : '정적 화면에서도 프로젝트를 선택할 수 있습니다.'}
              </Text>
              <Button
                onClick={props.onToggle}
                aria-pressed={props.enabled}
                className='min-h-11 px-2 text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2'
              >
                {props.enabled ? '3D 끄기' : '3D 켜기'}
              </Button>
            </Box>
          </Box>
          <DioramaDetailsView {...props} />
        </Box>
      </Box>
    </Box>
  );
}
