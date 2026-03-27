export type CtaLink = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
};

export type HeroContent = {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  ctas: CtaLink[];
  videoSources: string[];
  posterSrc: string;
  scrollLabel: string;
  timing: {
    overlayOpacity: number;
    displayDurationMs: number;
    transitionDurationMs: number;
    fallbackDelayMs: number;
    titleDelayMs: number;
    badgeDelayMs: number;
    ctaDelayMs: number;
    scrollHintDelayMs: number;
    fadeDurationMs: number;
    riseDistancePx: number;
  };
};

export type StatItem = {
  title: string;
  description: string;
  icon: "map" | "frames" | "route" | "capture" | "terrain" | "badge";
  value?: string;
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

export type ResourceCard = {
  title: string;
  description: string;
  actionLabel?: string;
  href?: string;
  external?: boolean;
  comingSoon?: boolean;
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
// - /Users/y/PKUGS/photo/show/*.png
// Formal site assets should be referenced from:
// - public/videos/
// - public/images/show/
export const heroContent: HeroContent = {
  title: "PKU-GS",
  subtitle:
    "A Gaussian Splatting Compression Dataset for Large-Scale Scene Modeling with UAVs",
  description:
    "PKU-GS is a large-scale UAV dataset designed to support reproducible study of Gaussian Splatting compression across complex outdoor scenes.",
  keywords: ["Large-Scale", "UAV Capture", "Compression Benchmark"],
  ctas: [
    { label: "Explore Scenes", href: "#scenes", variant: "primary" },
    { label: "Benchmark", href: "#benchmark", variant: "secondary" },
    { label: "Download", href: "#resources", variant: "secondary" },
  ],
  videoSources: [
    "/videos/dji_20260109164429_0032_d-1080p.mp4",
    "/videos/dji_20260110170407_0049_d-1080p.mp4",
    "/videos/dji_20260207104247_0261_d-1080p.mp4",
  ],
  posterSrc: "/images/hero/hero-cover.jpg",
  scrollLabel: "Scroll to continue",
  timing: {
    overlayOpacity: 0.24,
    displayDurationMs: 10000,
    transitionDurationMs: 1000,
    fallbackDelayMs: 4000,
    titleDelayMs: 2000,
    badgeDelayMs: 2200,
    ctaDelayMs: 2350,
    scrollHintDelayMs: 2800,
    fadeDurationMs: 900,
    riseDistancePx: 18,
  },
};

export const stats: StatItem[] = [
  {
    title: "Scenes",
    value: "188",
    description: "Diverse urban, campus, heritage, and outdoor environments for large-scale modeling.",
    icon: "map",
  },
  {
    title: "Frames",
    value: "8 Million",
    description: "Dense visual observations collected to support reconstruction, training, and evaluation.",
    icon: "frames",
  },
  {
    title: "Flight Distance",
    value: "1500+ km",
    description: "Long-range UAV coverage spanning broad scene extents and varied capture trajectories.",
    icon: "route",
  },
  {
    title: "Standardized UAV Capture",
    description: "Consistent collection protocol for view coverage, motion patterns, and multi-scene comparability.",
    icon: "capture",
  },
  {
    title: "Large-Scale Outdoor Scenes",
    description: "Outdoor geometry, vegetation, roofs, roads, and occlusions represented at practical scale.",
    icon: "terrain",
  },
  {
    title: "Benchmark Ready",
    description: "Structured splits and evaluation entry points prepared for compression-focused research workflows.",
    icon: "badge",
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
    image: "/images/show/v3_0018.png",
    alt: "A UAV view over a dense heritage courtyard block with detailed roof structures.",
    description:
      "Compact roof geometry, repeated structural motifs, and narrow corridors provide challenging high-frequency detail.",
  },
  {
    id: "S-02",
    title: "Campus Library Tower",
    category: "Institutional Scene",
    tags: ["Campus", "Vegetation", "Facade Geometry"],
    image: "/images/show/v3_0078.png",
    alt: "A UAV view of a campus library tower surrounded by trees and institutional buildings.",
    description:
      "Tall facade structure and surrounding tree canopy create a mix of planar surfaces, depth changes, and partial occlusion.",
  },
  {
    id: "S-03",
    title: "Open-Air Market Edge",
    category: "Urban Commercial",
    tags: ["Parking Area", "Street Clutter", "Signage"],
    image: "/images/show/v3_0100.png",
    alt: "A UAV view of a market edge with parking lots, storefronts, and rich visual clutter.",
    description:
      "Ground vehicles, signage, open paved areas, and irregular storefront boundaries increase scene heterogeneity.",
  },
  {
    id: "S-04",
    title: "Waterside Academic Complex",
    category: "Large-Scale Campus",
    tags: ["Water Boundary", "Long Span", "Multi-Level"],
    image: "/images/show/v4_0001.png",
    alt: "A UAV view of a large academic complex positioned above a waterside boundary.",
    description:
      "Extended structural spans and water-adjacent geometry are useful for evaluating large-scene consistency and compression.",
  },
  {
    id: "S-05",
    title: "Research Innovation Campus",
    category: "Contemporary Architecture",
    tags: ["Modern Facades", "Road Network", "Layered Volumes"],
    image: "/images/show/v4_0168.png",
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

export const resourceCards: ResourceCard[] = [
  {
    title: "Dataset",
    description: "Release package, metadata, and access notes for the public benchmark-facing split.",
    actionLabel: "Coming Soon",
    comingSoon: true,
  },
  {
    title: "Code",
    description: "Project codebase, data loading utilities, and reference scripts for dataset usage.",
    actionLabel: "Coming Soon",
    comingSoon: true,
  },
  {
    title: "Benchmark",
    description: "Benchmark protocol, evaluation conventions, and future result tables for comparison.",
    actionLabel: "Coming Soon",
    comingSoon: true,
  },
  {
    title: "Citation",
    description: "BibTeX entry prepared for direct copy into project pages, manuscripts, and references.",
    actionLabel: "Copy BibTeX",
  },
];

export const citation = `@misc{pkugs2026,
  title        = {PKU-GS: A Gaussian Splatting Compression Dataset for Large-Scale Scene Modeling with UAVs},
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
