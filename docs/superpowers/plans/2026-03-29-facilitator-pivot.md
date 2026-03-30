# Facilitator Pivot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe Uncover as a facilitator tool — rewrite landing page, remove General mode, add printable session kit.

**Architecture:** Single-file HTML app. All changes are in `public/index.html` (modify) and `public/session-kit.html` (create). No backend changes. The landing page HTML and inline JS get rewritten; the solo question flow (screens, grid, transitions, summary) stays untouched.

**Tech Stack:** HTML, CSS, vanilla JS (all inline in single files)

**Spec:** `docs/superpowers/specs/2026-03-29-facilitator-pivot-design.md`

---

### Task 1: Remove General Mode — JS Cleanup

**Files:**
- Modify: `public/index.html` (lines 996–1145, 1147–1191, 1276, 1371, 1400, 1419, 1451, 1465, 1510, 1521–1528, 1592, 1602)

- [ ] **Step 1: Flatten COPY object — remove general, remove nesting**

Replace the entire `COPY` object and `MODE` variable (lines 996–1145) with a flat structure. Find this code:

```js
const params = new URLSearchParams(window.location.search);
let MODE = params.get('mode') === 'intl' ? 'intl' : 'general';

const COPY = {
  intl: {
    tagline: "A visual tool for naming what you carry between worlds.",
    // ... all intl copy ...
  },
  general: {
    // ... all general copy ...
  },
};
```

Replace with:

```js
const COPY = {
  tagline: "A visual tool for naming what you carry between worlds.",
  whatBody1: "Every journey between cultures carries weight — goodbyes that linger, languages that don't capture what you mean, holidays nobody around you knows. Uncover gives you a way to see that weight, name it, and share it.",
  whatBody2: "You'll look at 30 photographs — each one chosen to stir something — and pick the ones that resonate. The images you choose reveal patterns about how you move through the world, what you're protecting, and what you need.",
  frameworkHeading: "We all carry more than we show",
  frameworkBody1: "When you cross cultures, you learn to hold multiple worlds inside you. Some parts keep it together for everyone watching. Some parts carry the ache of what you left behind. Some parts kick in when the weight gets too heavy. And underneath all of it is something whole — the you that exists before and after all the performing.",
  frameworkBody2: "Uncover helps you see all four layers.",
  layer1Desc: "The parts that run your daily life here. They plan, achieve, adapt, and keep things together. They're the face you show the world.",
  layer2Desc: "The parts that carry homesickness, loneliness, the goodbyes you never fully processed. They're often hidden — even from you.",
  layer3Desc: "What kicks in when the weight is too much — overworking, retreating, numbing, performing. They're not bad — they're surviving.",
  layer4Desc: "The calm underneath all the layers. Being fully known, fully at rest. Not perfection — just wholeness.",
  whoHeading: "Built for anyone who works with international students",
  whoBody: "Uncover gives you a way to talk about inner experience without needing the vocabulary for it. Especially powerful for people carrying the weight of distance — from home, from language, from the version of themselves they left behind.",
  tags: ["Orientation programs", "Campus ministry", "ISSS offices", "Small groups", "Retreats", "Counselors", "Cross-cultural teams"],
  questions: [
    {
      number: "Question One",
      text: "What does your everyday life look like?",
      hint: "Pick 3 images that feel like a normal day for you right now.",
      partLabel: "Layer 1 · The Surface",
      partInsight: "In IFS, these are your managers — the parts that run your daily life. They plan, adapt, and hold it together, especially when people are watching.",
      prompts: [
        "What does this image capture about your life here?",
        "Is this how you want to show up, or just how you've learned to?",
        "What part of you is working hardest in this image?",
      ],
    },
    {
      number: "Question Two",
      text: "What do you carry that nobody sees?",
      hint: "Pick 3 images that feel like the stuff you don't talk about.",
      partLabel: "Layer 2 · What You Carry",
      partInsight: "In IFS, these are your exiles — the parts that carry pain you've pushed down. The goodbyes, the holidays alone, the things you can't explain to people who haven't lived it.",
      prompts: [
        "When did this feeling first show up for you?",
        "What does this part need that it hasn't gotten?",
        "What would happen if someone here really saw this part of you?",
      ],
    },
    {
      number: "Question Three",
      text: "What do you do when it gets too heavy?",
      hint: "Pick 3 images that feel like your go-to when you're overwhelmed.\nNo judgment. These are survival strategies, not failures.",
      partLabel: "Layer 3 · How You Cope",
      partInsight: "In IFS, these are your firefighters — the parts that kick in when the pain breaks through. They numb, escape, overwork, or shut down. They're not bad — they're trying to keep you standing.",
      prompts: [
        "What does this coping look like in your daily life?",
        "What is this part trying to protect you from feeling?",
        "If this part could talk, what would it say it needs?",
      ],
    },
    {
      number: "Question Four",
      text: "What do you actually need?",
      hint: "Pick 3 images that feel like what would make you feel whole.\nThink about a moment you felt most like yourself.",
      partLabel: "Layer 4 · What You Need",
      partInsight: "In IFS, this is your Self — the you underneath all the performing. Calm, curious, whole. It's always there, sometimes just buried under layers of protection.",
      prompts: [
        "What would change in your life if you had this?",
        "What's the biggest thing standing between you and this?",
        "Where — or with whom — do you feel closest to this?",
      ],
    },
  ],
  transitions: [
    { text: "Missing home isn't weakness. It's proof you loved something.", sub: "Next: what you carry but don't show." },
    { text: "Now think about your reactions.", sub: "Next: what you do when things get heavy." },
    { text: "One more — this one matters most.", sub: "Next: what you actually need." },
    { text: "Here's what you uncovered.", sub: "" },
  ],
  summaryDesc: "Four layers. One conversation. Here's what showed up when you stopped performing and started noticing.",
};
```

- [ ] **Step 2: Delete the `applyMode()` function**

Delete the entire `applyMode` function (lines 1147–1191). It will be replaced by a simpler `initLanding()` function in Task 2.

- [ ] **Step 3: Delete the mode toggle event listeners**

Delete this block (lines 1521–1528):

```js
document.querySelectorAll('.mode-toggle').forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    const opt = e.target.closest('.mode-toggle-opt');
    if (!opt || opt.dataset.mode === MODE) return;
    applyMode(opt.dataset.mode);
  });
});
```

- [ ] **Step 4: Update all `COPY[MODE]` references to `COPY`**

Replace every occurrence of `COPY[MODE]` with `COPY` throughout the JS. There are 5 occurrences:

1. Line 1276: `const q = COPY[MODE].questions[currentQ];` → `const q = COPY.questions[currentQ];`
2. Line 1400: `const t = COPY[MODE].transitions[currentQ - 1];` → `const t = COPY.transitions[currentQ - 1];`
3. Line 1419: `const questions = COPY[MODE].questions;` → `const questions = COPY.questions;`
4. Line 1465: `const questions = COPY[MODE].questions;` → `const questions = COPY.questions;`
5. Line 1451: `mode: MODE` in analytics beacon → `mode: 'intl'`

- [ ] **Step 5: Update `saveProgress` and session restore to remove mode**

In `saveProgress` (line 1371), change:
```js
function saveProgress() {
  try { sessionStorage.setItem('uncover_progress', JSON.stringify({ currentQ, selections, currentSelections, mode: MODE })); } catch(e) {}
}
```
to:
```js
function saveProgress() {
  try { sessionStorage.setItem('uncover_progress', JSON.stringify({ currentQ, selections, currentSelections })); } catch(e) {}
}
```

In session restore (lines 1596–1624), remove the mode restore line:
```js
if (saved.mode) applyMode(saved.mode);
```

- [ ] **Step 6: Update `sendResults` mode reference**

In `sendResults` (around line 1482), change:
```js
body: JSON.stringify({ email, mode: MODE, results }),
```
to:
```js
body: JSON.stringify({ email, mode: 'intl', results }),
```

- [ ] **Step 7: Update `shareResults` to remove mode param**

In `shareResults` (line 1510), change:
```js
const url = window.location.origin + (MODE === 'intl' ? '?mode=intl' : '');
```
to:
```js
const url = window.location.origin;
```

- [ ] **Step 8: Update init section**

Replace the init block (lines 1591–1593):
```js
applyMode(MODE);
renderHeroMosaic();
```
with:
```js
initLanding();
```

The `initLanding()` function will be defined in Task 2.

- [ ] **Step 9: Verify the JS changes compile — open the app in browser**

Run: `open http://localhost:8787`

Expected: The app may not fully render yet (landing page HTML not updated), but there should be no JS console errors related to the COPY object or MODE variable. The question flow should still work if you navigate directly to it.

- [ ] **Step 10: Commit**

```bash
git add public/index.html
git commit -m "refactor: remove General mode, flatten COPY object to intl-only"
```

---

### Task 2: Rewrite Landing Page HTML

**Files:**
- Modify: `public/index.html` (lines 748–862 for HTML, lines 56–93 for mode toggle CSS, lines 94–340 for landing page CSS)

- [ ] **Step 1: Remove mode toggle CSS**

Delete the entire MODE TOGGLE CSS section (lines 56–93):

```css
/* ═══════════════════════════════════════
   MODE TOGGLE
   ═══════════════════════════════════════ */
.mode-toggle { ... }
/* ... through ... */
.mode-toggle--small .mode-toggle-opt { ... }
```

- [ ] **Step 2: Update landing page CSS**

Replace the hero CSS (lines 98–165) with new facilitator-focused hero styles. Replace the existing `.landing-hero`, `.landing-hero h1`, `.hero-definition`, `.landing-tagline`, `.hero-toggle-wrap`, `.landing-scroll-hint`, `.scroll-arrow`, and `@keyframes bobDown` rules with:

```css
/* Hero */
.landing-hero {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 24px;
  position: relative;
}
.hero-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 20px;
  opacity: 0; transform: translateY(12px);
  animation: fadeUp 0.7s 0.2s ease both;
}
.landing-hero h1 {
  font-family: var(--font-display);
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  max-width: 640px;
  margin-bottom: 16px;
  opacity: 0; transform: translateY(16px);
  animation: fadeUp 0.7s 0.3s ease both;
}
.landing-subtitle {
  font-size: clamp(15px, 2.5vw, 18px);
  color: var(--ink-light);
  max-width: 520px;
  line-height: 1.5;
  margin-bottom: 32px;
  opacity: 0; transform: translateY(12px);
  animation: fadeUp 0.7s 0.4s ease both;
}
.hero-ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  opacity: 0; transform: translateY(12px);
  animation: fadeUp 0.7s 0.5s ease both;
}
.landing-scroll-hint {
  position: absolute;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--muted);
  opacity: 0;
  animation: fadeUp 0.7s 1s ease both;
}
.scroll-arrow {
  width: 20px;
  height: 20px;
  border-right: 1.5px solid var(--muted);
  border-bottom: 1.5px solid var(--muted);
  transform: rotate(45deg);
  animation: bobDown 2s ease-in-out infinite;
}
@keyframes bobDown {
  0%, 100% { transform: rotate(45deg) translateY(0); }
  50% { transform: rotate(45deg) translateY(4px); }
}
```

- [ ] **Step 3: Add CSS for the new "Running a Session" section**

Add after the existing `.parts-grid` / `.part-card` CSS (around line 290):

```css
/* Session Guide */
.session-steps {
  display: grid;
  gap: 24px;
  margin-top: 32px;
}
.session-step {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.session-step-num {
  min-width: 44px;
  height: 44px;
  background: var(--accent);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  flex-shrink: 0;
}
.session-step h4 {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}
.session-step p {
  font-size: 15px;
  color: var(--ink-light);
  line-height: 1.5;
}
```

- [ ] **Step 4: Remove hero mosaic CSS**

Delete the `.hero-mosaic`, `.hero-mosaic-grid`, and `.hero-mosaic-cta` CSS rules (search for `hero-mosaic` in the `<style>` block and delete all related rules).

- [ ] **Step 5: Replace landing page HTML**

Replace the entire landing page HTML (from `<div id="screen-landing">` through its closing `</div>`, lines 751–862) with:

```html
<div id="screen-landing" class="screen active visible">

  <!-- Hero -->
  <div class="landing-hero">
    <div class="hero-label">For facilitators</div>
    <h1>A 20-minute exercise that gets international students talking about what they actually carry.</h1>
    <p class="landing-subtitle">30 photographs. 4 questions. A framework for seeing the layers beneath the surface.</p>
    <div class="hero-ctas">
      <button class="btn btn-primary btn-large" onclick="startQuestions()">Try It Yourself</button>
      <a class="btn btn-outline btn-large" href="/session-kit.html" target="_blank">Download Session Kit</a>
    </div>
    <div class="landing-scroll-hint">
      Learn more
      <div class="scroll-arrow"></div>
    </div>
  </div>

  <!-- What Happens in a Session -->
  <div class="landing-section reveal">
    <div class="section-label">What happens in a session</div>
    <h2 class="section-heading">Each person browses 30 photos and picks 3 per question</h2>
    <p class="section-body">The 4 questions map to layers from <a href="https://ifs-institute.com" target="_blank" style="color:var(--accent);text-decoration:underline;text-underline-offset:2px;">Internal Family Systems</a> (IFS) — a therapy model that sees the mind as made up of different parts, each with its own role.</p>
    <div class="parts-grid">
      <div class="part-card">
        <div class="part-card-icon"><svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 6C24 6 10 12 10 22V34L24 42L38 34V22C38 12 24 6 24 6Z" stroke="#4A8B7F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 14V30" stroke="#4A8B7F" stroke-width="1" stroke-linecap="round" opacity="0.4"/><path d="M18 20L24 14L30 20" stroke="#4A8B7F" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/></svg></div>
        <div class="part-card-label">Q1 · The Surface</div>
        <h4>"What does your everyday life look like?"</h4>
        <p id="layer1-desc"></p>
      </div>
      <div class="part-card">
        <div class="part-card-icon"><svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 42S8 32 8 20C8 14 12 8 18 8C21 8 23 10 24 12C25 10 27 8 30 8C36 8 40 14 40 20C40 32 24 42 24 42Z" stroke="#4A8B7F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 18L28 30" stroke="#4A8B7F" stroke-width="1" stroke-linecap="round" opacity="0.5"/><path d="M20 30L28 18" stroke="#4A8B7F" stroke-width="1" stroke-linecap="round" opacity="0.3"/></svg></div>
        <div class="part-card-label">Q2 · What You Carry</div>
        <h4>"What do you carry that nobody sees?"</h4>
        <p id="layer2-desc"></p>
      </div>
      <div class="part-card">
        <div class="part-card-icon"><svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 42C24 42 24 34 24 28C20 34 14 38 12 36C10 34 14 28 18 24C12 26 6 28 6 24C6 20 14 20 20 18C14 14 10 8 12 6C14 4 20 8 24 14C28 8 34 4 36 6C38 8 34 14 28 18C34 20 42 20 42 24C42 28 36 26 30 24C34 28 38 34 36 36C34 38 28 34 24 28" stroke="#4A8B7F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="24" cy="24" r="3" stroke="#4A8B7F" stroke-width="1" opacity="0.4"/></svg></div>
        <div class="part-card-label">Q3 · How You Cope</div>
        <h4>"What do you do when it gets too heavy?"</h4>
        <p id="layer3-desc"></p>
      </div>
      <div class="part-card">
        <div class="part-card-icon"><svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="16" stroke="#4A8B7F" stroke-width="1.5" stroke-linecap="round"/><circle cx="24" cy="24" r="6" stroke="#4A8B7F" stroke-width="1" opacity="0.5"/><circle cx="24" cy="24" r="2" fill="#4A8B7F" opacity="0.3"/></svg></div>
        <div class="part-card-label">Q4 · What You Need</div>
        <h4>"What do you actually need?"</h4>
        <p id="layer4-desc"></p>
      </div>
    </div>
    <p class="section-body" style="font-size:14px;color:var(--muted);margin-top:20px;">After each question, the facilitator uses built-in conversation prompts to guide the group discussion.</p>
  </div>

  <!-- Running a Session -->
  <div class="landing-section full-warm reveal">
    <div class="section-inner">
      <div class="section-label">Running a session</div>
      <h2 class="section-heading">Everything you need to facilitate</h2>
      <div class="session-steps">
        <div class="session-step">
          <div class="session-step-num">1</div>
          <div>
            <h4>Set up (2 min)</h4>
            <p>Group of 4–8 people. Everyone opens Uncover on their phone. Or print the session kit for no-wifi settings.</p>
          </div>
        </div>
        <div class="session-step">
          <div class="session-step-num">2</div>
          <div>
            <h4>Pick photos (10 min)</h4>
            <p>Read each question aloud. Give people 2 minutes to browse and pick 3 photos. Silence is fine — let them sit with it.</p>
          </div>
        </div>
        <div class="session-step">
          <div class="session-step-num">3</div>
          <div>
            <h4>Share & discuss (10–15 min)</h4>
            <p>After each question, invite 2–3 people to share what they picked and why. Use the built-in prompts to go deeper. Don't force anyone.</p>
          </div>
        </div>
        <div class="session-step">
          <div class="session-step-num">4</div>
          <div>
            <h4>Close (5 min)</h4>
            <p>Everyone sees their summary. Ask: "What surprised you?" Close with one word for how they're feeling.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Who It's For -->
  <div class="landing-section reveal">
    <div class="section-label">Who it's for</div>
    <h2 class="section-heading" id="who-heading"></h2>
    <p class="section-body" id="who-body"></p>
    <div class="uses-list" id="uses-list"></div>
  </div>

  <!-- CTA -->
  <div class="landing-cta reveal">
    <h2>Ready to run a session?</h2>
    <p>Free. No sign-up. Takes 20–30 minutes.</p>
    <div class="hero-ctas" style="animation:none;opacity:1;transform:none;">
      <button class="btn btn-primary btn-large" onclick="startQuestions()">Try It Yourself First</button>
      <a class="btn btn-outline btn-large" href="/session-kit.html" target="_blank">Download Session Kit</a>
    </div>
  </div>

  <div class="landing-footer">
    Photos from <a href="https://unsplash.com" target="_blank">Unsplash</a> ·
    Built by <a href="https://frontiercommons.org" target="_blank">Frontier Commons</a>
  </div>
</div>
```

- [ ] **Step 6: Add the `initLanding()` function**

Add this function in the JS, right before the `// ─── PHOTOS` section:

```js
function initLanding() {
  document.getElementById('layer1-desc').textContent = COPY.layer1Desc;
  document.getElementById('layer2-desc').textContent = COPY.layer2Desc;
  document.getElementById('layer3-desc').textContent = COPY.layer3Desc;
  document.getElementById('layer4-desc').textContent = COPY.layer4Desc;
  document.getElementById('who-heading').textContent = COPY.whoHeading;
  document.getElementById('who-body').textContent = COPY.whoBody;
  document.getElementById('summary-desc').textContent = COPY.summaryDesc;
  const tagsList = document.getElementById('uses-list');
  tagsList.innerHTML = COPY.tags.map(t => `<span class="use-tag">${t}</span>`).join('');
}
```

- [ ] **Step 7: Delete the `renderHeroMosaic()` function**

Delete the entire `renderHeroMosaic` function (lines 1251–1264):

```js
function renderHeroMosaic() {
  const grid = document.getElementById('hero-mosaic-grid');
  // ...
}
```

- [ ] **Step 8: Verify landing page renders correctly**

Run: `open http://localhost:8787`

Expected:
- Hero shows "FOR FACILITATORS" label, new headline, subtitle, two CTA buttons
- "What Happens in a Session" section with 4-question grid
- "Running a Session" section with 4 numbered steps
- "Who It's For" section with tags
- Bottom CTA with two buttons
- No mode toggle anywhere
- No photo mosaic in hero

- [ ] **Step 9: Commit**

```bash
git add public/index.html
git commit -m "feat: rewrite landing page for facilitators, remove hero mosaic"
```

---

### Task 3: Update Meta Tags and Page Title

**Files:**
- Modify: `public/index.html` (lines 5–14)

- [ ] **Step 1: Update meta tags**

Replace lines 5–14:

```html
<title>Uncover — A Visual Conversation Tool</title>
<meta name="description" content="A visual tool for real conversations. 30 images, 4 questions, and a framework for seeing the layers of yourself you don't always show.">
<meta property="og:title" content="Uncover — A Visual Conversation Tool">
<meta property="og:description" content="30 images. 4 questions. A window into the layers of yourself you don't always show.">
<meta property="og:type" content="website">
<meta property="og:image" content="/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="/og.png">
<meta property="og:url" content="https://uncover.frontiercommons.workers.dev">
```

with:

```html
<title>Uncover — A Conversation Tool for International Student Groups</title>
<meta name="description" content="A 20-minute visual exercise that helps international students name what they carry between worlds. Free. No sign-up.">
<meta property="og:title" content="Uncover — A Conversation Tool for International Student Groups">
<meta property="og:description" content="A 20-minute visual exercise that helps international students name what they carry between worlds. Free. No sign-up.">
<meta property="og:type" content="website">
<meta property="og:image" content="/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="/og.png">
<meta property="og:url" content="https://uncover.frontiercommons.workers.dev">
```

- [ ] **Step 2: Commit**

```bash
git add public/index.html
git commit -m "feat: update meta tags for facilitator positioning"
```

---

### Task 4: Create Printable Session Kit

**Files:**
- Create: `public/session-kit.html`

- [ ] **Step 1: Create `public/session-kit.html`**

Create the full session kit page. This is a standalone HTML file with print-optimized CSS. It references the same 30 photos and 4 questions from the main app (hardcoded, not imported — these are static pages).

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Uncover — Session Kit</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #F4F7F9;
      --surface: #FFFFFF;
      --accent: #4A8B7F;
      --ink: #1C2B33;
      --ink-light: #3D5561;
      --muted: #7A909A;
      --border: #D6DFE4;
      --font-display: 'Space Grotesk', system-ui, sans-serif;
      --font-body: 'DM Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font-body);
      color: var(--ink);
      background: var(--bg);
      padding: 40px 24px;
    }

    .kit-header {
      max-width: 720px;
      margin: 0 auto 40px;
      text-align: center;
    }
    .kit-header h1 {
      font-family: var(--font-display);
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .kit-header p { color: var(--muted); font-size: 15px; }
    .kit-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-top: 20px;
    }
    .kit-btn {
      padding: 10px 24px;
      border-radius: 999px;
      font-family: var(--font-body);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      border: none;
    }
    .kit-btn-primary { background: var(--accent); color: white; }
    .kit-btn-outline { background: none; border: 1px solid var(--accent); color: var(--accent); }

    /* Page sections */
    .kit-page {
      max-width: 720px;
      margin: 0 auto 60px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 40px 36px;
    }
    .kit-page-label {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 16px;
    }
    .kit-page h2 {
      font-family: var(--font-display);
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    .kit-page h3 {
      font-family: var(--font-display);
      font-size: 18px;
      font-weight: 600;
      margin: 24px 0 12px;
    }
    .kit-page p, .kit-page li {
      font-size: 15px;
      line-height: 1.7;
      color: var(--ink-light);
    }
    .kit-page ul { margin-left: 20px; }
    .kit-page li { margin-bottom: 6px; }

    /* Session steps */
    .kit-step {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;
      align-items: flex-start;
    }
    .kit-step-num {
      min-width: 32px;
      height: 32px;
      background: var(--accent);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
      flex-shrink: 0;
    }
    .kit-step strong { color: var(--ink); }

    /* Tips */
    .kit-tip {
      background: var(--bg);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 12px;
      font-size: 15px;
      line-height: 1.6;
      color: var(--ink-light);
    }
    .kit-tip strong { color: var(--ink); }

    /* Photo grid */
    .photo-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
    }
    .photo-cell {
      text-align: center;
    }
    .photo-cell img {
      width: 100%;
      aspect-ratio: 3/2;
      object-fit: cover;
      border-radius: 6px;
      display: block;
    }
    .photo-cell .photo-label {
      font-size: 10px;
      color: var(--muted);
      margin-top: 4px;
      line-height: 1.2;
    }
    .photo-cell .photo-num {
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--accent);
      font-weight: 600;
    }

    /* Question cards */
    .q-card-question {
      font-family: var(--font-display);
      font-size: 28px;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 12px;
    }
    .q-card-hint {
      font-size: 16px;
      color: var(--muted);
      margin-bottom: 20px;
      font-style: italic;
    }
    .q-card-insight {
      background: var(--bg);
      border-radius: 8px;
      padding: 16px;
      font-size: 14px;
      color: var(--ink-light);
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .q-card-prompts {
      list-style: none;
      margin: 0;
      counter-reset: prompt;
    }
    .q-card-prompts li {
      counter-increment: prompt;
      padding: 12px 0;
      border-bottom: 1px solid var(--border);
      font-size: 17px;
      color: var(--ink);
    }
    .q-card-prompts li:last-child { border-bottom: none; }
    .q-card-prompts li::before {
      content: counter(prompt) ".";
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--accent);
      margin-right: 12px;
      font-weight: 600;
    }

    /* Print styles */
    @media print {
      body { background: white; padding: 0; }
      .kit-header, .kit-actions { display: none; }
      .kit-page {
        border: none;
        border-radius: 0;
        padding: 24px 0;
        margin: 0 auto;
        box-shadow: none;
        break-after: page;
      }
      .kit-page:last-child { break-after: auto; }
      .photo-grid { gap: 4px; }
      .photo-cell img { border-radius: 2px; }
    }
  </style>
</head>
<body>

  <div class="kit-header">
    <h1>Uncover — Session Kit</h1>
    <p>Print this kit or save as PDF. Everything you need to run a session.</p>
    <div class="kit-actions">
      <button class="kit-btn kit-btn-primary" onclick="window.print()">Print / Save as PDF</button>
      <a class="kit-btn kit-btn-outline" href="/">Back to Uncover</a>
    </div>
  </div>

  <!-- Page 1: Facilitator Cheat Sheet -->
  <div class="kit-page">
    <div class="kit-page-label">Page 1 of 6</div>
    <h2>Facilitator Cheat Sheet</h2>
    <p>Uncover is a visual conversation tool. Participants browse 30 photographs and pick the ones that resonate — revealing patterns about how they move through the world, what they're protecting, and what they need.</p>
    <p style="margin-top:8px;"><strong>Format:</strong> 20–30 minutes · Groups of 4–8 · Phones or printed photo grid</p>

    <h3>Session Flow</h3>
    <div class="kit-step">
      <div class="kit-step-num">1</div>
      <p><strong>Set up (2 min)</strong> — Everyone opens Uncover on their phone, or lay the printed photo grid on the table. Briefly explain: "You'll see 4 questions. For each one, pick 3 photos that resonate. Trust your gut."</p>
    </div>
    <div class="kit-step">
      <div class="kit-step-num">2</div>
      <p><strong>Pick photos (10 min)</strong> — Read each question aloud. Give 2 minutes to browse and pick. Move through all 4 questions before discussing.</p>
    </div>
    <div class="kit-step">
      <div class="kit-step-num">3</div>
      <p><strong>Share & discuss (10–15 min)</strong> — Go back through each question. Invite 2–3 people to share what they picked and why. Use the conversation prompts on the question cards. Don't force anyone — "pass" is always okay.</p>
    </div>
    <div class="kit-step">
      <div class="kit-step-num">4</div>
      <p><strong>Close (5 min)</strong> — Ask the group: "What surprised you?" Then do a one-word check-out — each person shares one word for how they're feeling.</p>
    </div>

    <h3>Facilitator Tips</h3>
    <div class="kit-tip"><strong>Silence is normal.</strong> After reading a question, give people space. Don't rush to fill the quiet — they're processing.</div>
    <div class="kit-tip"><strong>If someone gets emotional.</strong> Acknowledge it simply: "Thank you for sharing that." Don't try to fix it or move on too fast. Let it land.</div>
    <div class="kit-tip"><strong>"Pass" is always okay.</strong> Never force anyone to share. The exercise works even if someone only shares on one question.</div>
    <div class="kit-tip"><strong>Question 2 is the heaviest.</strong> "What do you carry that nobody sees?" often surfaces real pain — homesickness, loneliness, grief. Be ready for it. Go slow.</div>
    <div class="kit-tip"><strong>Share your own picks first.</strong> Vulnerability invites vulnerability. When you go first with honesty, you give permission.</div>
    <div class="kit-tip"><strong>This is not therapy.</strong> If something heavy comes up: "Thank you for sharing that. Would you want to explore that more with someone?" Know your limits and have referral resources ready.</div>
  </div>

  <!-- Page 2: Photo Grid -->
  <div class="kit-page">
    <div class="kit-page-label">Page 2 of 6</div>
    <h2>Photo Grid</h2>
    <p style="margin-bottom:20px;">Print this page and lay it on the table — participants point to or call out numbers. Or project it on a screen.</p>
    <div class="photo-grid" id="photo-grid"></div>
  </div>

  <!-- Pages 3-6: Question Cards -->
  <div class="kit-page" id="q-card-1"></div>
  <div class="kit-page" id="q-card-2"></div>
  <div class="kit-page" id="q-card-3"></div>
  <div class="kit-page" id="q-card-4"></div>

<script>
// Photo data (same as main app)
const PHOTOS = [
  { id: 1,  title: "Arrivals",             src: "https://plus.unsplash.com/premium_photo-1755001019700-8d9178fe922d?w=400&h=267&fit=crop&auto=format" },
  { id: 2,  title: "Waiting Platform",     src: "https://images.unsplash.com/photo-1749250731763-53c3589d96f3?w=400&h=267&fit=crop&auto=format" },
  { id: 3,  title: "Campus Crossroads",    src: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=400&h=267&fit=crop&auto=format" },
  { id: 4,  title: "Small Room",           src: "https://plus.unsplash.com/premium_photo-1724788725974-4cb2f09e81e6?w=400&h=267&fit=crop&auto=format" },
  { id: 5,  title: "Empty Lecture Hall",   src: "https://images.unsplash.com/photo-1760121788536-9797394e210e?w=400&h=267&fit=crop&auto=format" },
  { id: 6,  title: "Bus Stop",             src: "https://images.unsplash.com/photo-1756155380343-9a3a3b91ed9b?w=400&h=267&fit=crop&auto=format" },
  { id: 7,  title: "Foreign Aisle",        src: "https://images.unsplash.com/photo-1646806950396-5dbe86c336cd?w=400&h=267&fit=crop&auto=format" },
  { id: 8,  title: "Rainy Distance",       src: "https://images.unsplash.com/photo-1644249360770-a0e104b04587?w=400&h=267&fit=crop&auto=format" },
  { id: 9,  title: "Passport Papers",      src: "https://images.unsplash.com/photo-1454496406107-dc34337da8d6?w=400&h=267&fit=crop&auto=format" },
  { id: 10, title: "Half-Packed Life",     src: "https://images.unsplash.com/photo-1760095435041-3957a2fa220e?w=400&h=267&fit=crop&auto=format" },
  { id: 11, title: "Phone Glow",           src: "https://plus.unsplash.com/premium_photo-1664284793211-0771739401c2?w=400&h=267&fit=crop&auto=format" },
  { id: 12, title: "App Overload",         src: "https://images.unsplash.com/photo-1745848413078-f85af10e5bf2?w=400&h=267&fit=crop&auto=format" },
  { id: 13, title: "Packed Calendar",      src: "https://images.unsplash.com/photo-1668621175883-c3a42fa76da4?w=400&h=267&fit=crop&auto=format" },
  { id: 14, title: "2AM Grind",            src: "https://images.unsplash.com/photo-1733087157951-ed8f545b7f8a?w=400&h=267&fit=crop&auto=format" },
  { id: 15, title: "Survival Meal",        src: "https://images.unsplash.com/photo-1759923593745-6302b220d719?w=400&h=267&fit=crop&auto=format" },
  { id: 16, title: "Tuned Out",            src: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=267&fit=crop&auto=format" },
  { id: 17, title: "Study Stack",          src: "https://images.unsplash.com/photo-1639705124640-8336eedfbd49?w=400&h=267&fit=crop&auto=format" },
  { id: 18, title: "Counting Pennies",     src: "https://images.unsplash.com/photo-1585401586477-2a671e1cae4e?w=400&h=267&fit=crop&auto=format" },
  { id: 19, title: "Standing Still",       src: "https://images.unsplash.com/photo-1752650143223-f5b817b4e724?w=400&h=267&fit=crop&auto=format" },
  { id: 20, title: "Table For One",        src: "https://images.unsplash.com/photo-1762113246682-74830fb87a46?w=400&h=267&fit=crop&auto=format" },
  { id: 21, title: "Walking Together",     src: "https://images.unsplash.com/photo-1624355275924-d5426f2e4542?w=400&h=267&fit=crop&auto=format" },
  { id: 22, title: "Gentle Conversation",  src: "https://images.unsplash.com/photo-1626108862021-d6a7af6521b7?w=400&h=267&fit=crop&auto=format" },
  { id: 23, title: "Crumpled Bills",       src: "https://images.unsplash.com/photo-1711915482570-a7714a3a4660?w=400&h=267&fit=crop&auto=format" },
  { id: 24, title: "Rain Touch",           src: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=267&fit=crop&auto=format" },
  { id: 25, title: "Holding It In",        src: "https://images.unsplash.com/photo-1584299191647-0fc9f89f0555?w=400&h=267&fit=crop&auto=format" },
  { id: 26, title: "Foggy Glass",          src: "https://images.unsplash.com/photo-1742223858704-61e6071c75e8?w=400&h=267&fit=crop&auto=format" },
  { id: 27, title: "Walking The Line",     src: "https://images.unsplash.com/photo-1511762180596-d03b808430fe?w=400&h=267&fit=crop&auto=format" },
  { id: 28, title: "Locked Door",          src: "https://images.unsplash.com/photo-1636708835095-d1a480d24aed?w=400&h=267&fit=crop&auto=format" },
  { id: 29, title: "Open Door",            src: "https://images.unsplash.com/photo-1726804550899-f0e01f066031?w=400&h=267&fit=crop&auto=format" },
  { id: 30, title: "Morning Light",        src: "https://images.unsplash.com/photo-1645017004614-0cbd77d7d6d7?w=400&h=267&fit=crop&auto=format" },
];

const QUESTIONS = [
  {
    number: "Question One",
    pageNum: 3,
    label: "Q1 · Layer 1 · The Surface",
    text: "What does your everyday life look like?",
    hint: "Pick 3 images that feel like a normal day for you right now.",
    insight: "In IFS, these are your managers — the parts that run your daily life. They plan, adapt, and hold it together, especially when people are watching.",
    prompts: [
      "What does this image capture about your life here?",
      "Is this how you want to show up, or just how you've learned to?",
      "What part of you is working hardest in this image?",
    ],
  },
  {
    number: "Question Two",
    pageNum: 4,
    label: "Q2 · Layer 2 · What You Carry",
    text: "What do you carry that nobody sees?",
    hint: "Pick 3 images that feel like the stuff you don't talk about.",
    insight: "In IFS, these are your exiles — the parts that carry pain you've pushed down. The goodbyes, the holidays alone, the things you can't explain to people who haven't lived it.",
    prompts: [
      "When did this feeling first show up for you?",
      "What does this part need that it hasn't gotten?",
      "What would happen if someone here really saw this part of you?",
    ],
  },
  {
    number: "Question Three",
    pageNum: 5,
    label: "Q3 · Layer 3 · How You Cope",
    text: "What do you do when it gets too heavy?",
    hint: "Pick 3 images that feel like your go-to when you're overwhelmed. No judgment. These are survival strategies, not failures.",
    insight: "In IFS, these are your firefighters — the parts that kick in when the pain breaks through. They numb, escape, overwork, or shut down. They're not bad — they're trying to keep you standing.",
    prompts: [
      "What does this coping look like in your daily life?",
      "What is this part trying to protect you from feeling?",
      "If this part could talk, what would it say it needs?",
    ],
  },
  {
    number: "Question Four",
    pageNum: 6,
    label: "Q4 · Layer 4 · What You Need",
    text: "What do you actually need?",
    hint: "Pick 3 images that feel like what would make you feel whole. Think about a moment you felt most like yourself.",
    insight: "In IFS, this is your Self — the you underneath all the performing. Calm, curious, whole. It's always there, sometimes just buried under layers of protection.",
    prompts: [
      "What would change in your life if you had this?",
      "What's the biggest thing standing between you and this?",
      "Where — or with whom — do you feel closest to this?",
    ],
  },
];

// Render photo grid
const grid = document.getElementById('photo-grid');
PHOTOS.forEach(photo => {
  const cell = document.createElement('div');
  cell.className = 'photo-cell';
  cell.innerHTML = `
    <img src="${photo.src}" alt="${photo.title}" loading="lazy">
    <div class="photo-num">#${photo.id}</div>
    <div class="photo-label">${photo.title}</div>
  `;
  grid.appendChild(cell);
});

// Render question cards
QUESTIONS.forEach((q, i) => {
  const card = document.getElementById(`q-card-${i + 1}`);
  const promptsHTML = q.prompts.map(p => `<li>${p}</li>`).join('');
  card.innerHTML = `
    <div class="kit-page-label">Page ${q.pageNum} of 6</div>
    <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);margin-bottom:12px;">${q.label}</div>
    <div class="q-card-question">${q.text}</div>
    <div class="q-card-hint">${q.hint}</div>
    <div class="q-card-insight">${q.insight}</div>
    <h3>Conversation Prompts</h3>
    <p style="font-size:13px;color:var(--muted);margin-bottom:12px;">Read these aloud after participants share their picks:</p>
    <ol class="q-card-prompts">${promptsHTML}</ol>
  `;
});
</script>

</body>
</html>
```

- [ ] **Step 2: Verify the session kit page loads and looks correct**

Run: `open http://localhost:8787/session-kit.html`

Expected:
- Header with "Print / Save as PDF" button and "Back to Uncover" link
- Page 1: Facilitator cheat sheet with session flow and tips
- Page 2: Photo grid with all 30 photos in a 5×6 grid, numbered
- Pages 3–6: One question card each with question, hint, IFS insight, and 3 prompts
- "Print / Save as PDF" button triggers the browser print dialog

- [ ] **Step 3: Verify print layout**

Click "Print / Save as PDF" button, or use Cmd+P.

Expected:
- Header and action buttons are hidden in print
- Each `.kit-page` starts on a new page
- Photo grid fits on one page
- Question cards are readable with large text

- [ ] **Step 4: Verify the "Download Session Kit" link on the landing page works**

Go to `http://localhost:8787` and click "Download Session Kit" button.

Expected: Opens `/session-kit.html` in a new tab.

- [ ] **Step 5: Commit**

```bash
git add public/session-kit.html
git commit -m "feat: add printable session kit for facilitators (6-page PDF)"
```

---

### Task 5: Final Verification

**Files:** No changes — verification only.

- [ ] **Step 1: Full app walkthrough**

Go to `http://localhost:8787`. Verify:
1. Landing page loads with facilitator framing — no mode toggle
2. "Try It Yourself" button starts the question flow
3. All 4 questions work (pick 3 photos each)
4. Transitions display between questions
5. Summary screen renders with all picks and prompts
6. Email send form still present on summary
7. "Start over" returns to landing page
8. No console errors throughout

- [ ] **Step 2: Test session kit**

Go to `http://localhost:8787/session-kit.html`. Verify:
1. All 30 photos load in the grid
2. All 4 question cards render correctly
3. Print dialog shows clean pages
4. "Back to Uncover" link works

- [ ] **Step 3: Test responsive layout**

Test the landing page at three widths:
- 375px (phone): hero text readable, session steps stack vertically, parts grid stacks to 1 column
- 768px (iPad): parts grid stays 2 columns, everything comfortable
- 1024px (iPad Pro): full layout, nothing overflows

- [ ] **Step 4: Test session kit responsive/print**

Test session-kit.html:
- On mobile: photo grid may be small but should not overflow
- Print preview: each page breaks cleanly

- [ ] **Step 5: Commit any fixes if needed, then done**

If any issues found in steps 1–4, fix them and commit:
```bash
git add -A
git commit -m "fix: polish responsive layout and print styles"
```
