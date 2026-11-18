export interface AutomationCase {
  start: string;
  work: string;
  returns: ReadonlyArray<{ condition: string; action: string }>;
  sample: string;
  output: string;
  check: string;
  handoff: string;
}
