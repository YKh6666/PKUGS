# PKUGS Static Dataset Website

This is a pure HTML/CSS/JavaScript single-page website for:

**PKUGS Gaussian Splatting Compression Dataset for Large-Scale Scene Modeling with UAVs**

The page is GitHub Pages friendly and data-driven.

## Project Structure

```text
guavut-a-site/
  index.html
  assets/
    css/styles.css
    js/main.js
    js/gallery.js
    data/site.json
    data/samples.json
    data/versions.json
    img/placeholders/
    video/previews/
  README.md
```

## Quick Start

1. Open `index.html` directly in a browser.
2. If your browser blocks local JSON loading under `file://`, run a tiny local server:
   - `python3 -m http.server 8000`
   - Open `http://localhost:8000/guavut-a-site/`

## Edit Content (No HTML changes needed)

### 1) Global site metadata

Edit `assets/data/site.json`:

- `title`
- `full_name`
- `keywords[]`
- `arxiv_url`
- `public_download_url`
- `contact_email`
- `hero_items[]` (optional sample IDs used in hero thumbnails)
- `socials[]` (optional)

### 2) Hero + Gallery data

Edit `assets/data/samples.json`.

Each item schema:

```json
{
  "id": "1-01",
  "name": "Example Scene Name",
  "category": "Architecture",
  "location": "Optional",
  "resolution": "3840x2160",
  "duration_sec": 12.3,
  "assets": {
    "thumb": "assets/img/placeholders/thumb1.webp",
    "images": ["assets/img/placeholders/sample1_a.webp"],
    "videos": ["assets/video/previews/demo1.mp4"],
    "colmap": true,
    "gaussian_outputs": ["ply", "ckpt"]
  },
  "tags": ["UAV", "large-scale"]
}
```

### 3) Versions / changelog

Edit `assets/data/versions.json`:

```json
{
  "version": "v1.0",
  "date": "2026-02-08",
  "notes": ["Initial release"],
  "public_download_url": "TODO"
}
```

## Replace Placeholder Media

- Place WebP thumbnails/images in `assets/img/placeholders/`.
- Place short MP4/WebM previews in `assets/video/previews/`.
- Update file paths in `samples.json`.

Tips:

- Keep thumbnails lightweight (`.webp`).
- Keep preview videos short and small.
- Cards use lazy-loading; modal videos use `preload="none"`.

## UI Customization

Edit CSS variables at the top of `assets/css/styles.css`.
All theme variables are marked with `TODO_CHANGE_ME` comments.

## Deploy to GitHub Pages

1. Push this folder to your GitHub repository.
2. In GitHub: `Settings` -> `Pages`.
3. Set source branch (for example `main`) and root directory.
4. Save and wait for deployment.
5. Your site will be served as static files (no backend required).

## Notes

- The page is English-only by design.
- Gallery filters/categories are generated from `samples.json`.
- Hero showcase is generated from `site.json` + `samples.json`.
- Versions list is generated from `versions.json`.
