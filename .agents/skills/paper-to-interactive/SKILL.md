---
name: paper-to-interactive
description: Turn a research paper, notebook, or project into an interactive rendition on artemiui.github.io — a standalone data-visualization page in public/<slug>/index.html, embedded in an MDX article via InteractiveDiagram. Use when asked to "make a paper interactive", "turn this project into a page", "visualize this notebook", or to add a paper to the site with charts.
---

# Paper → Interactive Rendition

A paper is an argument that happens to contain data. A rendition is that same argument where the
reader can reach into the data. The job is not to decorate the paper with charts — it is to find
the two or three claims the paper actually rests on and make those claims inspectable.

## Architecture (how this site does it)

The site already has the pattern. Follow it; do not invent a new one.

| Piece | Path | Role |
| :--- | :--- | :--- |
| Interactive page | `public/<slug>/index.html` | One self-contained HTML file. D3 from CDN, data inlined. |
| Article | `content/posts/articleN.mdx` | Frontmatter. Prose too, in embed mode only. |
| Full-article host | `components/InteractivePost.tsx` | Mounts the rendition **as** the article body. Auto-heights, syncs theme. |
| Embed component | `components/InteractiveDiagram.tsx` | Boxed iframe with reset + fullscreen, for a figure inside normal prose. |
| Feed | `lib/feedItems.ts` | MDX posts are picked up automatically. Only edit this to **remove** a now-redundant external link. |

Precedents to read before starting: `public/ds102-phytochemical/index.html` (full article),
`public/series-convergence/index.html`, `public/philosoc/index.html`.

### Two modes — pick one up front

**Full-article mode** (`layout: "interactive"`). The rendition *is* the paper: it owns the title
block, the prose, the figures, the limitations and the references. The route renders a back link
and nothing else — no header, no table of contents, no prose wrapper — so nothing is duplicated.
Use this whenever the figures and the argument are inseparable, which for a paper is almost always.

**Embed mode.** Normal MDX prose with `<InteractiveDiagram src="/<slug>/index.html" />` dropped in
as one figure. Use this when the interactive piece is an illustration inside a longer written
argument, not the argument itself.

The host↔rendition contract in full-article mode is two messages:

| Message | Direction | Purpose |
| :--- | :--- | :--- |
| `{type:"rendition-height", height}` | child → host | Host sizes the frame so the page scrolls as one document |
| `{type:"rendition-theme", theme}` | child → host | Rendition's own theme control moves the site with it |
| `{theme}` | host → child | Site's theme toggle reaches the rendition immediately |

The child must ship a `ResizeObserver` on `documentElement` posting its `scrollHeight`, plus
`load` and a couple of delayed calls to catch late font and chart layout. Verify it: build a
throwaway harness page with an iframe and a message listener, screenshot it, and confirm the
height messages arrive and the number is plausible. Delete the harness afterwards — do not leave
it in `public/`.

## Procedure

### 1. Read the source material completely

Read the paper end to end before touching a chart. PDFs: use the Read tool with `pages`. Notebooks:
read the `.ipynb` or its exported PDF. Find the raw data — a rendition built on numbers transcribed
from a figure is not a rendition, it is an illustration.

Write down, explicitly:
- the **claims** the paper makes (usually 3–5)
- which claim each figure supports
- which figures are load-bearing and which are the author thinking out loud

Skip the second kind. A 37-page notebook does not become a 37-section page.

### 2. Recompute from the raw data — never transcribe

**This is the rule that matters most.** Every number on the page must come from the dataset, not
from reading a value off a rendered chart in the PDF.

Write an extraction script in the scratchpad that loads the source data and emits one compact JSON
blob (aim for < 100 KB — aggregate, don't ship raw rows):

```python
# scratchpad/extract.py — run with: python -P scratchpad/extract.py
out = {}
out["meta"] = {...}        # row counts, global stats — these verify against the paper
out["<entity>"] = [...]    # per-entity summary for the main scatter/bars
out["<grouping>"] = [...]  # precomputed box stats, histogram bins, correlation cells
```

Precompute aggregates server-side: box-plot quartiles, histogram bins, correlation matrices,
pivot tables. Never ship 100k rows to the browser to compute a median.

**Verify the extraction against the paper.** Row counts, column counts, means, and reported
correlations must match what the paper states. If they don't, the extraction is wrong — find out
why before continuing. This check is how you know the rendition is faithful.

**If a number is not in the data and not printed in the paper, it does not go on the page.**
Values eyeballed off a bar chart in a PDF are fabrication. Drop the series.

### 2b. Write in Artem's voice, not a house style

The rendition carries the paper's prose, so it has to sound like him. Pull the voice from the
source document itself — the notebook, the PDF, the original write-up — not from a generic
academic register.

What that voice does: first person throughout, "we" for the analysis steps and "I" for the
asides. Plain about limitations. Occasionally enthusiastic in a way a journal would edit out
("Totally unnecessary, but I love this formula, so here it is", "A future DS-103 project, I
presume!"). Names the people who helped, specifically. States what the project *isn't* early
("This remains a relatively simple project") rather than overselling.

Never flatten this into neutral paper-speak. If a sentence could appear in any paper, it is
wrong.

### 3. Choose forms before colors

Load the `dataviz` skill and follow its procedure. In short:

- **Form follows the data's job.** Magnitude → bars. Identity → categorical color. Polarity →
  diverging. A single headline number → a stat tile, not a chart.
- **One axis.** Never dual-axis.
- **Validate the palette with the script**, against *this site's* surfaces, not the skill's
  defaults: light `#ffffff`, dark `#09090b`.
- Single series → no legend box. Two or more → legend always, plus direct labels on the few marks
  that carry the argument.

A reliable section set for an empirical paper:

| Section | Form | Interaction |
| :--- | :--- | :--- |
| Key figures | stat tiles | none |
| The main trade-off | scatter with reference lines + quadrant wash | hover profile, click to pin, axis-metric toggle |
| Distribution by group | horizontal box plot | re-sort (median / spread / n) |
| Full matrix | heatmap | hover readout, column re-sort |
| What correlates | diverging bars | filter to one target |
| Model performance | grouped bars | metric toggle |
| Underlying distribution | histogram with median marker | hover bin |
| Reference data | searchable table | live filter |

### 3b. The page's own design — load the design skills

Before writing the chrome around the charts, load **`unslop`**, **`impeccable`** and
**`emil-design-eng`**. The house look for these renditions is the scientific paper: quiet chrome,
one reading column, figures as plates.

Bans that these pages have already been caught breaking:

- **No eyebrow or kicker above a heading.** The heading carries its own weight.
- **No stat-tile hero** (big number, small label, accent). A paper states its dataset as a ruled
  list at body size, with mono numerals.
- **No cards.** Figures are plates separated by hairline rules, not bordered rounded boxes. Nested
  cards are always wrong.
- **No coloured `border-left` above 1px** on callouts. An aside is a hairline rule and an indent.
- **No uppercase tracked labels.** Sentence case everywhere, including table headers and controls.
- **No badge/pill rows.** They are the clearest AI tell on a page like this.
- **Monospace only for data** — numerals, axis ticks, identifiers, figure numbers. Not as a
  costume for "technical".
- Headings, labels, buttons and captions end **without** a period.

Positive requirements:

- Body measure 65–75ch. Figures break out wider but share the text column's **left edge**, so the
  relationship between prose and plate is unambiguous.
- Theme the browser surfaces the design otherwise forgets: `::selection`, `caret-color`,
  `:focus-visible`, scrollbars, `text-underline-offset`, `tabular-nums`. This is the cheapest
  signal that a page was built rather than assembled.
- Motion is interaction feedback only: `button:active { transform: scale(0.97) }`, named
  transition properties (never `all`), one `--ease-out` curve, durations under 200ms. A paper
  does not need an entrance animation; do not add one.
- Signature detail: `Figure N` in mono above a hairline rule, and section numbers that the nav
  actually cross-references. Section numbers are allowed *here* — in a paper the sequence is
  information — but nowhere they would be decoration.

### 4. Write the page

Single `public/<slug>/index.html`. Required structure:

- **Theme variables** on `:root` and `html.dark` — never hardcode a hex in chart code. Read them
  at render time with `getComputedStyle(...).getPropertyValue(name)` so a theme switch repaints
  correctly.
- **Theme sync with the site** — copy this block verbatim; the iframe is same-origin, so
  `localStorage.theme` is shared with the Next.js app:

```js
function initTheme() {
  try {
    const saved = localStorage.getItem('theme');
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', saved === 'dark' || (!saved && prefers));
  } catch (e) {}
}
initTheme();
window.addEventListener('storage', e => { if (e.key === 'theme') { initTheme(); renderAll(); } });
window.addEventListener('message', e => {
  if (e.data && e.data.theme) {
    document.documentElement.classList.toggle('dark', e.data.theme === 'dark');
    renderAll();
  }
});
```

- **A single `renderAll()`** that redraws everything. Theme changes, control changes, and a
  debounced `resize` all call it. Charts use `viewBox` + `preserveAspectRatio` so they scale.
- **Typography matched to the site**: Inter (sans) + Space Mono (mono), loaded from Google Fonts.
- **Prose between the figures.** Each figure gets a lede above it explaining what it shows, and a
  `Reading it:` note below explaining *how to read it and what is suspicious about it*. The notes
  are the paper's voice; without them the page is a dashboard, not a rendition.
- **A `Data tables` toggle** in the top bar revealing a `<table>` under each figure. This is the
  accessibility fallback and the honesty check in one.
- **A limitations section.** Non-negotiable. A rendition that only shows what worked is marketing.

Keep the data inline. Build the file from a template with a `__DATA__` placeholder and substitute
the JSON in a build step, so the template stays editable:

```python
tpl = open('scratchpad/template.html', encoding='utf-8').read()
data = open('scratchpad/data.json', encoding='utf-8').read()
open('public/<slug>/index.html', 'w', encoding='utf-8').write(tpl.replace('__DATA__', data))
```

### 5. Verify — render it and look at it

Do not skip this. The palette validator checks color, not layout.

```bash
# syntax-check the page's JS
python -P -c "import re;open('scratchpad/check.js','w',encoding='utf-8').write('\n'.join(re.findall(r'<script>(.*?)</script>',open('public/<slug>/index.html',encoding='utf-8').read(),re.S)))"
node --check scratchpad/check.js
```

Then screenshot it in **both themes** with headless Edge/Chrome and actually read the images:

```powershell
$exe = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$url = "file:///C:/Users/Art/Documents/artemiui.github.io/public/<slug>/index.html"
# dark (or whatever the OS prefers)
& $exe --headless=new --disable-gpu --virtual-time-budget=10000 --window-size=1200,7200 `
  --screenshot="shots\dark.png" --user-data-dir="shots\p1" $url
# force light
& $exe --headless=new --disable-gpu --blink-settings=preferredColorScheme=1 `
  --virtual-time-budget=10000 --window-size=1200,3000 `
  --screenshot="shots\light.png" --user-data-dir="shots\p2" $url
```

Crop with PIL to inspect individual figures at full resolution. Look for: axis titles colliding
with tick labels, a sequential ramp compressed by outliers (clamp the domain to the 2nd–98th
percentile), direct labels overlapping marks, and ramps whose light/dark direction contradicts the
caption.

The window height caps around 8000px; past that the screenshot silently fails to write.

### 6. Write the article

`content/posts/articleN.mdx` — next number in sequence.

**Full-article mode** — frontmatter only; the body is never rendered, so keep just a note saying
where the content actually lives:

```yaml
---
title: "Full paper title"
date: "YYYY-MM-DD"          # the paper's date, not today's
category: "Papers"          # or "Research" — see lib/mdx.ts for the union
tags: ["Computational"]     # drives tag filtering for Papers/Research in FeedSection
description: "One sentence. Shows in the feed."
layout: "interactive"
interactive: "/<slug>/index.html"
---
```

**Embed mode** — ordinary frontmatter plus prose, with the figure dropped in:

```mdx
<InteractiveDiagram src="/<slug>/index.html" title="…" />
```

Math uses `$…$` and `$$…$$`. In embed mode remark-math and KaTeX come from
`app/blog/[slug]/page.tsx`; in full-article mode the rendition loads KaTeX itself from the CDN and
calls `renderMathInElement` on `DOMContentLoaded`.

If the paper already exists in `lib/feedItems.ts` as an external link, **remove that entry** — the
MDX post supersedes it and the feed would otherwise show it twice.

### 7. Build

```bash
npm run build
```

Static generation must succeed. Confirm the new slug appears in the generated route list.

## Source material hygiene

Raw research working sets — datasets, notebooks, PDFs, docking outputs — live in a **gitignored**
directory (`.ds102/` is the precedent) and never get committed. Only two things are tracked: the
generated `public/<slug>/index.html` and the MDX article. Check `git status --porcelain` after
moving source material in to confirm nothing leaked.

Keep extraction scripts in the scratchpad, not in the repo, unless the extraction needs to be
re-run later — in which case put it beside the raw data inside the gitignored directory.

## Anti-patterns

- **Transcribing numbers from a rendered figure.** If you cannot recompute it, cut it.
- **Shipping the whole dataset to the browser.** Aggregate first.
- **One chart per notebook cell.** The notebook's exploratory detours are not the paper's argument.
- **Charts without prose.** A figure with no "what to look for" note is a dashboard.
- **Hiding the weak result.** The $R^2 = 0.999$ that turned out to be leakage is more interesting
  than the number itself; say so on the page.
- **Hardcoded colors in chart code.** They break the theme toggle silently.
- **A legend for a single series.** The title names it.
- **Re-deriving a theme by inverting light mode.** Dark steps are chosen and validated separately.
- **A sequential ramp over the raw min/max.** Two rare extremes compress everything else into one
  flat band. Clamp the domain to the 2nd–98th percentile.
- **Four-decimal axis ticks.** Precision belongs on the data labels, not the axis.
- **Captions whose light/dark wording contradicts the ramp.** "Darker means stronger" is false in
  one of the two themes; describe the ramp by its endpoints instead.

## Worked example

`public/ds102-phytochemical/index.html` + `content/posts/article15.mdx` — a 37-page docking
notebook reduced to seven interactive sections from a 7,619-row dataset, with the extraction
verified against the paper's reported row counts, means, and correlation values, and two
model-comparison series dropped outright because their numbers existed only as bar heights in a PDF.
