import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { buildEmailHTML } from './email-template';

type Bindings = {
  DB: D1Database;
  RESEND_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();
app.use('/api/*', cors({ origin: 'https://uncover.yellow-longitudinal.workers.dev' }));

// Simple IP-based rate limit: 3 emails per IP per hour
async function checkRateLimit(db: D1Database, ip: string): Promise<boolean> {
  const result = await db.prepare(
    `SELECT COUNT(*) as cnt FROM leads WHERE ip = ? AND created_at > datetime('now', '-1 hour')`
  ).bind(ip).first<{ cnt: number }>();
  return (result?.cnt ?? 0) < 3;
}

app.post('/api/email-results', async (c) => {
  const { email, mode, results } = await c.req.json();

  if (!email || !mode || !results) {
    return c.json({ error: 'Missing fields' }, 400);
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ error: 'Invalid email' }, 400);
  }

  const ip = c.req.header('cf-connecting-ip') || 'unknown';

  if (!await checkRateLimit(c.env.DB, ip)) {
    return c.json({ error: 'Rate limit exceeded. Try again later.' }, 429);
  }

  // Store lead in D1
  await c.env.DB.prepare(
    'INSERT INTO leads (email, mode, results, ip) VALUES (?, ?, ?, ?)'
  ).bind(email, mode, JSON.stringify(results), ip).run();

  // Send email via Resend
  const html = buildEmailHTML(results);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${c.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Uncover <uncover@frontiercommons.org>',
      to: [email],
      subject: 'What You Uncovered — Your Results',
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Resend error:', err);
    return c.json({ error: 'Email send failed' }, 500);
  }

  return c.json({ data: 'sent' });
});

// Analytics beacon handler
app.post('/api/analytics', async (c) => {
  try {
    const body = await c.req.json();
    const ip = c.req.header('cf-connecting-ip') || 'unknown';
    await c.env.DB.prepare(
      'INSERT INTO analytics (event, mode, ip, payload) VALUES (?, ?, ?, ?)'
    ).bind(body.event || 'unknown', body.mode || 'unknown', ip, JSON.stringify(body)).run();
  } catch (e) {
    // Best-effort, don't fail
  }
  return c.json({ ok: true });
});

app.all('/api/*', (c) => c.json({ error: 'Not found' }, 404));

export default app;
