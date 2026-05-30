export async function onRequest({ request, env }) {
  const code = new URL(request.url).searchParams.get('code');
  if (!code) {
    return new Response('Missing code parameter', { status: 400 });
  }

  const resp = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const { access_token, error } = await resp.json();

  if (error || !access_token) {
    const msg = `authorization:github:error:${JSON.stringify({ error: error || 'no_token' })}`;
    return new Response(
      `<!DOCTYPE html><html><body><script>window.opener.postMessage('${msg}','*');window.close();</script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  const payload = JSON.stringify({ token: access_token, provider: 'github' });
  return new Response(
    `<!DOCTYPE html><html><body><script>
window.opener.postMessage('authorization:github:success:${payload}','*');
window.close();
</script></body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}
