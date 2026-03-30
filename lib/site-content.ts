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
    fallbackDelayMs: number;
    introDelayMs: number;
    scrollHintDelayMs: number;
    fadeDurationMs: number;
    introTranslateY: number;
  };
};

export type StatItem = {
  title: string;
  icon: "map" | "frames" | "route" | "poi" | "storage" | "coverage";
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
    "A Gaussian Splatting Compression Dataset for Large-Scale Scene Modeling with UAVs",
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
    title: "Flight Distance",
    value: "1500+ km",
    icon: "route",
  },
  {
    title: "POI Types",
    value: "7",
    icon: "poi",
  },
  {
    title: "Total Data Size",
    value: "20 TB",
    icon: "storage",
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
