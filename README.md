# PKU-GS Website

Academic project website for:

**PKU-GS**  
**A Gaussian Splatting Compression Dataset for Large-Scale Scene Modeling with UAVs**

## Stack

- Next.js (App Router)
- React
- Tailwind CSS
- lucide-react
- framer-motion

## Development

```bash
npm install
npm run dev
```

## Production Export

This project is configured for static export and GitHub Pages.

```bash
npm run build
```

The generated static site will be written to `out/`.

## Asset Notes

The site expects public assets under:

- `public/videos/*-1080p.mp4`
- `public/images/hero/hero-cover.jpg`
- `public/images/show/`

Local source material from `/Users/y/PKUGS/video/` and `/Users/y/PKUGS/photo/show/` has already been copied into those public directories for the current implementation.
