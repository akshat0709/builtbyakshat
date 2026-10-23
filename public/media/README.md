# Real Media Slots Guide

This directory holds screenshots, demonstration clips, and portraits for Akshat Gupta's products and builder profile.

## Directory Structure
```
public/media/
├── me/
│   └── portrait.webp          # Personal portrait (optional)
├── orange-taxi/
│   ├── screenshot-1.webp      # Dispatch map / PWA view
│   ├── screenshot-2.webp      # Dynamic UPI QR payment screen
│   ├── poster.webp            # Video poster frame
│   └── demo.mp4               # 10-20s looping muted demo
├── autonomous-rescue-robot/
│   ├── screenshot-1.webp      # Telemetry & obstacle sensing view
│   └── screenshot-2.webp      # Hardware chassis / sensor bus
└── animal-detection/
    ├── screenshot-1.webp      # YOLO detection bounding boxes on rail tracks
    └── screenshot-2.webp      # Real-time alert dispatch console
```

---

## Recommended Dimensions & Formats

### 1. Portrait Photo (`public/media/me/`)
- **File Name**: `portrait.webp` (or `portrait.png` / `portrait.jpg`)
- **Aspect Ratio**: `4:5` or `3:4`
- **Resolution**: `800 × 1000 px` (minimum `400 × 500 px`)
- **Format**: WebP preferred for fast loading.
- **Behavior**: If missing or empty in `data/profile.ts` (`photo: ""`), the site renders **nothing** (no empty frames or broken placeholders).

### 2. Screenshots (`public/media/<slug>/`)
- **File Names**: `screenshot-1.webp`, `screenshot-2.webp`, etc.
- **Aspect Ratio**: `16:9` or `16:10`
- **Resolution**: `1920 × 1080 px` or `1280 × 800 px`
- **Max File Size**: `< 300 KB` per image (compressed WebP).
- **Registration**: Add to `media.screenshots` array in `data/products.ts`.

### 3. Demo Video (`public/media/<slug>/`)
- **File Name**: `demo.mp4`
- **Duration**: `10–20 seconds` (short, punchy loop).
- **Format**: MP4 (H.264 video codec, AAC audio or muted).
- **Settings**: Muted, playsinline, loop.
- **File Size**: `< 8 MB`.
- **Poster Frame**: `poster.webp` (`1920 × 1080 px`, displayed before video loads).
- **Accessibility**: Automatically pauses when visitor has `prefers-reduced-motion` enabled.
