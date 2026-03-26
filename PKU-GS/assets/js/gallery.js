(function () {
  "use strict";

  function toSafeArray(value) {
    return Array.isArray(value) ? value.filter(Boolean) : [];
  }

  function formatDuration(seconds) {
    if (typeof seconds !== "number" || Number.isNaN(seconds)) {
      return "N/A";
    }
    if (seconds < 60) {
      return `${seconds.toFixed(1)} s`;
    }
    const mins = Math.floor(seconds / 60);
    const rest = (seconds % 60).toFixed(1);
    return `${mins}m ${rest}s`;
  }

  function createPlaceholderDataUri(label) {
    const text = label || "Placeholder";
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='960' height='540'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='#93a6c8'/><stop offset='100%' stop-color='#5f789f'/></linearGradient></defs><rect width='960' height='540' fill='url(#g)'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Segoe UI,sans-serif' font-size='42' fill='#f3f7ff'>${text}</text></svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  function createImage(src, alt, lazy) {
    const img = document.createElement("img");
    img.src = src || createPlaceholderDataUri("No Preview");
    img.alt = alt || "Preview";
    if (lazy) {
      img.loading = "lazy";
    }
    img.onerror = function () {
      img.onerror = null;
      img.src = createPlaceholderDataUri("No Preview");
    };
    return img;
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
        images: toSafeArray(assets.images),
        videos: toSafeArray(assets.videos),
        colmap: Boolean(assets.colmap),
        gaussian_outputs: toSafeArray(assets.gaussian_outputs),
      },
      tags: toSafeArray(base.tags).map(String),
    };
  }

  function getSampleThumb(sample) {
    return sample.assets.thumb || sample.assets.images[0] || createPlaceholderDataUri("Scene Preview");
  }

  function textOrFallback(value) {
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }
    return String(value);
  }

  function initGallery(config) {
    const samples = toSafeArray(config.samples).map(normalizeSample);
    const elements = {
      filters: config.filterContainer,
      search: config.searchInput,
      reset: config.resetButton,
      count: config.countLabel,
      grid: config.grid,
      empty: config.empty,
      modal: config.modal,
      modalClose: config.modalClose,
      modalTitle: config.modalTitle,
      modalSubtitle: config.modalSubtitle,
      modalTabs: config.modalTabs,
      modalViewer: config.modalViewer,
      modalIndicator: config.modalIndicator,
      modalPrev: config.modalPrev,
      modalNext: config.modalNext,
      modalThumbs: config.modalThumbs,
      modalMetadata: config.modalMetadata,
    };

    if (!elements.grid || !elements.filters || !elements.search) {
      return {
        setSamples: function () {},
      };
    }

    const state = {
      samples,
      category: "All",
      query: "",
      filtered: [],
      modalOpen: false,
      activeSample: null,
      activeTab: "all",
      modalItems: [],
      modalIndex: 0,
    };

    const categories = new Set(["All"]);
    samples.forEach((item) => categories.add(item.category));

    function updateCount() {
      const count = state.filtered.length;
      elements.count.textContent = `${count} sample${count === 1 ? "" : "s"}`;
    }

    function applyFilters() {
      const query = state.query.trim().toLowerCase();
      state.filtered = state.samples.filter((sample) => {
        const matchCategory = state.category === "All" || sample.category === state.category;
        const searchTarget = `${sample.id} ${sample.name}`.toLowerCase();
        const matchQuery = !query || searchTarget.includes(query);
        return matchCategory && matchQuery;
      });
      renderGrid();
      updateCount();
    }

    function createFilterButton(category) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `filter-pill${state.category === category ? " active" : ""}`;
      btn.textContent = category;
      btn.addEventListener("click", function () {
        state.category = category;
        renderFilters();
        applyFilters();
      });
      return btn;
    }

    function renderFilters() {
      elements.filters.textContent = "";
      Array.from(categories).forEach((category) => {
        elements.filters.appendChild(createFilterButton(category));
      });
    }

    function openModal(sample) {
      state.activeSample = sample;
      state.activeTab = "all";
      state.modalIndex = 0;
      state.modalOpen = true;
      elements.modal.hidden = false;
      elements.modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      elements.modalTitle.textContent = sample.name;
      elements.modalSubtitle.textContent = `${sample.id} · ${sample.category}`;
      renderModalTabs();
      rebuildModalItems();
    }

    function closeModal() {
      state.modalOpen = false;
      elements.modal.hidden = true;
      elements.modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      state.activeSample = null;
      state.modalItems = [];
      state.modalIndex = 0;
    }

    function buildMediaList(sample) {
      const images = sample.assets.images.map((url) => ({ type: "image", url }));
      const videos = sample.assets.videos.map((url) => ({ type: "video", url }));
      return {
        images,
        videos,
        all: videos.concat(images),
      };
    }

    function rebuildModalItems() {
      if (!state.activeSample) {
        return;
      }
      const media = buildMediaList(state.activeSample);
      state.modalItems = media[state.activeTab] || [];
      if (state.modalItems.length === 0 && state.activeTab !== "all") {
        state.activeTab = "all";
        state.modalItems = media.all;
      }
      if (state.modalItems.length === 0) {
        state.modalItems = [{ type: "placeholder", url: "" }];
      }
      if (state.modalIndex >= state.modalItems.length) {
        state.modalIndex = 0;
      }
      renderModalViewer();
      renderModalThumbs();
      renderModalMetadata();
      renderModalTabs();
    }

    function renderModalTabs() {
      if (!state.activeSample) {
        return;
      }
      const media = buildMediaList(state.activeSample);
      const tabButtons = elements.modalTabs.querySelectorAll("[data-tab]");
      tabButtons.forEach((btn) => {
        const tab = btn.getAttribute("data-tab");
        btn.classList.toggle("active", tab === state.activeTab);
        if (tab === "images") {
          btn.disabled = media.images.length === 0;
        } else if (tab === "videos") {
          btn.disabled = media.videos.length === 0;
        } else {
          btn.disabled = media.all.length === 0;
        }
      });
    }

    function renderModalViewer() {
      elements.modalViewer.textContent = "";
      const item = state.modalItems[state.modalIndex];
      if (!item) {
        elements.modalIndicator.textContent = "0 / 0";
        return;
      }

      if (item.type === "video") {
        const video = document.createElement("video");
        video.controls = true;
        video.preload = "none";
        video.playsInline = true;
        video.src = item.url;
        const poster = getSampleThumb(state.activeSample);
        video.poster = poster;
        video.onerror = function () {
          elements.modalViewer.textContent = "";
          elements.modalViewer.appendChild(createImage("", "Video unavailable", false));
        };
        elements.modalViewer.appendChild(video);
      } else {
        const alt = `${state.activeSample.name} media ${state.modalIndex + 1}`;
        const img = createImage(item.url, alt, false);
        elements.modalViewer.appendChild(img);
      }

      elements.modalIndicator.textContent = `${state.modalIndex + 1} / ${state.modalItems.length}`;
    }

    function renderModalThumbs() {
      elements.modalThumbs.textContent = "";
      state.modalItems.forEach((item, index) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `media-thumb${state.modalIndex === index ? " active" : ""}`;
        btn.addEventListener("click", function () {
          state.modalIndex = index;
          renderModalViewer();
          renderModalThumbs();
        });

        if (item.type === "video") {
          const badge = document.createElement("span");
          badge.className = "badge";
          badge.textContent = "VIDEO";
          btn.appendChild(badge);
        } else {
          btn.appendChild(createImage(item.url, "Media thumb", true));
        }

        elements.modalThumbs.appendChild(btn);
      });
    }

    function renderModalMetadata() {
      if (!state.activeSample) {
        return;
      }
      const sample = state.activeSample;
      const rows = [
        ["ID", sample.id],
        ["Name", sample.name],
        ["Category", sample.category],
        ["Location", sample.location],
        ["Resolution", sample.resolution],
        ["Duration", formatDuration(sample.duration_sec)],
        ["COLMAP", sample.assets.colmap ? "Included" : "Not Included"],
        ["Gaussian Outputs", sample.assets.gaussian_outputs.join(", ") || "N/A"],
        ["Tags", sample.tags.join(", ") || "N/A"],
      ];

      elements.modalMetadata.textContent = "";
      rows.forEach((row) => {
        const wrapper = document.createElement("div");
        const dt = document.createElement("dt");
        dt.textContent = row[0];
        const dd = document.createElement("dd");
        dd.textContent = textOrFallback(row[1]);
        wrapper.appendChild(dt);
        wrapper.appendChild(dd);
        elements.modalMetadata.appendChild(wrapper);
      });
    }

    function renderGrid() {
      elements.grid.textContent = "";
      const hasItems = state.filtered.length > 0;
      elements.empty.hidden = hasItems;

      if (!hasItems) {
        return;
      }

      state.filtered.forEach((sample) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "gallery-card";
        card.setAttribute("data-id", sample.id);

        const media = document.createElement("div");
        media.className = "gallery-card-media";
        media.appendChild(createImage(getSampleThumb(sample), `${sample.name} thumbnail`, true));

        const body = document.createElement("div");
        body.className = "gallery-card-body";

        const id = document.createElement("p");
        id.className = "gallery-card-id";
        id.textContent = sample.id;

        const title = document.createElement("h3");
        title.className = "gallery-card-title";
        title.textContent = sample.name;

        const meta = document.createElement("p");
        meta.className = "gallery-card-meta";
        meta.textContent = `${sample.category} · ${sample.resolution} · ${formatDuration(
          sample.duration_sec
        )}`;

        body.appendChild(id);
        body.appendChild(title);
        body.appendChild(meta);

        if (sample.tags.length > 0) {
          const tagRow = document.createElement("div");
          tagRow.className = "tag-row";
          sample.tags.slice(0, 3).forEach((tag) => {
            const span = document.createElement("span");
            span.className = "tag";
            span.textContent = tag;
            tagRow.appendChild(span);
          });
          body.appendChild(tagRow);
        }

        card.appendChild(media);
        card.appendChild(body);
        card.addEventListener("click", function () {
          openModal(sample);
        });
        elements.grid.appendChild(card);
      });
    }

    function attachEvents() {
      elements.search.addEventListener("input", function (event) {
        state.query = event.target.value || "";
        applyFilters();
      });

      if (elements.reset) {
        elements.reset.addEventListener("click", function () {
          state.query = "";
          state.category = "All";
          elements.search.value = "";
          renderFilters();
          applyFilters();
        });
      }

      elements.modalClose.addEventListener("click", closeModal);
      elements.modal.addEventListener("click", function (event) {
        if (event.target && event.target.hasAttribute("data-close-modal")) {
          closeModal();
        }
      });

      elements.modalTabs.querySelectorAll("[data-tab]").forEach((btn) => {
        btn.addEventListener("click", function () {
          const tab = btn.getAttribute("data-tab");
          if (!tab) {
            return;
          }
          state.activeTab = tab;
          state.modalIndex = 0;
          rebuildModalItems();
        });
      });

      elements.modalPrev.addEventListener("click", function () {
        if (state.modalItems.length <= 1) {
          return;
        }
        state.modalIndex = (state.modalIndex - 1 + state.modalItems.length) % state.modalItems.length;
        renderModalViewer();
        renderModalThumbs();
      });

      elements.modalNext.addEventListener("click", function () {
        if (state.modalItems.length <= 1) {
          return;
        }
        state.modalIndex = (state.modalIndex + 1) % state.modalItems.length;
        renderModalViewer();
        renderModalThumbs();
      });

      document.addEventListener("keydown", function (event) {
        if (!state.modalOpen) {
          return;
        }
        if (event.key === "Escape") {
          closeModal();
        }
        if (event.key === "ArrowLeft") {
          elements.modalPrev.click();
        }
        if (event.key === "ArrowRight") {
          elements.modalNext.click();
        }
      });
    }

    function setSamples(newSamples) {
      state.samples = toSafeArray(newSamples).map(normalizeSample);
      categories.clear();
      categories.add("All");
      state.samples.forEach((item) => categories.add(item.category));
      state.category = "All";
      state.query = "";
      if (elements.search) {
        elements.search.value = "";
      }
      renderFilters();
      applyFilters();
    }

    renderFilters();
    applyFilters();
    attachEvents();

    return {
      setSamples,
      getSamples: function () {
        return state.samples.slice();
      },
      openSampleById: function (id) {
        const sample = state.samples.find((item) => item.id === id);
        if (sample) {
          openModal(sample);
        }
      },
    };
  }

  window.GUAVUTGallery = {
    initGallery,
    formatDuration,
    createPlaceholderDataUri,
  };
})();
