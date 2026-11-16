import { ArrowUpRight } from "lucide-react";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const USER = "artemiui";
const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;
const LEFT = 28;
const TOP = 16;

const levelClass = [
  "fill-zinc-200/70 dark:fill-zinc-800/80",
  "fill-[#f7a1a4] dark:fill-[#6a1a1f]",
  "fill-[#ee5258] dark:fill-[#b0232b]",
  "fill-[#d01f27] dark:fill-[#ea3a42]",
  "fill-[#8c0a10] dark:fill-[#ff8a8f]",
];

const fmtDate = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { timeZone: "UTC", ...opts });

async function getContributions(): Promise<Day[] | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { contributions?: Day[] };
    return data.contributions?.length ? data.contributions : null;
  } catch {
    return null;
  }
}

function stats(days: Day[]) {
  let longest = 0;
  let run = 0;
  let busiest = days[0];
  let active = 0;
  for (const d of days) {
    if (d.count > 0) {
      active++;
      run++;
      longest = Math.max(longest, run);
    } else run = 0;
    if (d.count > busiest.count) busiest = d;
  }
  const total = days.reduce((n, d) => n + d.count, 0);
  return { total, longest, active, busiest };
}

export default async function Heatmap() {
  const days = await getContributions();
  if (!days) return null;

  // Pad the first week so every column starts on Sunday.
  const firstDow = new Date(days[0].date + "T00:00:00Z").getUTCDay();
  const cells: (Day | null)[] = [...Array(firstDow).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const months: { x: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, w) => {
    const first = week.find(Boolean);
    if (!first) return;
    const m = new Date(first.date + "T00:00:00Z").getUTCMonth();
    if (m !== lastMonth) {
      if (w < weeks.length - 2) months.push({ x: LEFT + w * STEP, label: fmtDate(first.date, { month: "short" }) });
      lastMonth = m;
    }
  });

  const width = LEFT + weeks.length * STEP - GAP;
  const height = TOP + 7 * STEP - GAP;
  const s = stats(days);

  return (
    <section aria-labelledby="gh-heading" className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <p id="gh-heading" className="text-5xl font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
            {s.total.toLocaleString("en-US")}
          </p>
          <p className="mt-1 text-sm text-zinc-500">contributions on GitHub in the last year</p>
        </div>
        <dl className="flex gap-8 font-mono text-xs tabular-nums">
          {[
            ["Longest streak", `${s.longest} days`],
            ["Active days", `${s.active}`],
            ["Busiest day", `${fmtDate(s.busiest.date, { month: "short", day: "numeric" })} · ${s.busiest.count}`],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-zinc-500">{label}</dt>
              <dd className="mt-1 text-zinc-900 dark:text-zinc-100">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="-mx-6 overflow-x-auto px-6 [direction:rtl] sm:mx-0 sm:px-0">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          className="block min-w-[640px] max-w-full [direction:ltr] sm:h-auto sm:w-full"
          role="img"
          aria-label={`${s.total} GitHub contributions in the last year`}
        >
          {months.map((m) => (
            <text key={m.x} x={m.x} y={9} className="fill-zinc-500 font-mono text-[9px]">
              {m.label}
            </text>
          ))}
          {["Mon", "Wed", "Fri"].map((d, i) => (
            <text key={d} x={0} y={TOP + (1 + i * 2) * STEP + CELL - 1} className="fill-zinc-500 font-mono text-[9px]">
              {d}
            </text>
          ))}
          {weeks.map((week, w) =>
            week.map((day, d) =>
              day ? (
                <rect
                  key={day.date}
                  x={LEFT + w * STEP}
                  y={TOP + d * STEP}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  className={levelClass[day.level]}
                >
                  <title>{`${day.count} contribution${day.count === 1 ? "" : "s"} on ${fmtDate(day.date, { month: "short", day: "numeric", year: "numeric" })}`}</title>
                </rect>
              ) : null,
            ),
          )}
        </svg>
      </div>

      <div className="flex items-center justify-between gap-4 font-mono text-xs text-zinc-500">
        <a
          href={`https://github.com/${USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded transition-colors duration-150 hover:text-zinc-900 dark:hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        >
          github.com/{USER}
          <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
        </a>
        <span className="flex items-center gap-1.5" aria-hidden="true">
          Less
          <svg width={5 * STEP - GAP} height={CELL}>
            {levelClass.map((cls, i) => (
              <rect key={i} x={i * STEP} width={CELL} height={CELL} rx={2} className={cls} />
            ))}
          </svg>
          More
        </span>
      </div>
    </section>
  );
}
