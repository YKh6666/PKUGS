import { SectionIntro } from "@/components/SectionIntro";
import {
  benchmarkMethodRows,
  benchmarkScenes,
  type BenchmarkMetricKey,
  type BenchmarkMeasuredSceneKey,
  type BenchmarkSceneKey,
} from "@/lib/site-content";

const benchmarkMetrics: Array<{
  key: BenchmarkMetricKey;
  label: string;
  direction: "desc" | "asc";
  className: string;
}> = [
  { key: "psnr", label: "PSNR", direction: "desc", className: "benchmark-metric-col" },
  { key: "ssim", label: "SSIM", direction: "desc", className: "benchmark-metric-col" },
  { key: "lpips", label: "LPIPS", direction: "asc", className: "benchmark-metric-col" },
  { key: "sizeMb", label: "Size [MB]", direction: "asc", className: "benchmark-size-col" },
];

const topThreeByColumn = new Map<string, Map<string, 1 | 2 | 3>>();
const measuredScenes = benchmarkScenes.filter(
  (scene): scene is { key: BenchmarkMeasuredSceneKey; label: string } => scene.key !== "average",
);

for (const scene of measuredScenes) {
  for (const metric of benchmarkMetrics) {
    const placements = new Map<string, 1 | 2 | 3>();
    const sortedRows = [...benchmarkMethodRows].sort((left, right) => {
      const leftValue = left.scenes[scene.key][metric.key];
      const rightValue = right.scenes[scene.key][metric.key];

      if (leftValue === null) return 1;
      if (rightValue === null) return -1;

      return metric.direction === "desc" ? rightValue - leftValue : leftValue - rightValue;
    });

    sortedRows.slice(0, 3).forEach((row, index) => {
      placements.set(row.method, (index + 1) as 1 | 2 | 3);
    });

    topThreeByColumn.set(`${scene.key}:${metric.key}`, placements);
  }
}

const rankPlacements = new Map<string, 1 | 2 | 3>();

[...benchmarkMethodRows]
  .sort((left, right) => left.rank - right.rank)
  .slice(0, 3)
  .forEach((row, index) => {
    rankPlacements.set(row.method, (index + 1) as 1 | 2 | 3);
  });

function formatMetric(value: number | null) {
  return value === null ? "" : value.toFixed(3);
}

function getHighlightClass(method: string, sceneKey: BenchmarkSceneKey, metricKey: BenchmarkMetricKey) {
  if (sceneKey === "average") return "";

  const placement = topThreeByColumn.get(`${sceneKey}:${metricKey}`)?.get(method);

  if (placement === 1) return "benchmark-top-1";
  if (placement === 2) return "benchmark-top-2";
  if (placement === 3) return "benchmark-top-3";
  return "";
}

function getRankHighlightClass(method: string) {
  const placement = rankPlacements.get(method);

  if (placement === 1) return "benchmark-top-1";
  if (placement === 2) return "benchmark-top-2";
  if (placement === 3) return "benchmark-top-3";
  return "";
}

function formatMethodLabel(method: string) {
  return method.replace(/\s*\[[^\]]+\]\s*$/, "");
}

export function BenchmarkSection() {
  return (
    <section id="benchmark" className="section-space">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <SectionIntro
          eyebrow="Benchmark"
          title="Benchmark Summary"
          description="A web-rendered quantitative comparison table, organized like a paper benchmark matrix across scenes and metrics rather than a dashboard."
        />

        <div className="mt-8">
          <p className="benchmark-caption">
            Table 3: Quantitative comparison in terms of PSNR, SSIM, LPIPS, and model size.
            Rank is computed by averaging the per-scene ranks across PSNR, SSIM, LPIPS, and model
            size, where higher PSNR/SSIM and lower LPIPS/size are preferred.
          </p>

          <div className="benchmark-table-wrap mt-4 overflow-x-auto">
            <table className="benchmark-table min-w-[1640px]">
              <thead>
                <tr>
                  <th rowSpan={2} className="benchmark-method-head">
                    Method
                  </th>
                  <th rowSpan={2} className="benchmark-rank-head benchmark-group-divider">
                    Rank
                  </th>
                  {benchmarkScenes.map((scene, sceneIndex) => (
                    <th
                      key={scene.key}
                      colSpan={benchmarkMetrics.length}
                      className={[
                        "benchmark-scene-head",
                        sceneIndex > 0 ? "benchmark-group-divider" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {scene.label}
                    </th>
                  ))}
                </tr>
                <tr>
                  {benchmarkScenes.map((scene, sceneIndex) =>
                    benchmarkMetrics.map((metric, metricIndex) => (
                      <th
                        key={`${scene.key}-${metric.key}`}
                        className={[
                          "benchmark-metric-head",
                          metric.className,
                          sceneIndex > 0 && metricIndex === 0 ? "benchmark-group-divider" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {metric.label}
                      </th>
                    )),
                  )}
                </tr>
              </thead>

              <tbody>
                {benchmarkMethodRows.map((row) => (
                  <tr key={row.method}>
                    <th scope="row" className="benchmark-method-cell">
                      <span className="benchmark-method-text">{formatMethodLabel(row.method)}</span>
                    </th>

                    <td
                      className={[
                        "benchmark-rank-cell",
                        "benchmark-group-divider",
                        getRankHighlightClass(row.method),
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {row.rank.toFixed(3)}
                    </td>

                    {benchmarkScenes.map((scene, sceneIndex) =>
                      benchmarkMetrics.map((metric, metricIndex) => (
                        <td
                          key={`${row.method}-${scene.key}-${metric.key}`}
                          className={[
                            "benchmark-value-cell",
                            metric.className,
                            sceneIndex > 0 && metricIndex === 0 ? "benchmark-group-divider" : "",
                            getHighlightClass(row.method, scene.key, metric.key),
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          {formatMetric(row.scenes[scene.key]?.[metric.key] ?? null)}
                        </td>
                      )),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
