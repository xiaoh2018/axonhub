export default async function onRequest({ request, env }) {
  const backend = (env.BACKEND_URL || '').replace(/\/$/, '');
  if (!backend) return new Response('BACKEND_URL is not set', { status: 500 });

  const url = new URL(request.url);
  const target = `${backend}${url.pathname}${url.search}`;
  return fetch(new Request(target, request), { redirect: 'manual' });
}
