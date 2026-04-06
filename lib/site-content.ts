export type CtaLink = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
};

export type HeroContent = {
  title: string;
  subtitle: string;
  keywords: string[];
  ctas: CtaLink[];
  videoSources: string[];
  scrollLabel: string;
  readability: {
    globalOverlayOpacity: number;
    localOverlayOpacity: number;
    localOverlayWidth: string;
    localOverlayHeight: string;
    localOverlayBlur: number;
    localOverlayGradientStops: {
      dense: string;
      medium: string;
      soft: string;
      fade: string;
    };
    titleTextShadow: string;
    subtitleTextShadow: string;
    bodyTextShadow: string;
  };
  timing: {
    displayDurationMs: number;
    transitionDurationMs: number;
    decodeWarmupMs: number;
    fallbackDelayMs: number;
    introDelayMs: number;
    scrollHintDelayMs: number;
    fadeDurationMs: number;
    introTranslateY: number;
  };
};

export type StatItem = {
  title: string;
  icon: "map" | "frames" | "route" | "coverage";
  value: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  icon: "coverage" | "uav" | "diversity" | "benchmark";
};

export type SceneItem = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  alt: string;
  description: string;
};

export type PipelineStep = {
  title: string;
  description: string;
};

export type BenchmarkItem = {
  title: string;
  description: string;
};

export type BenchmarkSceneKey = "library" | "velodrome" | "forum" | "average";

export type BenchmarkMeasuredSceneKey = Exclude<BenchmarkSceneKey, "average">;

export type BenchmarkMetricKey = "psnr" | "ssim" | "lpips" | "sizeMb";

export type BenchmarkSceneMetrics = {
  psnr: number | null;
  ssim: number | null;
  lpips: number | null;
  sizeMb: number | null;
};

export type BenchmarkScene = {
  key: BenchmarkSceneKey;
  label: string;
};

export type BenchmarkMethodRow = {
  method: string;
  href?: string;
  rank: number;
  scenes: Record<BenchmarkMeasuredSceneKey, BenchmarkSceneMetrics> &
    Partial<Record<"average", BenchmarkSceneMetrics>>;
};

export type ResourceDownloadRow = {
  category: string;
  rawVideosHref: string;
  colmapHref?: string;
  reconstructionHref?: string;
};

export type FooterContent = {
  authors: string;
  affiliations: string;
  contact: string;
  copyright: string;
};

// Local sources used for this implementation:
// - /Users/y/PKUGS/video/DJI_20260109164429_0032_D.MP4
// - /Users/y/PKUGS/video/DJI_20260110170407_0049_D.MP4
// - /Users/y/PKUGS/video/DJI_20260207104247_0261_D.MP4
// - /Users/y/PKUGS/video/DJI_20260205175453_0152_D.MP4 (30s-37s)
// - /Users/y/PKUGS/video/DJI_20260203102803_0023_D.MP4 (10s-17s)
// - /Users/y/PKUGS/video/DJI_20260205122615_0126_D.MP4 (6s-13s)
// - /Users/y/PKUGS/video/DJI_20260203170451_0049_D.MP4 (116s-123s)
// - /Users/y/PKUGS/video/DJI_20260207162803_0014_D.MP4 (46s-53s)
// - /Users/y/PKUGS/video/DJI_20260104115702_0059_D.MP4 (6s-13s)
// - /Users/y/PKUGS/video/DJI_20260117163634_0309_D.MP4 (97s-104s)
// - /Users/y/PKUGS/video/DJI_20260110172830_0053_D.MP4 (2s-9s)
// - /Users/y/PKUGS/video/DJI_20260112161145_0146_D.MP4 (8s-15s)
// - /Users/y/PKUGS/video/DJI_20260115165443_0244_D.MP4 (160s-167s)
// - /Users/y/PKUGS/photo/show/*.png
// Formal site assets should be referenced from:
// - public/videos/
// - public/images/show/
export const heroContent: HeroContent = {
  title: "PKU-GS",
  subtitle:
    "A Large-Scale UAV-Based Real-World Dataset and Benchmark for 3D Gaussian Splatting Compression",
  keywords: ["Large-Scale", "UAV Capture", "Compression Benchmark"],
  ctas: [
    { label: "Explore Scenes", href: "#scenes", variant: "primary" },
    { label: "Benchmark", href: "#benchmark", variant: "secondary" },
    { label: "Download", href: "#download", variant: "secondary" },
  ],
  videoSources: [
    "/videos/dji_20260109164429_0032_d-1080p.mp4",
    "/videos/dji_20260110170407_0049_d-1080p.mp4",
    "/videos/dji_20260207104247_0261_d-1080p.mp4",
    "/videos/dji_20260205175453_0152_d-30-37-1080p.mp4",
    "/videos/dji_20260203102803_0023_d-10-17-1080p.mp4",
    "/videos/dji_20260205122615_0126_d-6-13-1080p.mp4",
    "/videos/dji_20260203170451_0049_d-116-123-1080p.mp4",
    "/videos/dji_20260207162803_0014_d-46-53-1080p.mp4",
    "/videos/dji_20260104115702_0059_d-6-13-1080p.mp4",
    "/videos/dji_20260117163634_0309_d-97-104-1080p.mp4",
    "/videos/dji_20260110172830_0053_d-2-9-1080p.mp4",
    "/videos/dji_20260112161145_0146_d-8-15-1080p.mp4",
    "/videos/dji_20260115165443_0244_d-160-167-1080p.mp4",
  ],
  scrollLabel: "Scroll to continue",
  readability: {
    globalOverlayOpacity: 0.2,
    localOverlayOpacity: 0.17,
    localOverlayWidth: "min(88vw, 1240px)",
    localOverlayHeight: "100%",
    localOverlayBlur: 10,
    localOverlayGradientStops: {
      dense: "18%",
      medium: "38%",
      soft: "62%",
      fade: "82%",
    },
    titleTextShadow:
      "0 3px 18px rgba(6, 12, 20, 0.18), 0 1px 7px rgba(6, 12, 20, 0.11)",
    subtitleTextShadow:
      "0 2px 14px rgba(6, 12, 20, 0.15), 0 1px 6px rgba(6, 12, 20, 0.09)",
    bodyTextShadow: "0 1px 14px rgba(6, 12, 20, 0.14)",
  },
  timing: {
    displayDurationMs: 7000,
    transitionDurationMs: 1000,
    decodeWarmupMs: 220,
    fallbackDelayMs: 4000,
    introDelayMs: 1820,
    scrollHintDelayMs: 2620,
    fadeDurationMs: 980,
    introTranslateY: 22,
  },
};

export const stats: StatItem[] = [
  {
    title: "Scenes",
    value: "188",
    icon: "map",
  },
  {
    title: "Frames",
    value: "8 Million",
    icon: "frames",
  },
  {
    title: "Distance",
    value: "1500+ km",
    icon: "route",
  },
  {
    title: "Coverage",
    value: "> 8 km²",
    icon: "coverage",
  },
];

export const whyItems: FeatureItem[] = [
  {
    title: "Large-Scale Scene Coverage",
    description:
      "The dataset emphasizes wide-area reconstruction targets that remain challenging for scene representation and compression.",
    icon: "coverage",
  },
  {
    title: "UAV-Oriented Capture Protocol",
    description:
      "Acquisition is centered on aerial viewpoints, long trajectories, and practical flight patterns rather than synthetic camera paths.",
    icon: "uav",
  },
  {
    title: "Real-World Scene Diversity",
    description:
      "Architectural detail, vegetation, reflective materials, and cluttered urban layouts introduce meaningful complexity.",
    icon: "diversity",
  },
  {
    title: "Support for Compression Research",
    description:
      "PKU-GS is designed to facilitate analysis of storage efficiency, reconstruction quality, and scene-level benchmarking.",
    icon: "benchmark",
  },
];

export const representativeScenes: SceneItem[] = [
  {
    id: "S-01",
    title: "Heritage Courtyard Block",
    category: "Historic Architecture",
    tags: ["Dense Rooflines", "Oblique UAV", "Fine Detail"],
    image: "/images/show/v3_0018.jpg",
    alt: "A UAV view over a dense heritage courtyard block with detailed roof structures.",
    description:
      "Compact roof geometry, repeated structural motifs, and narrow corridors provide challenging high-frequency detail.",
  },
  {
    id: "S-02",
    title: "Campus Library Tower",
    category: "Institutional Scene",
    tags: ["Campus", "Vegetation", "Facade Geometry"],
    image: "/images/show/v3_0078.jpg",
    alt: "A UAV view of a campus library tower surrounded by trees and institutional buildings.",
    description:
      "Tall facade structure and surrounding tree canopy create a mix of planar surfaces, depth changes, and partial occlusion.",
  },
  {
    id: "S-03",
    title: "Open-Air Market Edge",
    category: "Urban Commercial",
    tags: ["Parking Area", "Street Clutter", "Signage"],
    image: "/images/show/v3_0100.jpg",
    alt: "A UAV view of a market edge with parking lots, storefronts, and rich visual clutter.",
    description:
      "Ground vehicles, signage, open paved areas, and irregular storefront boundaries increase scene heterogeneity.",
  },
  {
    id: "S-04",
    title: "Waterside Academic Complex",
    category: "Large-Scale Campus",
    tags: ["Water Boundary", "Long Span", "Multi-Level"],
    image: "/images/show/v4_0001.jpg",
    alt: "A UAV view of a large academic complex positioned above a waterside boundary.",
    description:
      "Extended structural spans and water-adjacent geometry are useful for evaluating large-scene consistency and compression.",
  },
  {
    id: "S-05",
    title: "Research Innovation Campus",
    category: "Contemporary Architecture",
    tags: ["Modern Facades", "Road Network", "Layered Volumes"],
    image: "/images/show/v4_0168.jpg",
    alt: "A UAV view of a contemporary campus with layered building volumes and road networks.",
    description:
      "Contemporary glass-heavy architecture and layered building massing provide a complementary modern urban capture case.",
  },
];

export const pipelineSteps: PipelineStep[] = [
  {
    title: "UAV Capture",
    description: "Long-range UAV trajectories collect large-scene observations with practical aerial viewpoints.",
  },
  {
    title: "Video Preprocessing",
    description: "Raw sequences are organized, filtered, and prepared for structured downstream reconstruction.",
  },
  {
    title: "Pose Estimation",
    description: "Camera poses are recovered to establish geometric consistency across frames and viewpoints.",
  },
  {
    title: "Gaussian Splatting Reconstruction",
    description: "Scene representations are reconstructed for rendering, analysis, and compression-oriented study.",
  },
  {
    title: "Compression Benchmark",
    description: "Methods are compared with quality, efficiency, and scene-level robustness in mind.",
  },
];

export const benchmarkItems: BenchmarkItem[] = [
  {
    title: "Evaluation Metrics",
    description:
      "Placeholder support for distortion, bitrate, model size, rendering fidelity, and storage-efficiency metrics.",
  },
  {
    title: "Representative Methods",
    description:
      "A consistent benchmark view for baseline Gaussian Splatting and compression-oriented method families.",
  },
  {
    title: "Compression-Oriented Analysis",
    description:
      "Comparison space for model compaction, memory footprint, and quality-efficiency trade-offs across scenes.",
  },
  {
    title: "Scene-Level Benchmarking",
    description:
      "Per-scene summaries intended for large-scale evaluation rather than isolated showcase examples only.",
  },
];

export const benchmarkScenes: BenchmarkScene[] = [
  { key: "library", label: "1-23 (Library)" },
  { key: "velodrome", label: "1-42 (Velodrome)" },
  { key: "forum", label: "1-71 (Forum)" },
  { key: "average", label: "Average (20 scene)" },
];

export const benchmarkMethodRows: BenchmarkMethodRow[] = [
  {
    method: "HAC++ [8]",
    rank: 2.5,
    scenes: {
      library: { psnr: 26.421, ssim: 0.86, lpips: 0.173, sizeMb: 19.976 },
      velodrome: { psnr: 27.824, ssim: 0.831, lpips: 0.231, sizeMb: 7.218 },
      forum: { psnr: 28.961, ssim: 0.895, lpips: 0.144, sizeMb: 15.226 },
    },
  },
  {
    method: "PC-GS [5]",
    rank: 6.667,
    scenes: {
      library: { psnr: 24.245, ssim: 0.757, lpips: 0.298, sizeMb: 13.737 },
      velodrome: { psnr: 25.791, ssim: 0.748, lpips: 0.353, sizeMb: 4.891 },
      forum: { psnr: 26.997, ssim: 0.836, lpips: 0.247, sizeMb: 11.044 },
    },
  },
  {
    method: "Contextgs [37]",
    rank: 6.667,
    scenes: {
      library: { psnr: 25.082, ssim: 0.794, lpips: 0.256, sizeMb: 29.602 },
      velodrome: { psnr: 27.056, ssim: 0.802, lpips: 0.287, sizeMb: 10.721 },
      forum: { psnr: 27.465, ssim: 0.851, lpips: 0.228, sizeMb: 19.089 },
    },
  },
  {
    method: "HAC [7]",
    rank: 7.333,
    scenes: {
      library: { psnr: 24.547, ssim: 0.769, lpips: 0.286, sizeMb: 25.35 },
      velodrome: { psnr: 26.216, ssim: 0.766, lpips: 0.333, sizeMb: 8.094 },
      forum: { psnr: 27.299, ssim: 0.843, lpips: 0.236, sizeMb: 19.453 },
    },
  },
  {
    method: "CAT [44]",
    rank: 8,
    scenes: {
      library: { psnr: 23.686, ssim: 0.728, lpips: 0.275, sizeMb: 14.402 },
      velodrome: { psnr: 25.694, ssim: 0.735, lpips: 0.315, sizeMb: 5.037 },
      forum: { psnr: 26.913, ssim: 0.828, lpips: 0.194, sizeMb: 11.308 },
    },
  },
  {
    method: "Scaffold-GS [22]",
    rank: 9.167,
    scenes: {
      library: { psnr: 25.282, ssim: 0.813, lpips: 0.229, sizeMb: 287.701 },
      velodrome: { psnr: 28.609, ssim: 0.865, lpips: 0.206, sizeMb: 253.848 },
      forum: { psnr: 27.848, ssim: 0.867, lpips: 0.198, sizeMb: 254.261 },
    },
  },
  {
    method: "RDO-Gaussian [34]",
    rank: 9.667,
    scenes: {
      library: { psnr: 23.617, ssim: 0.737, lpips: 0.31, sizeMb: 14.056 },
      velodrome: { psnr: 24.851, ssim: 0.717, lpips: 0.391, sizeMb: 5.413 },
      forum: { psnr: 25.606, ssim: 0.779, lpips: 0.324, sizeMb: 6.653 },
    },
  },
  {
    method: "EAGLES [13]",
    rank: 9.833,
    scenes: {
      library: { psnr: 24.641, ssim: 0.784, lpips: 0.265, sizeMb: 93.141 },
      velodrome: { psnr: 26.919, ssim: 0.808, lpips: 0.287, sizeMb: 52.729 },
      forum: { psnr: 27.096, ssim: 0.84, lpips: 0.242, sizeMb: 57.771 },
    },
  },
  {
    method: "TC-GS [36]",
    rank: 10,
    scenes: {
      library: { psnr: 23.718, ssim: 0.721, lpips: 0.342, sizeMb: 17.948 },
      velodrome: { psnr: 26.813, ssim: 0.782, lpips: 0.323, sizeMb: 17.257 },
      forum: { psnr: 26.317, ssim: 0.805, lpips: 0.297, sizeMb: 13.906 },
    },
  },
  {
    method: "Reduced-3DGS [27]",
    rank: 10.167,
    scenes: {
      library: { psnr: 25.349, ssim: 0.81, lpips: 0.238, sizeMb: 325.088 },
      velodrome: { psnr: 27.362, ssim: 0.816, lpips: 0.277, sizeMb: 151.595 },
      forum: { psnr: 27.415, ssim: 0.85, lpips: 0.226, sizeMb: 188.577 },
    },
  },
  {
    method: "3DGS [15]",
    rank: 10.833,
    scenes: {
      library: { psnr: 25.445, ssim: 0.813, lpips: 0.234, sizeMb: 1095.68 },
      velodrome: { psnr: 28.403, ssim: 0.851, lpips: 0.229, sizeMb: 531.83 },
      forum: { psnr: 27.613, ssim: 0.855, lpips: 0.219, sizeMb: 634.02 },
    },
  },
  {
    method: "Gsplat [42]",
    rank: 11.5,
    scenes: {
      library: { psnr: 25.355, ssim: 0.81, lpips: 0.219, sizeMb: 1208.32 },
      velodrome: { psnr: 28.285, ssim: 0.847, lpips: 0.216, sizeMb: 601 },
      forum: { psnr: 27.423, ssim: 0.849, lpips: 0.213, sizeMb: 602 },
    },
  },
  {
    method: "Compact3dgs [17]",
    rank: 11.667,
    scenes: {
      library: { psnr: 24.033, ssim: 0.763, lpips: 0.285, sizeMb: 66.946 },
      velodrome: { psnr: 26.079, ssim: 0.774, lpips: 0.326, sizeMb: 45.829 },
      forum: { psnr: 26.132, ssim: 0.809, lpips: 0.28, sizeMb: 44.641 },
    },
  },
  {
    method: "FC-GS [6]",
    rank: 11.667,
    scenes: {
      library: { psnr: 19.383, ssim: 0.669, lpips: 0.2, sizeMb: 54.895 },
      velodrome: { psnr: 21.244, ssim: 0.711, lpips: 0.212, sizeMb: 32.313 },
      forum: { psnr: 21.725, ssim: 0.74, lpips: 0.201, sizeMb: 30.955 },
    },
  },
  {
    method: "Compact3d [17]",
    rank: 11.833,
    scenes: {
      library: { psnr: 23.93, ssim: 0.752, lpips: 0.305, sizeMb: 28.85 },
      velodrome: { psnr: 25.731, ssim: 0.759, lpips: 0.354, sizeMb: 16.71 },
      forum: { psnr: 26.123, ssim: 0.806, lpips: 0.296, sizeMb: 16.79 },
    },
  },
  {
    method: "Octree-GS [29]",
    rank: 12.333,
    scenes: {
      library: { psnr: 23.048, ssim: 0.706, lpips: 0.339, sizeMb: 79.979 },
      velodrome: { psnr: 26.623, ssim: 0.793, lpips: 0.292, sizeMb: 80.002 },
      forum: { psnr: 26.631, ssim: 0.831, lpips: 0.239, sizeMb: 114.507 },
    },
  },
  {
    method: "Minisplatting [11]",
    rank: 12.5,
    scenes: {
      library: { psnr: 23.428, ssim: 0.727, lpips: 0.327, sizeMb: 27.773 },
      velodrome: { psnr: 26.194, ssim: 0.783, lpips: 0.31, sizeMb: 24.421 },
      forum: { psnr: 25.967, ssim: 0.805, lpips: 0.278, sizeMb: 21.256 },
    },
  },
  {
    method: "Lightgaussian [10]",
    rank: 13.833,
    scenes: {
      library: { psnr: 24.32, ssim: 0.764, lpips: 0.292, sizeMb: 392.138 },
      velodrome: { psnr: 26.259, ssim: 0.774, lpips: 0.34, sizeMb: 175.644 },
      forum: { psnr: 26.575, ssim: 0.819, lpips: 0.276, sizeMb: 264.895 },
    },
  },
  {
    method: "Gaussianspa [46]",
    rank: 13.833,
    scenes: {
      library: { psnr: 23.443, ssim: 0.723, lpips: 0.334, sizeMb: 106.796 },
      velodrome: { psnr: 26.651, ssim: 0.79, lpips: 0.304, sizeMb: 101.522 },
      forum: { psnr: 26.205, ssim: 0.81, lpips: 0.274, sizeMb: 106.681 },
    },
  },
];

export const resourceDownloadRows: ResourceDownloadRow[] = [
  {
    category: "Standalone Buildings",
    rawVideosHref: "https://www.alipan.com/s/RL28QS9b7Pz",
  },
  {
    category: "Architecture Complex",
    rawVideosHref: "https://www.alipan.com/s/gaGuo9fghoC",
  },
  {
    category: "Sports Field",
    rawVideosHref: "https://www.alipan.com/s/KHk44UWvhZL",
  },
  {
    category: "Natural Landscape",
    rawVideosHref: "https://www.alipan.com/s/K981aY9Nfmu",
  },
  {
    category: "Sculpture",
    rawVideosHref: "https://www.alipan.com/s/BSnVsUv6zCq",
  },
  {
    category: "Waterfront Bridges",
    rawVideosHref: "https://www.alipan.com/s/dNGoZpwR3AX",
  },
];

export const citation = `@misc{pkugs2026,
  title        = {PKU-GS: A Large-Scale UAV-Based Real-World Dataset and Benchmark for 3D Gaussian Splatting Compression},
  author       = {Author List},
  year         = {2026},
  note         = {Project website and dataset release},
  howpublished = {\\url{https://github.com/YKh6666/PKUGS}}
}`;

export const footerContent: FooterContent = {
  authors: "Author One, Author Two, Author Three",
  affiliations: "Affiliation One · Affiliation Two · Affiliation Three",
  contact: "contact@example.com",
  copyright: "© 2026 PKU-GS Project. All rights reserved.",
};
