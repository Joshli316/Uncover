interface Pick {
  title: string;
  src: string;
}

interface Layer {
  question: string;
  layer: string;
  insight: string;
  picks: Pick[];
  prompts: string[];
}

export function buildEmailHTML(results: Layer[]): string {
  const layersHTML = results.map(r => `
    <div style="margin-bottom:40px;">
      <div style="font-family:'Helvetica Neue',sans-serif;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#C4704B;margin-bottom:8px;">${r.layer}</div>
      <div style="font-family:'Helvetica Neue',sans-serif;font-size:20px;font-weight:600;color:#1A1A1A;margin-bottom:6px;">${r.question}</div>
      <div style="font-size:14px;color:#8A8A8A;font-style:italic;margin-bottom:16px;line-height:1.5;">${r.insight}</div>
      <div style="margin-bottom:16px;">
        ${r.picks.map(p => `
          <div style="display:inline-block;width:30%;margin-right:3%;vertical-align:top;">
            <img src="${p.src}" alt="${p.title}" style="width:100%;border-radius:8px;display:block;" />
            <div style="font-size:12px;color:#8A8A8A;margin-top:4px;">${p.title}</div>
          </div>
        `).join('')}
      </div>
      <div style="background:#FFFFFF;border:1px solid #E8E4E0;border-radius:8px;padding:16px;margin-top:12px;">
        <div style="font-size:11px;font-weight:600;color:#C4704B;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Go deeper</div>
        ${r.prompts.map(p => `<div style="font-size:13px;color:#4A4A4A;line-height:1.6;padding:2px 0;">→ ${p}</div>`).join('')}
      </div>
    </div>
  `).join('<hr style="border:none;border-top:1px solid #E8E4E0;margin:32px 0;" />');

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAF9F7;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:40px;">
      <h1 style="font-size:32px;font-weight:700;color:#1A1A1A;margin:0 0 8px;">What You Uncovered</h1>
      <p style="font-size:15px;color:#4A4A4A;margin:0;">Your results from Uncover — saved for you.</p>
    </div>

    ${layersHTML}

    <div style="background:#F5F0EB;border-radius:12px;padding:32px 24px;text-align:center;margin-top:40px;">
      <p style="font-size:16px;color:#4A4A4A;line-height:1.6;margin:0 0 16px;">What you uncovered matters. Share it with one person this week.</p>
      <a href="https://frontiercommons.org#community" style="display:inline-block;padding:12px 28px;background:#C4704B;color:white;text-decoration:none;border-radius:999px;font-size:14px;font-weight:500;">Find Community</a>
    </div>

    <div style="text-align:center;margin-top:40px;padding-top:20px;border-top:1px solid #E8E4E0;">
      <p style="font-size:11px;color:#8A8A8A;margin:0;">Built by <a href="https://frontiercommons.org" style="color:#8A8A8A;">Frontier Commons</a></p>
    </div>
  </div>
</body>
</html>`;
}
