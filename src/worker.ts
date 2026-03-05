import { Hono } from 'hono';
import { buildEmailHTML } from './email-template';

type Bindings = {
  DB: D1Database;
  RESEND_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.post('/api/email-results', async (c) => {
  const { email, mode, results } = await c.req.json();

  if (!email || !mode || !results) {
    return c.json({ error: 'Missing fields' }, 400);
  }

  // Store lead in D1
  await c.env.DB.prepare(
    'INSERT INTO leads (email, mode, results) VALUES (?, ?, ?)'
  ).bind(email, mode, JSON.stringify(results)).run();

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

export default app;
