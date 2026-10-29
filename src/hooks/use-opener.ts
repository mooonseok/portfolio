import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { ORBIT } from '@/constants/orbit';
import type { OpenerElements, OpenerRefs } from '@/dto/opener.dto';

type Single = Exclude<
  keyof OpenerElements,
  'chunks' | 'rings' | 'syllables' | 'sats' | 'orbits'
>;
type Many = 'chunks' | 'rings' | 'syllables' | 'sats' | 'orbits';

const SKIP_KEYS = ['Escape', 'Enter', ' '];

const empty = (): OpenerElements => ({
  root: null,
  line: null,
  name: null,
  block: null,
  kicker: null,
  tag: null,
  frame: null,
  tagText: null,
  dot: null,
  skip: null,
  wipe: null,
  end: null,
  moon: null,
  chunks: [],
  rings: [],
  syllables: [],
  sats: [],
  orbits: [],
});

export function useOpener() {
  const [shown, setShown] = useState(true);
  const el = useRef<OpenerElements>(empty());
  const runner = useRef<{ skip: () => void; revert: () => void } | null>(null);
  const skip = useCallback(() => runner.current?.skip(), []);

  useLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(ORBIT.OPENER_KEY) === '1';
      sessionStorage.setItem(ORBIT.OPENER_KEY, '1');
    } catch {}
    if (seen) setShown(false);
  }, []);

  useEffect(() => {
    const root = el.current.root;
    if (!shown || !root) return;
    let cancelled = false;
    const reduced = window.matchMedia(ORBIT.REDUCED).matches;
    const done = (hadFocus: boolean) => {
      setShown(false);
      if (hadFocus) document.getElementById('main-content')?.focus();
    };
    import('@/lib/opener/run-opener')
      .then(({ runOpener }) => {
        if (!cancelled) runner.current = runOpener(el.current, reduced, done);
      })
      .catch(() => setShown(false));
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (SKIP_KEYS.includes(event.key)) skip();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelled = true;
      window.removeEventListener('keydown', onKey);
      runner.current?.revert();
      runner.current = null;
    };
  }, [shown, skip]);

  const single =
    <K extends Single>(key: K) =>
    (node: OpenerElements[K]) => {
      el.current[key] = node;
    };
  const many = (key: Many) => (index: number) => (node: Element | null) => {
    (el.current[key] as (Element | null)[])[index] = node;
  };
  const refs: OpenerRefs = {
    root: single('root'),
    line: single('line'),
    name: single('name'),
    block: single('block'),
    kicker: single('kicker'),
    tag: single('tag'),
    frame: single('frame'),
    tagText: single('tagText'),
    dot: single('dot'),
    skip: single('skip'),
    wipe: single('wipe'),
    end: single('end'),
    moon: single('moon'),
    chunk: many('chunks'),
    ring: many('rings'),
    syllable: many('syllables'),
    sat: many('sats'),
    orbit: many('orbits'),
  };
  return { shown, refs, skip };
}
