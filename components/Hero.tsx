"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ActionLink } from "@/components/ActionLink";
import { heroContent } from "@/lib/site-content";

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const totalHeroVideos = heroContent.videoSources.length;

type VideoLayer = {
  ready: boolean;
  sourceIndex: number;
};

function getNextSourceIndex(sourceIndex: number) {
  return (sourceIndex + 1) % totalHeroVideos;
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [showContent, setShowContent] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [layers, setLayers] = useState<VideoLayer[]>(() => [
    { ready: false, sourceIndex: 0 },
    { ready: false, sourceIndex: totalHeroVideos > 1 ? 1 : 0 },
  ]);
  const layerRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const activeLayerIndexRef = useRef(activeLayerIndex);
  const isTransitioningRef = useRef(isTransitioning);
  const useFallbackRef = useRef(useFallback);
  const layersRef = useRef(layers);
  const transitionTimerRef = useRef<number | null>(null);
  const finalizeTimerRef = useRef<number | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);

  const timing = heroContent.timing;
  const readability = heroContent.readability;
  const contentVisible = prefersReducedMotion || showContent;
  const transitionDuration = timing.transitionDurationMs;
  const displayDuration = timing.displayDurationMs;
  const transitionLeadTime = Math.max(displayDuration - transitionDuration, 0);
  const localOverlayPrimaryColor = `rgba(7, 16, 28, ${readability.localOverlayOpacity})`;
  const localOverlaySecondaryColor = `rgba(7, 16, 28, ${Math.max(
    readability.localOverlayOpacity - 0.04,
    0.08,
  )})`;
  const localOverlayTertiaryColor = `rgba(7, 16, 28, ${Math.max(
    readability.localOverlayOpacity - 0.1,
    0.03,
  )})`;
  const localOverlayFeatherColor = `rgba(7, 16, 28, ${Math.max(
    readability.localOverlayOpacity - 0.14,
    0.01,
  )})`;
  useEffect(() => {
    activeLayerIndexRef.current = activeLayerIndex;
    isTransitioningRef.current = isTransitioning;
    useFallbackRef.current = useFallback;
    layersRef.current = layers;
  }, [activeLayerIndex, isTransitioning, layers, useFallback]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowContent(true);
    }, timing.introDelayMs);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion, timing.introDelayMs]);

  useEffect(() => {
    if (videoReady) {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
      return;
    }

    fallbackTimerRef.current = window.setTimeout(() => {
      setUseFallback(true);
    }, timing.fallbackDelayMs);

    return () => {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
    };
  }, [timing.fallbackDelayMs, videoReady]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }

      if (finalizeTimerRef.current !== null) {
        window.clearTimeout(finalizeTimerRef.current);
      }

      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
      }
    };
  }, []);

  const baseTransition = {
    duration: prefersReducedMotion ? 0 : timing.fadeDurationMs / 1000,
    ease: [0.21, 1, 0.35, 1] as const,
  };

  function markLayerReady(layerIndex: number) {
    setLayers((currentLayers) => {
      if (currentLayers[layerIndex].ready) {
        return currentLayers;
      }

      const nextLayers = [...currentLayers];
      nextLayers[layerIndex] = {
        ...nextLayers[layerIndex],
        ready: true,
      };
      return nextLayers;
    });
  }

  function assignLayerSource(layerIndex: number, sourceIndex: number) {
    setLayers((currentLayers) => {
      if (
        currentLayers[layerIndex].sourceIndex === sourceIndex &&
        !currentLayers[layerIndex].ready
      ) {
        return currentLayers;
      }

      const nextLayers = [...currentLayers];
      nextLayers[layerIndex] = {
        ready: false,
        sourceIndex,
      };
      return nextLayers;
    });
  }

  function clearPlaybackTimers() {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }

    if (finalizeTimerRef.current !== null) {
      window.clearTimeout(finalizeTimerRef.current);
      finalizeTimerRef.current = null;
    }
  }

  function scheduleCrossfade(delayMs: number) {
    if (totalHeroVideos < 2) {
      return;
    }

    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
    }

    transitionTimerRef.current = window.setTimeout(() => {
      startCrossfade();
    }, Math.max(delayMs, 0));
  }

  function finalizeCrossfade(
    outgoingLayerIndex: number,
    incomingLayerIndex: number,
    upcomingSourceIndex: number,
  ) {
    const outgoingVideo = layerRefs.current[outgoingLayerIndex];

    if (outgoingVideo) {
      outgoingVideo.pause();
      outgoingVideo.currentTime = 0;
    }

    assignLayerSource(outgoingLayerIndex, upcomingSourceIndex);
    setActiveLayerIndex(incomingLayerIndex);
    setIsTransitioning(false);
    setUseFallback(false);
    setVideoReady(true);
  }

  function startCrossfade() {
    transitionTimerRef.current = null;

    if (isTransitioningRef.current || useFallbackRef.current || totalHeroVideos < 2) {
      return;
    }

    const currentActiveLayerIndex = activeLayerIndexRef.current;
    const currentNextLayerIndex = currentActiveLayerIndex === 0 ? 1 : 0;
    const currentLayers = layersRef.current;
    const incomingLayer = currentLayers[currentNextLayerIndex];

    if (!incomingLayer.ready) {
      scheduleCrossfade(120);
      return;
    }

    const outgoingLayerIndex = currentActiveLayerIndex;
    const incomingLayerIndex = currentNextLayerIndex;
    const incomingVideo = layerRefs.current[incomingLayerIndex];
    const upcomingSourceIndex = getNextSourceIndex(incomingLayer.sourceIndex);

    if (!incomingVideo) {
      return;
    }

    incomingVideo.currentTime = 0;

    void incomingVideo.play().then(() => {
      scheduleCrossfade(transitionLeadTime);
    }).catch(() => {
      clearPlaybackTimers();
      setUseFallback(true);
      setVideoReady(false);
    });

    setIsTransitioning(true);
    setUseFallback(false);

    if (finalizeTimerRef.current !== null) {
      window.clearTimeout(finalizeTimerRef.current);
    }

    finalizeTimerRef.current = window.setTimeout(() => {
      finalizeCrossfade(outgoingLayerIndex, incomingLayerIndex, upcomingSourceIndex);
    }, transitionDuration);
  }

  function handleVideoError(layerIndex: number) {
    const currentLayers = layersRef.current;
    const layer = currentLayers[layerIndex];

    if (totalHeroVideos < 2) {
      setUseFallback(true);
      setVideoReady(false);
      return;
    }

    if (layerIndex === activeLayerIndexRef.current) {
      clearPlaybackTimers();
      setUseFallback(true);
      setVideoReady(false);
      return;
    }

    assignLayerSource(layerIndex, getNextSourceIndex(layer.sourceIndex));
  }

  const sharedAnimation = {
    initial: prefersReducedMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: timing.introTranslateY, filter: "blur(6px)" },
    animate: contentVisible
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: timing.introTranslateY, filter: "blur(6px)" },
  };

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-foreground text-white">
      {!useFallback && (
        <>
          {layers.map((layer, layerIndex) => {
            const isActiveLayer = layerIndex === activeLayerIndex;
            const layerOpacity = isTransitioning
              ? isActiveLayer
                ? 0
                : 1
              : isActiveLayer
                ? 1
                : 0;

            return (
              <video
                key={`${layerIndex}-${layer.sourceIndex}`}
                ref={(element) => {
                  layerRefs.current[layerIndex] = element;
                }}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  opacity: layerOpacity,
                  transition: `opacity ${transitionDuration}ms ease-in-out`,
                }}
                src={`${assetBasePath}${heroContent.videoSources[layer.sourceIndex]}`}
                autoPlay={isActiveLayer}
                muted
                playsInline
                preload="auto"
                aria-hidden={!isActiveLayer}
                onCanPlay={() => {
                  markLayerReady(layerIndex);

                  if (isActiveLayer && !videoReady) {
                    setVideoReady(true);
                    setUseFallback(false);
                  }
                }}
                onPlay={() => {
                  if (layerIndex === activeLayerIndex && !isTransitioning) {
                    scheduleCrossfade(transitionLeadTime);
                  }
                }}
                onEnded={() => {
                  if (layerIndex === activeLayerIndex && !isTransitioning) {
                    startCrossfade();
                  }
                }}
                onError={() => {
                  handleVideoError(layerIndex);
                }}
              />
            );
          })}
        </>
      )}

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(8, 18, 31, ${readability.globalOverlayOpacity + 0.04}) 0%, rgba(8, 18, 31, ${readability.globalOverlayOpacity}) 36%, rgba(8, 18, 31, ${readability.globalOverlayOpacity + 0.02}) 100%)`,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-[1]"
        style={{
          width: readability.localOverlayWidth,
          height: readability.localOverlayHeight,
          background: `linear-gradient(90deg, ${localOverlayPrimaryColor} 0%, ${localOverlaySecondaryColor} ${readability.localOverlayGradientStops.dense}, ${localOverlayTertiaryColor} ${readability.localOverlayGradientStops.medium}, ${localOverlayFeatherColor} ${readability.localOverlayGradientStops.soft}, rgba(7, 16, 28, 0) ${readability.localOverlayGradientStops.fade}), radial-gradient(140% 120% at -8% 50%, ${localOverlaySecondaryColor} 0%, ${localOverlayTertiaryColor} ${readability.localOverlayGradientStops.medium}, rgba(7, 16, 28, 0.02) ${readability.localOverlayGradientStops.fade}, rgba(7, 16, 28, 0) 100%), linear-gradient(180deg, rgba(7, 16, 28, 0.04) 0%, rgba(7, 16, 28, 0.015) 22%, rgba(7, 16, 28, 0.01) 54%, rgba(7, 16, 28, 0.02) 100%)`,
          filter: `blur(${readability.localOverlayBlur}px)`,
          opacity: 0.9,
        }}
      />

      <div className="absolute inset-x-0 top-0 z-20">
        <div className="section-shell flex items-center justify-between py-6 text-sm text-white/76">
          <div className="font-serif text-base tracking-[0.14em]">PKU-GS</div>
          <nav className="hidden items-center gap-7 md:flex">
            <a href="#overview" className="transition-colors hover:text-white">
              Overview
            </a>
            <a href="#scenes" className="transition-colors hover:text-white">
              Scenes
            </a>
            <a href="#pipeline" className="transition-colors hover:text-white">
              Pipeline
            </a>
            <a href="#benchmark" className="transition-colors hover:text-white">
              Benchmark
            </a>
            <a href="#resources" className="transition-colors hover:text-white">
              Resources
            </a>
          </nav>
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center">
        <div className="section-shell flex w-full items-center justify-start">
          <div className="relative w-full max-w-[900px] pt-28 pb-20 md:pt-34 md:pb-24 lg:ml-[3vw]">
            <motion.div
              {...sharedAnimation}
              transition={baseTransition}
              className="relative max-w-[780px]"
            >
              <h1
                className="max-w-2xl font-serif text-[4.5rem] leading-[0.84] text-white sm:text-[5.25rem] md:text-[6.75rem] lg:text-[7.6rem]"
                style={{ textShadow: readability.titleTextShadow }}
              >
                {heroContent.title}
              </h1>

              <p
                className="mt-6 max-w-[30ch] text-[1.24rem] leading-8 text-white/88 md:text-[1.88rem] md:leading-10"
                style={{ textShadow: readability.subtitleTextShadow }}
              >
                {heroContent.subtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {heroContent.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center rounded-full border border-white/14 bg-white/[0.05] px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white/80"
                    style={{ textShadow: readability.bodyTextShadow }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3.5">
                {heroContent.ctas.map((cta) => (
                  <ActionLink
                    key={cta.label}
                    label={cta.label}
                    href={cta.href}
                    variant={cta.variant}
                    className="min-w-[160px] px-6 py-3.5 text-[0.95rem]"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.a
        href="#overview"
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        animate={
          contentVisible
            ? { opacity: 1, y: 0 }
            : prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 14 }
        }
        transition={{
          ...baseTransition,
          delay: prefersReducedMotion ? 0 : (timing.scrollHintDelayMs - timing.introDelayMs) / 1000,
        }}
        className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-fit flex-col items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white/72"
      >
        <span>{heroContent.scrollLabel}</span>
        <ChevronDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}
