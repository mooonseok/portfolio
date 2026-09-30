export const lastPassed = (positions: readonly number[], line: number) => {
  let current = 0;
  positions.forEach((top, index) => {
    if (top <= line) current = index;
  });
  return current;
};
