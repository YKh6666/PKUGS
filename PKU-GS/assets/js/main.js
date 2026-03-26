(function () {
  "use strict";

  const DATA_PATHS = {
    site: "assets/data/site.json",
    samples: "assets/data/samples.json",
    versions: "assets/data/versions.json",
  };
  const HERO_CAROUSEL_INTERVAL_MS = 6500;

  const FALLBACK_SITE = {
    title: "PKUGS",
    full_name: "PKUGS Gaussian Splatting Compression Dataset for Large-Scale Scene Modeling with UAVs",
    keywords: ["UAV", "large-scale", "3DGS compression dataset"],
    arxiv_url: "https://arxiv.org/abs/TODO",
    public_download_url: "https://example.com/TODO_PUBLIC_TIER.zip",
    contact_email: "contact@example.com",
    hero_items: ["1-01", "1-02", "2-01", "3-01"],
    socials: [],
  };

  const FALLBACK_SAMPLES = [
    {
      id: "1-01",
      name: "Downtown Grid Flight",
      category: "Architecture",
      location: "Sample City Block",
      resolution: "3840x2160",
      duration_sec: 12.3,
      assets: {
        thumb: "assets/img/placeholders/thumb1.webp",
        images: ["assets/img/placeholders/sample1_a.webp", "assets/img/placeholders/sample1_b.webp"],
        videos: ["assets/video/previews/demo1.mp4"],
        colmap: true,
        gaussian_outputs: ["ply", "ckpt"],
      },
      tags: ["UAV", "large-scale"],
    },
  ];

  const FALLBACK_VERSIONS = [
    {
      version: "v1.0",
      date: "2026-02-08",
      notes: ["Initial release"],
      public_download_url: "TODO",
    },
  ];

  const state = {
    heroSamples: [],
    heroActiveIndex: 0,
    heroCarouselTimer: null,
    heroCarouselBound: false,
    galleryController: null,
    site: null,
  };

  function toSafeArray(value) {
    return Array.isArray(value) ? value.filter(Boolean) : [];
  }

  function normalizeSite(input) {
    const base = input && typeof input === "object" ? input : {};
    return {
      title: String(base.title || FALLBACK_SITE.title),
      full_name: String(base.full_name || FALLBACK_SITE.full_name),
      keywords: toSafeArray(base.keywords).map(String),
      arxiv_url: String(base.arxiv_url || FALLBACK_SITE.arxiv_url),
      public_download_url: String(base.public_download_url || FALLBACK_SITE.public_download_url),
      contact_email: String(base.contact_email || FALLBACK_SITE.contact_email),
      hero_items: toSafeArray(base.hero_items).map(String),
      socials: toSafeArray(base.socials),
    };
  }

  function normalizeSample(sample) {
    const base = sample && typeof sample === "object" ? sample : {};
    const assets = base.assets && typeof base.assets === "object" ? base.assets : {};

    return {
      id: String(base.id || "N/A"),
      name: String(base.name || "Unnamed Scene"),
      category: String(base.category || "Uncategorized"),
      location: base.location ? String(base.location) : "N/A",
      resolution: base.resolution ? String(base.resolution) : "N/A",
      duration_sec:
        typeof base.duration_sec === "number" && !Number.isNaN(base.duration_sec)
          ? base.duration_sec
          : null,
      assets: {
        thumb: assets.thumb ? String(assets.thumb) : "",
        images: toSafeArray(assets.images).map(String),
        videos: toSafeArray(assets.videos).map(String),
        colmap: Boolean(assets.colmap),
        gaussian_outputs: toSafeArray(assets.gaussian_outputs).map(String),
      },
      tags: toSafeArray(base.tags).map(String),
    };
  }

  function normalizeVersions(input) {
    return toSafeArray(input).map((item) => {
      const base = item && typeof item === "object" ? item : {};
      return {
        version: String(base.version || "v0.0"),
        date: String(base.date || "TBD"),
        notes: toSafeArray(base.notes).map(String),
        public_download_url: String(base.public_download_url || ""),
      };
    });
  }

  function formatDuration(seconds) {
    if (window.GUAVUTGallery && typeof window.GUAVUTGallery.formatDuration === "function") {
      return window.GUAVUTGallery.formatDuration(seconds);
    }
    if (typeof seconds !== "number" || Number.isNaN(seconds)) {
      return "N/A";
    }
    return `${seconds.toFixed(1)} s`;
  }

  function placeholderData(label) {
    if (window.GUAVUTGallery && typeof window.GUAVUTGallery.createPlaceholderDataUri === "function") {
      return window.GUAVUTGallery.createPlaceholderDataUri(label);
    }
    return "";
  }

  async function fetchJson(path) {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.status}`);
    }
    return response.json();
  }

  function fetchJsonWithXHR(path) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", path, true);
      xhr.overrideMimeType("application/json");
      xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error(`XHR failed for ${path}: ${xhr.status}`));
        }
      };
      xhr.onerror = function () {
        reject(new Error(`XHR error for ${path}`));
      };
      xhr.send();
    });
  }

  async function loadJson(path, fallbackValue) {
    try {
      return await fetchJson(path);
    } catch (error) {
      try {
        return await fetchJsonWithXHR(path);
      } catch (xhrError) {
        console.warn(`Using fallback for ${path}.`, error, xhrError);
        return fallbackValue;
      }
    }
  }

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) {
      node.textContent = value;
    }
  }

  function escapeRegExp(value) {
    return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function deriveHeroTitleSub(site) {
    const fullName = String((site && site.full_name) || "").trim();
    const title = String((site && site.title) || "").trim();
    if (!fullName) {
      return "";
    }
    if (!title) {
      return fullName;
    }
    const titleDashPattern = new RegExp(`^${escapeRegExp(title)}\\s*[-–—]\\s*(.+)$`, "i");
    const dashMatch = fullName.match(titleDashPattern);
    if (dashMatch && dashMatch[1]) {
      return `-${dashMatch[1].trim()}`;
    }
    const titlePrefixPattern = new RegExp(`^${escapeRegExp(title)}\\s*[:\\-–—]?\\s*`, "i");
    const shortened = fullName.replace(titlePrefixPattern, "").trim();
    return shortened || fullName;
  }

  function setEmailLink(id, email) {
    const node = document.getElementById(id);
    if (!node) {
      return;
    }
    node.textContent = email;
    node.href = `mailto:${email}`;
  }

  function setKeywords(keywords) {
    const row = document.getElementById("hero-keywords");
    if (!row) {
      return;
    }
    row.textContent = "";
    keywords.forEach((keyword) => {
      const chip = document.createElement("span");
      chip.className = "keyword-chip";
      chip.textContent = keyword;
      row.appendChild(chip);
    });
  }

  function setLink(node, url) {
    if (!node) {
      return;
    }
    const safeUrl = String(url || "").trim();
    if (!safeUrl || safeUrl === "#") {
      node.href = "#";
      node.setAttribute("aria-disabled", "true");
      return;
    }
    node.href = safeUrl;
    node.removeAttribute("aria-disabled");
  }

  function getSampleThumb(sample) {
    return sample.assets.thumb || sample.assets.images[0] || placeholderData("Scene Preview");
  }

  function buildHeroMedia(sample) {
    const viewer = document.getElementById("hero-featured-media");
    if (!viewer) {
      return;
    }
    viewer.textContent = "";

    const firstVideo = sample.assets.videos[0];
    const firstImage = sample.assets.images[0] || sample.assets.thumb;

    if (firstVideo) {
      const video = document.createElement("video");
      video.controls = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      const isMobile = window.matchMedia("(max-width: 760px)").matches;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      video.autoplay = !isMobile && !prefersReducedMotion;
      video.preload = "metadata";
      video.src = firstVideo;
      video.poster = getSampleThumb(sample);
      video.onerror = function () {
        viewer.textContent = "";
        const fallback = document.createElement("div");
        fallback.className = "hero-placeholder";
        fallback.textContent = "Preview unavailable";
        viewer.appendChild(fallback);
      };
      viewer.appendChild(video);
      return;
    }

    if (firstImage) {
      const img = document.createElement("img");
      img.src = firstImage;
      img.alt = `${sample.name} preview`;
      img.loading = "eager";
      img.onerror = function () {
        img.onerror = null;
        img.src = placeholderData("No Preview");
      };
      viewer.appendChild(img);
      return;
    }

    const placeholder = document.createElement("div");
    placeholder.className = "hero-placeholder";
    placeholder.textContent = "No media yet";
    viewer.appendChild(placeholder);
  }

  function updateHeroMeta(sample) {
    setText("hero-meta-id", sample.id);
    setText("hero-meta-name", sample.name);
    setText("hero-meta-category", sample.category);
    setText("hero-meta-resolution", sample.resolution);
    setText("hero-meta-duration", formatDuration(sample.duration_sec));
  }

  function clearHeroCarousel() {
    if (state.heroCarouselTimer) {
      window.clearInterval(state.heroCarouselTimer);
      state.heroCarouselTimer = null;
    }
  }

  function selectHeroSample(index, options) {
    if (!state.heroSamples.length) {
      return;
    }
    const opts = options && typeof options === "object" ? options : {};
    const total = state.heroSamples.length;
    const normalizedIndex = ((index % total) + total) % total;
    state.heroActiveIndex = normalizedIndex;
    const sample = state.heroSamples[normalizedIndex];
    renderHeroThumbnails();
    buildHeroMedia(sample);
    updateHeroMeta(sample);

    if (opts.restartCarousel) {
      startHeroCarousel();
    }
  }

  function startHeroCarousel() {
    clearHeroCarousel();
    if (state.heroSamples.length <= 1) {
      return;
    }
    state.heroCarouselTimer = window.setInterval(function () {
      selectHeroSample(state.heroActiveIndex + 1);
    }, HERO_CAROUSEL_INTERVAL_MS);
  }

  function bindHeroCarouselInteractions() {
    if (state.heroCarouselBound) {
      return;
    }
    state.heroCarouselBound = true;

    const stage = document.querySelector(".hero-stage-card");
    const thumbs = document.getElementById("hero-thumbnails");
    const pauseTargets = [stage, thumbs].filter(Boolean);

    pauseTargets.forEach((node) => {
      node.addEventListener("mouseenter", clearHeroCarousel);
      node.addEventListener("mouseleave", startHeroCarousel);
      node.addEventListener("focusin", clearHeroCarousel);
      node.addEventListener("focusout", startHeroCarousel);
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        clearHeroCarousel();
      } else {
        startHeroCarousel();
      }
    });
  }

  function renderHeroThumbnails() {
    const container = document.getElementById("hero-thumbnails");
    if (!container) {
      return;
    }
    container.textContent = "";

    state.heroSamples.forEach((sample, index) => {
      const isActive = index === state.heroActiveIndex;
      const button = document.createElement("button");
      button.type = "button";
      button.className = `hero-thumb${isActive ? " active" : ""}`;
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
      button.setAttribute("aria-label", `Show scene ${sample.id}: ${sample.name}`);
      button.dataset.hint = isActive ? "Now Playing" : "Click to Preview";
      button.title = isActive ? `${sample.name} (active)` : `Preview ${sample.name}`;

      const img = document.createElement("img");
      img.src = getSampleThumb(sample);
      img.alt = `${sample.name} thumbnail`;
      img.loading = "lazy";
      img.onerror = function () {
        img.onerror = null;
        img.src = placeholderData("No Thumb");
      };

      const label = document.createElement("span");
      label.textContent = `${sample.id} · ${sample.name}`;

      button.appendChild(img);
      button.appendChild(label);
      button.addEventListener("click", function () {
        selectHeroSample(index, { restartCarousel: true });
      });
      container.appendChild(button);
    });
  }

  function setupHero(site, samples) {
    const heroIds = toSafeArray(site.hero_items);
    const selected = heroIds
      .map((id) => samples.find((sample) => sample.id === id))
      .filter(Boolean);

    if (selected.length > 0) {
      const picked = new Set(selected.map((item) => item.id));
      const extras = samples.filter((sample) => !picked.has(sample.id));
      state.heroSamples = selected.concat(extras).slice(0, 8);
    } else {
      state.heroSamples = samples.slice(0, 8);
    }
    state.heroActiveIndex = 0;

    if (state.heroSamples.length === 0) {
      clearHeroCarousel();
      const viewer = document.getElementById("hero-featured-media");
      if (viewer) {
        const placeholder = document.createElement("div");
        placeholder.className = "hero-placeholder";
        placeholder.textContent = "No samples available";
        viewer.appendChild(placeholder);
      }
      return;
    }

    selectHeroSample(0);
    bindHeroCarouselInteractions();
    startHeroCarousel();
  }

  function renderVersions(versions) {
    const container = document.getElementById("version-list");
    if (!container) {
      return;
    }
    container.textContent = "";

    if (!versions.length) {
      const empty = document.createElement("p");
      empty.textContent = "No published versions yet.";
      container.appendChild(empty);
      return;
    }

    versions.forEach((item) => {
      const card = document.createElement("article");
      card.className = "version-item";

      const head = document.createElement("div");
      head.className = "version-head";

      const badge = document.createElement("span");
      badge.className = "version-badge";
      badge.textContent = item.version;

      const date = document.createElement("span");
      date.className = "version-date";
      date.textContent = item.date;

      head.appendChild(badge);
      head.appendChild(date);
      card.appendChild(head);

      const notes = document.createElement("ul");
      const noteItems = item.notes.length ? item.notes : ["No notes."];
      noteItems.forEach((note) => {
        const li = document.createElement("li");
        li.textContent = note;
        notes.appendChild(li);
      });
      card.appendChild(notes);

      if (item.public_download_url) {
        const link = document.createElement("a");
        link.href = item.public_download_url;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = "Public tier link for this version";
        card.appendChild(link);
      }

      container.appendChild(card);
    });
  }

  function updateBibtex(site) {
    const block = document.getElementById("bibtex-block");
    if (!block) {
      return;
    }
    const codeNode = block.querySelector("code") || block;
    codeNode.textContent = `@misc{pkugs_2026,\n  title        = {${site.full_name}},\n  author       = {TODO: Author List},\n  year         = {2026},\n  howpublished = {\\url{${site.arxiv_url}}},\n  note         = {Version v1.0}\n}`;
  }

  async function copyText(text) {
    if (!text) {
      return false;
    }
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "readonly");
    textarea.style.position = "fixed";
    textarea.style.top = "-2000px";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    document.body.removeChild(textarea);
    return copied;
  }

  function setupCopyButton(button, getValue) {
    if (!button) {
      return;
    }
    const defaultText = button.textContent;
    button.addEventListener("click", async function () {
      const value = typeof getValue === "function" ? getValue() : "";
      if (!value) {
        button.textContent = "No content";
        window.setTimeout(function () {
          button.textContent = defaultText;
        }, 1000);
        return;
      }
      try {
        const copied = await copyText(value);
        button.textContent = copied ? "Copied" : "Copy failed";
      } catch (error) {
        button.textContent = "Copy failed";
      }
      window.setTimeout(function () {
        button.textContent = defaultText;
      }, 1200);
    });
  }

  function applySiteData(site) {
    state.site = site;
    document.title = site.title;
    setText("site-title", site.title);
    setText("hero-title-main", site.title);
    setText("hero-title-sub", deriveHeroTitleSub(site));
    setKeywords(site.keywords);

    const publicDownloadLink = document.getElementById("public-download-link");
    setLink(publicDownloadLink, site.public_download_url);
    const heroDownloadLink = document.getElementById("hero-download-link");
    setLink(heroDownloadLink, site.public_download_url);

    const arxivLink = document.getElementById("arxiv-link");
    setLink(arxivLink, site.arxiv_url);
    const heroPaperLink = document.getElementById("hero-paper-link");
    setLink(heroPaperLink, site.arxiv_url);

    setEmailLink("full-tier-email", site.contact_email);
    setEmailLink("contact-email-link", site.contact_email);
    updateBibtex(site);

    setupCopyButton(document.getElementById("copy-public-link"), function () {
      return site.public_download_url;
    });

    setupCopyButton(document.getElementById("copy-full-contact"), function () {
      return site.contact_email;
    });

    setupCopyButton(document.getElementById("copy-bibtex"), function () {
      const codeNode = document.querySelector("#bibtex-block code");
      return codeNode ? codeNode.textContent : "";
    });
  }

  function initGallery(samples) {
    if (!window.GUAVUTGallery || typeof window.GUAVUTGallery.initGallery !== "function") {
      return;
    }

    state.galleryController = window.GUAVUTGallery.initGallery({
      samples,
      filterContainer: document.getElementById("gallery-filters"),
      searchInput: document.getElementById("gallery-search"),
      resetButton: document.getElementById("gallery-reset"),
      countLabel: document.getElementById("gallery-count"),
      grid: document.getElementById("gallery-grid"),
      empty: document.getElementById("gallery-empty"),
      modal: document.getElementById("media-modal"),
      modalClose: document.getElementById("modal-close"),
      modalTitle: document.getElementById("modal-title"),
      modalSubtitle: document.getElementById("modal-subtitle"),
      modalTabs: document.getElementById("modal-tabs"),
      modalViewer: document.getElementById("modal-media-viewer"),
      modalIndicator: document.getElementById("modal-indicator"),
      modalPrev: document.getElementById("modal-prev"),
      modalNext: document.getElementById("modal-next"),
      modalThumbs: document.getElementById("modal-media-thumbs"),
      modalMetadata: document.getElementById("modal-metadata"),
    });
  }

  async function init() {
    const [siteRaw, samplesRaw, versionsRaw] = await Promise.all([
      loadJson(DATA_PATHS.site, FALLBACK_SITE),
      loadJson(DATA_PATHS.samples, FALLBACK_SAMPLES),
      loadJson(DATA_PATHS.versions, FALLBACK_VERSIONS),
    ]);

    const site = normalizeSite(siteRaw);
    const samples = toSafeArray(samplesRaw).map(normalizeSample);
    const versions = normalizeVersions(versionsRaw);

    applySiteData(site);
    setupHero(site, samples);
    initGallery(samples);
    renderVersions(versions);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
