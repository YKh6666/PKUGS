"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ActionLink } from "@/components/ActionLink";
import { heroContent } from "@/lib/site-content";

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const totalHeroVideos = heroContent.videoSources.length;
const heroPosterSrc = `${assetBasePath}${heroContent.posterSrc}`;

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
  const contentVisible = prefersReducedMotion || showContent;
  const transitionDuration = timing.transitionDurationMs;
  const displayDuration = timing.displayDurationMs;
  const transitionLeadTime = Math.max(displayDuration - transitionDuration, 0);

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
    }, timing.titleDelayMs);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion, timing.titleDelayMs]);

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
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: timing.riseDistancePx },
    animate: contentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: timing.riseDistancePx },
  };

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-foreground text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroPosterSrc})` }}
      />

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
                poster={heroPosterSrc}
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
          background: `linear-gradient(90deg, rgba(10, 22, 38, ${timing.overlayOpacity + 0.08}) 0%, rgba(10, 22, 38, ${timing.overlayOpacity}) 38%, rgba(10, 22, 38, ${Math.max(
            timing.overlayOpacity - 0.06,
            0.12,
          )}) 100%)`,
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
        <div className="section-shell grid w-full lg:grid-cols-[minmax(0,680px)_1fr]">
          <div className="pt-24 pb-18 md:pt-32 md:pb-24 lg:pt-28">
            <motion.div
              {...sharedAnimation}
              transition={baseTransition}
              className="max-w-4xl"
            >
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-white/72">
                Dataset Project Website
              </p>
              <h1 className="max-w-2xl font-serif text-5xl leading-[0.92] text-white sm:text-6xl md:text-7xl">
                {heroContent.title}
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-8 text-white/86 md:text-2xl md:leading-9">
                {heroContent.subtitle}
              </p>
            </motion.div>

            <motion.p
              {...sharedAnimation}
              transition={{
                ...baseTransition,
                delay: prefersReducedMotion
                  ? 0
                  : (timing.badgeDelayMs - timing.titleDelayMs) / 1000,
              }}
              className="mt-8 max-w-xl text-base leading-8 text-white/72 md:text-lg"
            >
              {heroContent.description}
            </motion.p>

            <motion.div
              {...sharedAnimation}
              transition={{
                ...baseTransition,
                delay: prefersReducedMotion
                  ? 0
                  : (timing.badgeDelayMs - timing.titleDelayMs) / 1000,
              }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {heroContent.keywords.map((keyword) => (
                <span key={keyword} className="chip">
                  {keyword}
                </span>
              ))}
            </motion.div>

            <motion.div
              {...sharedAnimation}
              transition={{
                ...baseTransition,
                delay: prefersReducedMotion
                  ? 0
                  : (timing.ctaDelayMs - timing.titleDelayMs) / 1000,
              }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {heroContent.ctas.map((cta) => (
                <ActionLink
                  key={cta.label}
                  label={cta.label}
                  href={cta.href}
                  variant={cta.variant}
                  className="min-w-[148px]"
                />
              ))}
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
          delay: prefersReducedMotion
            ? 0
            : (timing.scrollHintDelayMs - timing.titleDelayMs) / 1000,
        }}
        className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-fit flex-col items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/58 transition-colors hover:text-white/85"
      >
        <span>{heroContent.scrollLabel}</span>
        <ChevronDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}
