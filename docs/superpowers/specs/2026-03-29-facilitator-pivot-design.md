# Uncover — Facilitator Pivot Design Spec

**Date:** 2026-03-29
**Status:** Approved
**Scope:** Reframe Uncover as a facilitator tool for international student conversations. Rewrite landing page, remove General mode, add printable session kit.

---

## Context

Uncover is a visual conversation tool where users browse 30 photos and pick 3 per question across 4 IFS-inspired layers. The core mechanic works, but the current landing page speaks to individual users doing self-reflection. The real value is for **facilitators** (campus ministers, international student advisors, counselors, retreat leaders) who need a tool to unlock deep conversations with international students.

### Competitive Reference

Soularium by Cru is the closest existing product — same photo-picking mechanic, 20 years of use on campuses. Uncover's advantages: free, digital, secular/IFS-based (usable in official university contexts where gospel framing wouldn't fly), and specifically designed for the international student experience.

### What's NOT Changing

- The solo question flow (photo grid, pick 3, transitions, summary)
- The 30-photo set
- Email results feature
- Backend (worker.ts, D1 database, analytics)
- Summary screen and IFS insights

---

## Design

### 1. Remove General Mode

Delete all General mode code and copy:

- Delete the `COPY.general` object from the JS
- Delete the mode toggle UI ("International student / Everyone")
- Delete the `applyMode()` function and `?mode=` URL param logic
- Hardcode `COPY.intl` as the only copy source (then flatten — no need for a nested `intl` key)
- Remove mode toggle event listeners and mode persistence in sessionStorage

### 2. Rewrite Landing Page

Replace the current landing page sections with 5 facilitator-focused sections:

**Section 1 — Hero**
- Headline: "A 20-minute exercise that gets international students talking about what they actually carry."
- Subtitle: "30 photographs. 4 questions. A framework for seeing the layers beneath the surface."
- Two CTAs: "Try It Yourself" (starts the solo flow) and "Download Session Kit" (opens session-kit.html)
- Label: "FOR FACILITATORS" above headline

**Section 2 — What Happens in a Session**
- Heading: "Each person browses 30 photos and picks 3 per question"
- Brief IFS explanation (1 sentence)
- 2×2 grid showing all 4 questions with their layer labels (Q1 The Surface, Q2 What You Carry, Q3 How You Cope, Q4 What You Need)
- Note: "After each question, the facilitator uses built-in conversation prompts to guide the group discussion."

**Section 3 — Running a Session**
- Heading: "Everything you need to facilitate"
- 4 numbered steps:
  1. Set up (2 min) — group of 4–8, everyone opens on phone or use printed kit
  2. Pick photos (10 min) — read question aloud, 2 min to browse and pick, silence is fine
  3. Share & discuss (10–15 min) — invite 2–3 to share, use built-in prompts, don't force anyone
  4. Close (5 min) — everyone sees summary, ask "What surprised you?", one-word check-out

**Section 4 — Who It's For**
- Heading: "Built for anyone who works with international students"
- Body: "Uncover gives you a way to talk about inner experience without needing the vocabulary for it. Especially powerful for people carrying the weight of distance — from home, from language, from the version of themselves they left behind."
- Tags: Orientation programs, Campus ministry, ISSS offices, Small groups, Retreats, Counselors, Cross-cultural teams

**Section 5 — Bottom CTA**
- Heading: "Ready to run a session?"
- Subtitle: "Free. No sign-up. Takes 20–30 minutes."
- Two CTAs: "Try It Yourself First" + "Download Session Kit (PDF)"

**Removed from current landing page:**
- Photo grid preview in hero (decorative, not functional)
- "I'm ready — let's begin" early CTA (premature — appears before explanation)
- "Anyone ready to go below the surface" section (vague, general-mode copy)
- Mode toggle everywhere

**Also update:**
- og:title → "Uncover — A Conversation Tool for International Student Groups"
- og:description → "A 20-minute visual exercise that helps international students name what they carry between worlds. Free. No sign-up."

### 3. Add Printable Session Kit

New file: `public/session-kit.html`

A standalone HTML page with `@media print` CSS, designed to print cleanly as a 6-page PDF.

**Page 1 — Facilitator Cheat Sheet**
- What Uncover is (2 sentences)
- Session format: 20–30 min, groups of 4–8
- Step-by-step flow (same 4 steps as landing page)
- Tips:
  - Silence after a question is normal — don't rush to fill it
  - If someone gets emotional, acknowledge it simply ("Thank you for sharing that") and don't try to fix it
  - Never force anyone to share — "pass" is always okay
  - Q2 (What You Carry) is the heaviest question — be ready for it
- Closing: Ask "What surprised you?" or do a one-word check-out

**Page 2 — Photo Grid**
- All 30 photos in a 5×6 numbered grid
- Each cell: photo thumbnail + number + title
- Sized to fit one printed page
- Usage: print and lay on a table, or project on screen. Participants call out numbers.

**Pages 3–6 — Question Cards (one per page)**
Each card contains:
- Question number and layer label (e.g., "Question Two · Layer 2 · What You Carry")
- Question text in large type
- Hint text (e.g., "Pick 3 images that feel like the stuff you don't talk about.")
- IFS insight paragraph
- 3 conversation prompts (numbered, readable from across a table)

**Implementation:**
- Pure static HTML with inline CSS
- `@media print` rules for page breaks, margins, hiding non-print elements
- A "Print / Save as PDF" button at the top that calls `window.print()`
- A "Back to Uncover" link
- No backend changes needed

**The "Download Session Kit" button on the landing page opens `/session-kit.html` in a new tab.**

---

## File Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `public/index.html` | Modify | Rewrite landing page, remove General mode, simplify JS |
| `public/session-kit.html` | Create | Printable 6-page facilitator kit |

No backend changes. No new dependencies. No database changes.

---

## Implementation Order

1. Remove General mode (code cleanup)
2. Rewrite landing page sections
3. Update meta tags
4. Build session-kit.html
5. Verify: app loads, solo flow works, session kit prints cleanly
6. Test responsive layout at 375px, 768px, 1024px
