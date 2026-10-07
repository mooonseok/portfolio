import type { DioramaHistory } from '@/dto/diorama-history.dto';

export function readDioramaHistory(
  source: unknown,
  slugs: readonly string[]
): DioramaHistory | null {
  if (!source || typeof source !== 'object' || !('portfolioWorkshop' in source))
    return null;
  const value = source.portfolioWorkshop;
  if (!value || typeof value !== 'object') return null;
  if (
    !('selected' in value) ||
    (value.selected !== null &&
      (typeof value.selected !== 'string' || !slugs.includes(value.selected)))
  )
    return null;
  if (
    !('enabled' in value) ||
    (value.enabled !== null && typeof value.enabled !== 'boolean')
  )
    return null;
  if (
    !('scrollY' in value) ||
    typeof value.scrollY !== 'number' ||
    !Number.isFinite(value.scrollY) ||
    value.scrollY < 0
  )
    return null;
  return value as DioramaHistory;
}

export function withDioramaHistory(source: unknown, value: DioramaHistory) {
  return {
    ...(source && typeof source === 'object' ? source : {}),
    portfolioWorkshop: value,
  };
}
