import { createHmac, timingSafeEqual } from 'node:crypto';

const PREFIX = 'sha256=';

export function verifySignature(
  secret: string,
  body: string,
  header: string | null
) {
  if (!secret || !header?.startsWith(PREFIX)) return false;
  const expected = Buffer.from(
    PREFIX + createHmac('sha256', secret).update(body).digest('hex')
  );
  const received = Buffer.from(header);
  return (
    expected.length === received.length && timingSafeEqual(expected, received)
  );
}
