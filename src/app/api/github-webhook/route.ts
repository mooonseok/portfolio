import { revalidateTag } from 'next/cache';
import { ACTIVITY } from '@/constants/orbit';
import { verifySignature } from '@/lib/github/verify-signature';

export async function POST(request: Request) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret) return new Response(null, { status: 503 });
  const body = await request.text();
  if (
    !verifySignature(secret, body, request.headers.get('x-hub-signature-256'))
  )
    return new Response(null, { status: 401 });
  if (request.headers.get('x-github-event') === 'push')
    revalidateTag(ACTIVITY.TAG);
  return new Response(null, { status: 204 });
}
