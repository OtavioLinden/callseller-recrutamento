# Callseller Recrutamento — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an Apple-tier animated recruitment landing page for CallSeller at `/trabalheconosco`, deployed to Vercel, with WhatsApp as the sole conversion path.

**Architecture:** Vite + React SPA. Tailwind (utility) + CSS vars from existing design system. GSAP + ScrollTrigger + Lenis for scroll choreography. Framer Motion for component reveals. Three.js + React Three Fiber for hero WebGL + CTA-final particles. ffmpeg to pre-transcode videos. Static build → Vercel.

**Tech Stack:** Vite · React 18 · Tailwind CSS v3 · GSAP + ScrollTrigger · Lenis · Framer Motion · Three.js + @react-three/fiber + @react-three/drei · lucide-react · Vitest + React Testing Library (for logic only) · ffmpeg (build-time).

**Assumptions:**
- Node 18+ installed
- ffmpeg installed and on PATH (we check in Task 1.1)
- Git installed
- Working directory: `C:/Users/Usuario/Documents/Claude/Site Callseller/`

**Testing strategy:**
- Unit-test logic (hooks, helpers, VideoPlayer state transitions) with Vitest
- Skip tests for pure visual/layout components (dev server + manual check)
- Final QA: Lighthouse audit + manual mobile check

**Commit cadence:** after each task group (≈ every 4-10 steps).

---

## Phase 0: Scaffold project

### Task 0.1: Initialize git repo and .gitignore

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Init git (not a repo yet)**

Run from project root:
```bash
git init -b main
git config user.email "tatolinden@gmail.com"
git config user.name "Tato Linden"
```

- [ ] **Step 2: Write `.gitignore`**

```gitignore
# Dependencies
node_modules/
.pnpm-store/

# Build outputs
dist/
build/
.vercel/

# Env
.env
.env.*.local

# Editor
.vscode/
.idea/
*.swp
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Cache
.cache/
.parcel-cache/
.vite/

# Test coverage
coverage/
*.lcov

# AIOX workspace leftovers (kept out of git for now)
.aiox-core/
.claude/settings.local.json

# Transcoded videos (regenerated from originals) — but commit the originals' posters
# We actually DO want to commit public/videos so Vercel can deploy them.
# Keep the source originals out:
Infos\ site\ Callseller/Videos\ originais/
```

- [ ] **Step 3: First commit (empty baseline)**

```bash
git add .gitignore CLAUDE.md "Infos site Callseller/" "docs/"
git commit -m "chore: initial project state with brand assets + design spec"
```

Expected: ~200 files committed (design system + assets + specs + plans). If the `Infos site Callseller/Videos originais/` folder is huge (>200MB), add it to .gitignore first and amend.

---

### Task 0.2: Initialize Vite + React app

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`

- [ ] **Step 1: Scaffold Vite**

```bash
npm create vite@latest . -- --template react
```

When prompted about existing files, choose "Ignore files and continue" (we keep `Infos site Callseller/`, `docs/`, `CLAUDE.md`, `.gitignore`).

- [ ] **Step 2: Install base deps**

```bash
npm install
```

- [ ] **Step 3: Verify dev server runs**

```bash
npm run dev
```

Expected: Vite reports running at `http://localhost:5173/`. Open browser → should see React default splash. Kill with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json vite.config.js index.html src/ public/ eslint.config.js
git commit -m "chore: scaffold Vite + React app"
```

---

### Task 0.3: Install runtime dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install animation/3D/UI libs**

```bash
npm install gsap lenis framer-motion three @react-three/fiber @react-three/drei lucide-react
```

- [ ] **Step 2: Install Tailwind + PostCSS + autoprefixer**

```bash
npm install -D tailwindcss@^3 postcss autoprefixer
npx tailwindcss init -p
```

- [ ] **Step 3: Install test deps**

```bash
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 4: Verify installation**

```bash
npm ls gsap lenis framer-motion three @react-three/fiber lucide-react tailwindcss vitest
```

Expected: all packages resolve without UNMET PEER DEPENDENCY errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json tailwind.config.js postcss.config.js
git commit -m "chore: install runtime + test dependencies"
```

---

### Task 0.4: Configure Tailwind + import design tokens

**Files:**
- Modify: `tailwind.config.js`
- Create: `src/styles/colors_and_type.css` (copy from `Infos site Callseller/`)
- Create: `src/styles/globals.css`
- Modify: `src/main.jsx`
- Delete: `src/App.css`, `src/index.css` (Vite defaults)

- [ ] **Step 1: Copy design tokens**

```bash
cp "Infos site Callseller/colors_and_type.css" "src/styles/colors_and_type.css"
```

- [ ] **Step 2: Write `tailwind.config.js`**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'cs-green': {
          50: 'var(--cs-green-50)',
          100: 'var(--cs-green-100)',
          200: 'var(--cs-green-200)',
          300: 'var(--cs-green-300)',
          400: 'var(--cs-green-400)',
          500: 'var(--cs-green-500)',
          600: 'var(--cs-green-600)',
          700: 'var(--cs-green-700)',
          800: 'var(--cs-green-800)',
          900: 'var(--cs-green-900)',
          950: 'var(--cs-green-950)',
        },
        'cs-ink': {
          0: 'var(--cs-ink-0)',
          50: 'var(--cs-ink-50)',
          100: 'var(--cs-ink-100)',
          200: 'var(--cs-ink-200)',
          300: 'var(--cs-ink-300)',
          400: 'var(--cs-ink-400)',
          500: 'var(--cs-ink-500)',
          600: 'var(--cs-ink-600)',
          700: 'var(--cs-ink-700)',
          800: 'var(--cs-ink-800)',
          900: 'var(--cs-ink-900)',
          1000: 'var(--cs-ink-1000)',
        },
      },
      fontFamily: {
        display: ['Barlow Condensed', 'Oswald', 'Impact', 'sans-serif'],
        body: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-green-sm': 'var(--glow-green-sm)',
        'glow-green-md': 'var(--glow-green-md)',
        'glow-green-lg': 'var(--glow-green-lg)',
      },
      borderRadius: {
        'xs': '4px',
        'pill': '999px',
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 3: Write `src/styles/globals.css`**

```css
@import './colors_and_type.css';
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root {
  min-height: 100%;
}

body {
  background: var(--bg-page);
  color: var(--fg-primary);
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  overflow-x: hidden;
}

/* Lenis wrapper rules */
html.lenis, html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
.lenis.lenis-stopped {
  overflow: hidden;
}
.lenis.lenis-scrolling iframe {
  pointer-events: none;
}

/* Utility: text selection */
::selection {
  background: var(--cs-green-500);
  color: var(--fg-on-accent);
}
```

- [ ] **Step 4: Rewrite `src/main.jsx`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 5: Delete Vite defaults**

```bash
rm src/App.css src/index.css src/assets/react.svg
```

- [ ] **Step 6: Minimal App.jsx placeholder**

```jsx
export default function App() {
  return (
    <div className="min-h-screen bg-cs-ink-0 text-cs-ink-900 flex items-center justify-center">
      <h1 className="font-display uppercase text-6xl text-cs-green-500 shadow-glow-green-md">
        CallSeller
      </h1>
    </div>
  );
}
```

- [ ] **Step 7: Verify Tailwind + tokens work**

```bash
npm run dev
```

Expected: black page, green "CALLSELLER" text with glow. Confirms tokens and Tailwind are wired.

- [ ] **Step 8: Commit**

```bash
git add tailwind.config.js postcss.config.js src/styles/ src/main.jsx src/App.jsx package.json
git rm src/App.css src/index.css src/assets/react.svg 2>/dev/null || true
git commit -m "feat: wire Tailwind + import brand tokens"
```

---

### Task 0.5: Configure Vitest

**Files:**
- Modify: `vite.config.js`
- Create: `src/test/setup.js`
- Modify: `package.json` (add scripts)

- [ ] **Step 1: Update `vite.config.js`**

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: false,
  },
});
```

- [ ] **Step 2: Create `src/test/setup.js`**

```javascript
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom lacks IntersectionObserver — polyfill a no-op
class IntersectionObserverMock {
  constructor(cb) { this.cb = cb; }
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.IntersectionObserver = IntersectionObserverMock;

// jsdom lacks matchMedia — polyfill
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

- [ ] **Step 3: Add test scripts to `package.json`**

Edit the `"scripts"` block:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:ui": "vitest --ui"
}
```

- [ ] **Step 4: Smoke test**

Create `src/App.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders the CallSeller brand text', () => {
  render(<App />);
  expect(screen.getByText(/CallSeller/i)).toBeInTheDocument();
});
```

Run:
```bash
npm test
```

Expected: 1 test passes.

- [ ] **Step 5: Commit**

```bash
git add vite.config.js src/test/ src/App.test.jsx package.json package-lock.json
git commit -m "chore: configure Vitest with jsdom + smoke test"
```

---

### Task 0.6: Copy static assets to public/

**Files:**
- Create: `public/assets/` (logos, photos, hero plates, favicon)

- [ ] **Step 1: Create folder structure and copy assets**

```bash
mkdir -p public/assets public/videos
cp "Infos site Callseller/assets/"*.png "public/assets/"
cp "Infos site Callseller/assets/office-photo.jpeg" "public/assets/"
```

- [ ] **Step 2: Create favicon from logo mark**

We need an SVG favicon. Use the logo-mark-white.png resized. Quick-and-clean: copy the PNG as-is and reference it.

```bash
cp "Infos site Callseller/assets/logo-mark-white.png" "public/favicon.png"
```

- [ ] **Step 3: Delete Vite's default favicon**

```bash
rm -f public/vite.svg
```

- [ ] **Step 4: Verify**

```bash
ls public/assets/
```

Expected output includes: `logo-horizontal-black.png`, `logo-horizontal-white.png`, `logo-mark-black.png`, `logo-mark-white.png`, `office-photo.jpeg`, `recrutamento-3d-dark.png`, `recrutamento-3d-vignette.png`, `recrutamento-flat.png`, `recrutamento-radial.png`.

- [ ] **Step 5: Commit**

```bash
git add public/
git commit -m "chore: copy brand assets to public/"
```

---

## Phase 1: Video transcoding

### Task 1.1: Write transcode script

**Files:**
- Create: `scripts/transcode-videos.sh`

- [ ] **Step 1: Verify ffmpeg is available**

```bash
ffmpeg -version
```

Expected: ffmpeg prints version info. If "command not found", install via Chocolatey on Windows: `choco install ffmpeg` — user may need to do this manually if they don't have it.

- [ ] **Step 2: Write `scripts/transcode-videos.sh`**

```bash
#!/usr/bin/env bash
# Transcode source videos into web-optimized MP4s + poster images.
# Run once (or whenever source videos change). Outputs go to public/videos/.
set -euo pipefail

SRC_APRESENTACOES="Infos site Callseller/Videos originais"
SRC_DEPOIMENTOS="Infos site Callseller/assets/videos"
DEST="public/videos"

mkdir -p "$DEST"

transcode() {
  local src="$1"        # path to source mp4
  local basename="$2"   # e.g. "apresentacao1"

  echo "== Transcoding $basename =="

  # Desktop: 1080p, CRF 23, AAC 128k, ~3 Mbps
  ffmpeg -y -i "$src" \
    -vf "scale='min(1920,iw)':'-2'" \
    -c:v libx264 -preset slow -crf 23 -profile:v high -level 4.1 \
    -c:a aac -b:a 128k -movflags +faststart \
    "$DEST/${basename}-desktop.mp4"

  # Mobile: 720p, CRF 26, AAC 96k, ~1.5 Mbps
  ffmpeg -y -i "$src" \
    -vf "scale='min(1280,iw)':'-2'" \
    -c:v libx264 -preset slow -crf 26 -profile:v main -level 4.0 \
    -c:a aac -b:a 96k -movflags +faststart \
    "$DEST/${basename}-mobile.mp4"

  # Poster: frame at 1/3 of duration (avoids black frames at start/end)
  local dur
  dur=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$src")
  local seek
  seek=$(awk -v d="$dur" 'BEGIN { printf "%.3f", d / 3 }')
  ffmpeg -y -ss "$seek" -i "$src" -vframes 1 -q:v 3 \
    -vf "scale='min(1920,iw)':'-2'" \
    "$DEST/${basename}-poster.jpg"
}

# Apresentações (fonte: originais pesados)
transcode "$SRC_APRESENTACOES/apresentacao1.mp4" "apresentacao1"
transcode "$SRC_APRESENTACOES/apresentacao2.mp4" "apresentacao2"

# Depoimentos (fonte: já comprimidos, mas re-encodamos pra padronizar formato/bitrate)
transcode "$SRC_DEPOIMENTOS/depoimento1.mp4" "depoimento1"
transcode "$SRC_DEPOIMENTOS/depoimento2.mp4" "depoimento2"

echo ""
echo "Done. Outputs in $DEST:"
ls -lah "$DEST"
```

- [ ] **Step 3: Add npm script**

Edit `package.json` scripts:

```json
"scripts": {
  ...,
  "transcode-videos": "bash scripts/transcode-videos.sh"
}
```

- [ ] **Step 4: Make script executable (on Unix-like; no-op on Windows but safe)**

```bash
chmod +x scripts/transcode-videos.sh 2>/dev/null || true
```

- [ ] **Step 5: Commit**

```bash
git add scripts/ package.json
git commit -m "chore: add video transcode script"
```

---

### Task 1.2: Run transcode + commit outputs

**Files:**
- Create: `public/videos/*.mp4`, `public/videos/*.jpg`

- [ ] **Step 1: Execute transcode**

```bash
npm run transcode-videos
```

Expected: ~5-15 min depending on CPU. Outputs in `public/videos/`:
- `apresentacao1-desktop.mp4`, `apresentacao1-mobile.mp4`, `apresentacao1-poster.jpg`
- `apresentacao2-desktop.mp4`, `apresentacao2-mobile.mp4`, `apresentacao2-poster.jpg`
- `depoimento1-desktop.mp4`, `depoimento1-mobile.mp4`, `depoimento1-poster.jpg`
- `depoimento2-desktop.mp4`, `depoimento2-mobile.mp4`, `depoimento2-poster.jpg`

- [ ] **Step 2: Verify sizes are reasonable**

```bash
du -h public/videos/*.mp4
```

Expected: desktop versions ~8-20MB each, mobile versions ~3-8MB each. If any desktop is >40MB, increase CRF to 25 and re-run just that one.

- [ ] **Step 3: Commit outputs**

```bash
git add public/videos/
git commit -m "build: transcode videos for web (desktop+mobile+poster)"
```

---

## Phase 2: Core infrastructure (hooks + helpers + primitives)

### Task 2.1: `useInView` hook

**Files:**
- Create: `src/hooks/useInView.js`
- Test: `src/hooks/useInView.test.js`

- [ ] **Step 1: Write the failing test**

```javascript
import { renderHook, act } from '@testing-library/react';
import { useInView } from './useInView';
import { vi } from 'vitest';

describe('useInView', () => {
  let observerCallback;
  let observedElement;

  beforeEach(() => {
    observerCallback = null;
    observedElement = null;
    global.IntersectionObserver = class {
      constructor(cb) { observerCallback = cb; }
      observe(el) { observedElement = el; }
      unobserve() {}
      disconnect() {}
    };
  });

  it('returns isInView=false initially', () => {
    const { result } = renderHook(() => useInView());
    expect(result.current.isInView).toBe(false);
  });

  it('updates to true when observer fires with isIntersecting', () => {
    const { result } = renderHook(() => useInView());
    // Simulate ref being attached
    act(() => { result.current.ref.current = document.createElement('div'); });
    // Trigger observer callback manually
    act(() => { observerCallback?.([{ isIntersecting: true }]); });
    expect(result.current.isInView).toBe(true);
  });

  it('once=true keeps isInView true after leaving viewport', () => {
    const { result } = renderHook(() => useInView({ once: true }));
    act(() => { result.current.ref.current = document.createElement('div'); });
    act(() => { observerCallback?.([{ isIntersecting: true }]); });
    expect(result.current.isInView).toBe(true);
    act(() => { observerCallback?.([{ isIntersecting: false }]); });
    expect(result.current.isInView).toBe(true);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npm test src/hooks/useInView.test.js
```

Expected: "Cannot find module './useInView'".

- [ ] **Step 3: Implement `useInView.js`**

```javascript
import { useEffect, useRef, useState } from 'react';

/**
 * Observe whether a ref'd element is in the viewport.
 * @param {object} opts
 * @param {number} [opts.threshold=0.3] — IntersectionObserver threshold
 * @param {boolean} [opts.once=false] — if true, once isInView becomes true it stays true
 */
export function useInView({ threshold = 0.3, once = false } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsInView(true);
        if (once) observer.unobserve(el);
      } else if (!once) {
        setIsInView(false);
      }
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isInView };
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
npm test src/hooks/useInView.test.js
```

Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useInView.js src/hooks/useInView.test.js
git commit -m "feat(hook): useInView with threshold + once option"
```

---

### Task 2.2: `usePrefersReducedMotion` hook

**Files:**
- Create: `src/hooks/usePrefersReducedMotion.js`
- Test: `src/hooks/usePrefersReducedMotion.test.js`

- [ ] **Step 1: Write the failing test**

```javascript
import { renderHook, act } from '@testing-library/react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { vi } from 'vitest';

describe('usePrefersReducedMotion', () => {
  it('returns false when matchMedia reports no preference', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });

  it('returns true when matchMedia reports reduced motion', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npm test src/hooks/usePrefersReducedMotion.test.js
```

- [ ] **Step 3: Implement**

```javascript
import { useEffect, useState } from 'react';

export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
npm test src/hooks/usePrefersReducedMotion.test.js
```

- [ ] **Step 5: Commit**

```bash
git add src/hooks/usePrefersReducedMotion.js src/hooks/usePrefersReducedMotion.test.js
git commit -m "feat(hook): usePrefersReducedMotion"
```

---

### Task 2.3: `countUp` helper

**Files:**
- Create: `src/lib/countUp.js`
- Test: `src/lib/countUp.test.js`

- [ ] **Step 1: Write the failing test**

```javascript
import { formatCount, easeOutCubic } from './countUp';

describe('countUp', () => {
  describe('easeOutCubic', () => {
    it('returns 0 at t=0', () => { expect(easeOutCubic(0)).toBe(0); });
    it('returns 1 at t=1', () => { expect(easeOutCubic(1)).toBe(1); });
    it('is monotonic', () => {
      expect(easeOutCubic(0.5)).toBeGreaterThan(easeOutCubic(0.25));
    });
  });
  describe('formatCount', () => {
    it('formats integers with thousands separator (pt-BR)', () => {
      expect(formatCount(1000, 'integer')).toBe('1.000');
      expect(formatCount(7000000, 'integer')).toBe('7.000.000');
    });
    it('formats currency (pt-BR)', () => {
      expect(formatCount(7000000, 'currency-millions')).toBe('R$ 7 MILHÕES');
    });
    it('formats years', () => {
      expect(formatCount(7, 'years')).toBe('7 ANOS');
    });
    it('formats plain with prefix', () => {
      expect(formatCount(100, 'plain', '+')).toBe('+100');
    });
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

- [ ] **Step 3: Implement `src/lib/countUp.js`**

```javascript
export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Format a numeric value into a display string.
 * @param {number} value
 * @param {'integer'|'currency-millions'|'years'|'plain'} format
 * @param {string} [prefix='']
 */
export function formatCount(value, format, prefix = '') {
  const rounded = Math.round(value);
  switch (format) {
    case 'integer': {
      const str = rounded.toLocaleString('pt-BR');
      return `${prefix}${str}`;
    }
    case 'currency-millions': {
      const millions = Math.round(rounded / 1_000_000);
      return `R$ ${millions} MILHÕES`;
    }
    case 'years': {
      return `${rounded} ${rounded === 1 ? 'ANO' : 'ANOS'}`;
    }
    case 'plain':
    default:
      return `${prefix}${rounded}`;
  }
}

/**
 * Animate a count-up. Calls onTick with the current value each frame.
 * Returns a cancel function.
 */
export function animateCount({ from = 0, to, duration = 800, onTick, onDone }) {
  const start = performance.now();
  let raf = 0;
  const step = (now) => {
    const elapsed = now - start;
    const t = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(t);
    const current = from + (to - from) * eased;
    onTick(current);
    if (t < 1) {
      raf = requestAnimationFrame(step);
    } else {
      onDone?.();
    }
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
npm test src/lib/countUp.test.js
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/countUp.js src/lib/countUp.test.js
git commit -m "feat(lib): countUp helpers (easing + formatter + animator)"
```

---

### Task 2.4: Lenis smooth scroll setup

**Files:**
- Create: `src/lib/smoothScroll.js`

- [ ] **Step 1: Write `smoothScroll.js`**

```javascript
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

/**
 * Initialize Lenis + wire it to GSAP ScrollTrigger. Returns the Lenis instance.
 * Safe to call multiple times — returns the same instance.
 */
export function initSmoothScroll() {
  if (lenisInstance) return lenisInstance;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  lenisInstance = lenis;
  return lenis;
}

/**
 * Destroy Lenis (for teardown / SSR / tests).
 */
export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

/**
 * Scroll to a selector using Lenis (falls back to native if Lenis not initialized).
 */
export function scrollToSelector(selector, opts = {}) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -80, duration: 1.5, ...opts });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
```

- [ ] **Step 2: No tests for this module (it's a thin wrapper; integration-tested in App)**

- [ ] **Step 3: Commit**

```bash
git add src/lib/smoothScroll.js
git commit -m "feat(lib): Lenis smooth scroll + GSAP ScrollTrigger integration"
```

---

### Task 2.5: `Icon` component wrapper

**Files:**
- Create: `src/components/Icon.jsx`

- [ ] **Step 1: Write `Icon.jsx`**

```jsx
import * as LucideIcons from 'lucide-react';

/**
 * Icon wrapper around lucide-react. Forces brand defaults:
 *  - stroke 1.75px
 *  - rounded caps
 *  - line only (never fill)
 *
 * Usage: <Icon name="shield-check" size={24} className="text-cs-green-500" />
 *
 * name: PascalCase or kebab-case Lucide icon name.
 */
export function Icon({ name, size = 24, className = '', ...rest }) {
  const pascal = name
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  const Cmp = LucideIcons[pascal];
  if (!Cmp) {
    console.warn(`[Icon] Unknown lucide icon: ${name} (resolved as ${pascal})`);
    return null;
  }
  return (
    <Cmp
      size={size}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    />
  );
}
```

- [ ] **Step 2: Smoke test**

Create `src/components/Icon.test.jsx`:

```jsx
import { render } from '@testing-library/react';
import { Icon } from './Icon';

test('renders a known lucide icon', () => {
  const { container } = render(<Icon name="shield-check" />);
  expect(container.querySelector('svg')).toBeInTheDocument();
});

test('warns on unknown icon name', () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  const { container } = render(<Icon name="this-does-not-exist" />);
  expect(container.querySelector('svg')).toBeNull();
  expect(warn).toHaveBeenCalled();
  warn.mockRestore();
});
```

Run:
```bash
npm test src/components/Icon.test.jsx
```

Expected: 2 tests pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/Icon.jsx src/components/Icon.test.jsx
git commit -m "feat(component): Icon wrapper with brand stroke defaults"
```

---

### Task 2.6: `VideoPlayer` component

**Files:**
- Create: `src/components/VideoPlayer.jsx`
- Test: `src/components/VideoPlayer.test.jsx`

This component handles two modes: `autoplay` (muted loop, plays on scroll-in) and `click` (poster until click, then unmuted fullscreen).

- [ ] **Step 1: Write the failing test**

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { VideoPlayer } from './VideoPlayer';

describe('VideoPlayer', () => {
  const defaultProps = {
    desktopSrc: '/videos/test-desktop.mp4',
    mobileSrc: '/videos/test-mobile.mp4',
    poster: '/videos/test-poster.jpg',
    ariaLabel: 'Vídeo de teste',
  };

  it('autoplay mode: renders <video> with muted+loop+playsInline', () => {
    const { container } = render(<VideoPlayer {...defaultProps} mode="autoplay" />);
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video.muted).toBe(true);
    expect(video.hasAttribute('loop')).toBe(true);
    expect(video.hasAttribute('playsinline')).toBe(true);
  });

  it('click mode: shows play button and poster before click', () => {
    render(<VideoPlayer {...defaultProps} mode="click" />);
    expect(screen.getByRole('button', { name: /reproduzir/i })).toBeInTheDocument();
  });

  it('click mode: clicking play button starts the video', () => {
    const { container } = render(<VideoPlayer {...defaultProps} mode="click" />);
    const btn = screen.getByRole('button', { name: /reproduzir/i });
    const video = container.querySelector('video');
    // jsdom video doesn't actually play — we just check the call was made
    video.play = vi.fn().mockResolvedValue();
    fireEvent.click(btn);
    expect(video.play).toHaveBeenCalled();
  });

  it('renders 2 <source> tags (desktop + mobile)', () => {
    const { container } = render(<VideoPlayer {...defaultProps} mode="autoplay" />);
    const sources = container.querySelectorAll('source');
    expect(sources.length).toBe(2);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

- [ ] **Step 3: Implement `VideoPlayer.jsx`**

```jsx
import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Icon } from './Icon';

/**
 * VideoPlayer — handles both autoplay-muted-loop and click-to-play modes.
 *
 * Props:
 *  - desktopSrc, mobileSrc: mp4 URLs
 *  - poster: JPG URL
 *  - mode: 'autoplay' | 'click'
 *  - ariaLabel: string — describes the video for screen readers
 *  - className: optional wrapper class
 */
export function VideoPlayer({
  desktopSrc,
  mobileSrc,
  poster,
  mode = 'click',
  ariaLabel,
  className = '',
}) {
  const videoRef = useRef(null);
  const { ref: containerRef, isInView } = useInView({ threshold: 0.5 });
  const [playing, setPlaying] = useState(false);

  // Autoplay mode: play/pause based on viewport visibility
  useEffect(() => {
    if (mode !== 'autoplay') return;
    const vid = videoRef.current;
    if (!vid) return;
    if (isInView) {
      vid.play().catch(() => { /* browser blocked autoplay — ignore */ });
    } else {
      vid.pause();
    }
  }, [mode, isInView]);

  const handleClick = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (mode === 'click' && !playing) {
      vid.muted = false;
      vid.controls = true;
      vid.play().catch(() => {});
      if (vid.requestFullscreen) {
        vid.requestFullscreen().catch(() => {});
      }
      setPlaying(true);
    } else if (mode === 'autoplay') {
      // Unmute + fullscreen on user click
      vid.muted = false;
      vid.controls = true;
      if (vid.requestFullscreen) {
        vid.requestFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl bg-black ${className}`}
      style={{ boxShadow: 'inset 0 0 0 1px var(--cs-green-500)' }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover block"
        muted
        {...(mode === 'autoplay' ? { loop: true } : {})}
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={ariaLabel}
      >
        <source media="(max-width: 768px)" src={mobileSrc} type="video/mp4" />
        <source src={desktopSrc} type="video/mp4" />
      </video>

      {mode === 'click' && !playing && (
        <button
          type="button"
          onClick={handleClick}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/0 transition-colors duration-200 ease-brand group"
          aria-label={`Reproduzir ${ariaLabel}`}
        >
          <span
            className="flex items-center justify-center w-20 h-20 rounded-full bg-cs-green-500 group-hover:scale-105 transition-transform duration-200 ease-brand"
            style={{ boxShadow: 'var(--glow-green-md)' }}
          >
            <Icon name="play" size={32} className="text-cs-ink-0 ml-1" />
          </span>
        </button>
      )}

      {mode === 'autoplay' && (
        <button
          type="button"
          onClick={handleClick}
          className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-cs-green-500/90 flex items-center justify-center hover:scale-105 transition-transform duration-200 ease-brand"
          style={{ boxShadow: 'var(--glow-green-sm)' }}
          aria-label={`Expandir e ouvir: ${ariaLabel}`}
        >
          <Icon name="maximize-2" size={20} className="text-cs-ink-0" />
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
npm test src/components/VideoPlayer.test.jsx
```

- [ ] **Step 5: Commit**

```bash
git add src/components/VideoPlayer.jsx src/components/VideoPlayer.test.jsx
git commit -m "feat(component): VideoPlayer with autoplay + click modes"
```

---

## Phase 3: App shell (Nav + Footer + layout)

### Task 3.1: Update `index.html`

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Write final `index.html`**

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#000000" />

    <title>Trabalhe Conosco — CallSeller</title>
    <meta name="description" content="Vagas de vendas home-office na CallSeller. Operação referência nacional, +R$7M recuperados/mês. Candidate-se pelo WhatsApp." />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Trabalhe Conosco — CallSeller" />
    <meta property="og:description" content="Vagas de vendas home-office na CallSeller. Operação referência nacional, +R$7M recuperados/mês." />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:locale" content="pt_BR" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Trabalhe Conosco — CallSeller" />
    <meta name="twitter:description" content="Vagas de vendas home-office na CallSeller." />
    <meta name="twitter:image" content="/og-image.png" />

    <!-- Preconnect to Google Fonts (already imported in CSS) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- Schema.org JSON-LD for Organization -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "CallSeller",
        "url": "https://callseller.com.br",
        "logo": "https://callseller.com.br/assets/logo-horizontal-white.png",
        "description": "Operação de vendas de alta performance, referência nacional no mercado digital.",
        "foundingDate": "2017",
        "address": { "@type": "PostalAddress", "addressCountry": "BR" }
      }
    </script>
  </head>
  <body>
    <a href="#operacao" class="skip-link">Pular para o conteúdo</a>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Add skip-link CSS to `globals.css`**

Append to `src/styles/globals.css`:

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--cs-green-500);
  color: var(--fg-on-accent);
  padding: 8px 16px;
  z-index: 100;
  font-weight: 700;
  border: 0;
}
.skip-link:focus {
  top: 0;
}
```

- [ ] **Step 3: Commit**

```bash
git add index.html src/styles/globals.css
git commit -m "feat: wire SEO meta + skip-link + JSON-LD"
```

---

### Task 3.2: Shared constants (WhatsApp URL, etc.)

**Files:**
- Create: `src/lib/constants.js`

- [ ] **Step 1: Write `constants.js`**

```javascript
const WHATSAPP_NUMBER = '555198282431';
const WHATSAPP_MESSAGE = 'Olá! Vi o site da CallSeller e tenho interesse em entrar pro time de vendas. Podem me passar os próximos passos?';

export const WHATSAPP_URL =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const NAV_LINKS = [
  { href: '#operacao', label: 'Operação' },
  { href: '#beneficios', label: 'Benefícios' },
  { href: '#selecao', label: 'Processo' },
  { href: '#faq', label: 'FAQ' },
];

export const COMPANY = {
  name: 'CallSeller',
  foundingYear: 2017,
  sellersCount: 100,
  partnersCount: 50,
  monthlyRecoveryBRL: 7_000_000,
  ecosystemYearlyBRL: 1_000_000_000,
  yearsOperating: new Date().getFullYear() - 2017 + 1, // approximate for "+7 anos"
};
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/constants.js
git commit -m "chore(lib): centralize WhatsApp URL + nav + company constants"
```

---

### Task 3.3: `Nav` component

**Files:**
- Create: `src/components/Nav.jsx`

- [ ] **Step 1: Implement**

```jsx
import { useEffect, useState } from 'react';
import { NAV_LINKS, WHATSAPP_URL } from '../lib/constants';
import { Icon } from './Icon';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-200 ease-brand
        ${scrolled ? 'backdrop-blur-xl bg-[rgba(10,12,10,0.65)] border-b border-white/5' : 'bg-transparent'}
      `}
      aria-label="Navegação principal"
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <a href="#top" className="flex items-center gap-2 border-0" aria-label="CallSeller — início">
          <img src="/assets/logo-mark-white.png" alt="" className="h-8 w-auto" />
          <img src="/assets/logo-horizontal-white.png" alt="CallSeller" className="h-6 w-auto hidden sm:block" />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-cs-ink-700 hover:text-cs-green-400 transition-colors duration-150 border-0"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA (desktop) */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-cs-green-500 text-cs-ink-0 rounded-lg font-bold text-sm uppercase tracking-wider border-0 hover:bg-cs-green-600 transition-all duration-150 ease-brand"
          style={{ boxShadow: 'var(--glow-green-sm)' }}
          data-cta="nav"
        >
          Quero me candidatar
          <Icon name="arrow-up-right" size={16} />
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-cs-ink-900"
          onClick={() => setMobileOpen(o => !o)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <Icon name={mobileOpen ? 'x' : 'menu'} size={24} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden backdrop-blur-xl bg-[rgba(10,12,10,0.95)] border-t border-white/5">
          <ul className="flex flex-col px-6 py-6 gap-4">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-cs-ink-800 hover:text-cs-green-400 border-0"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-cs-green-500 text-cs-ink-0 rounded-lg font-bold uppercase tracking-wider border-0"
                style={{ boxShadow: 'var(--glow-green-md)' }}
                data-cta="nav-mobile"
                onClick={() => setMobileOpen(false)}
              >
                Quero me candidatar
                <Icon name="arrow-up-right" size={18} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.jsx
git commit -m "feat(component): Nav with scroll-state backdrop + mobile drawer"
```

---

### Task 3.4: `Footer` component

**Files:**
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: Implement**

```jsx
export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <img src="/assets/logo-horizontal-white.png" alt="CallSeller" className="h-6 w-auto opacity-80" />
        <p className="text-xs text-cs-ink-600">
          © {new Date().getFullYear()} CallSeller · Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat(component): Footer minimal"
```

---

### Task 3.5: Wire App shell (with Lenis init)

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Rewrite `App.jsx`**

```jsx
import { useEffect } from 'react';
import { initSmoothScroll, destroySmoothScroll } from './lib/smoothScroll';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';

export default function App() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return; // skip smooth scroll entirely
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, [reduced]);

  return (
    <>
      <Nav />
      <main id="top">
        {/* Hero + sections go here — Phase 4 onward */}
        <section className="min-h-screen flex items-center justify-center">
          <h1 className="font-display uppercase text-6xl text-cs-green-500" style={{ textShadow: '0 0 24px rgba(31,181,38,0.6)' }}>
            CallSeller Recrutamento
          </h1>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Delete the smoke-test App.test.jsx**

```bash
rm src/App.test.jsx
```

- [ ] **Step 3: Run dev server and verify**

```bash
npm run dev
```

Expected: black page, fixed nav at top with logo + links + CTA, green headline, footer. Scroll is smooth (Lenis active). Click on nav link should smooth-scroll (no sections yet so it scrolls to anchors that don't exist — that's ok).

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git rm src/App.test.jsx 2>/dev/null || true
git commit -m "feat: wire app shell with Lenis + reduced-motion guard"
```

---

## Phase 4: Hero

### Task 4.1: Hero WebGL canvas — shader

**Files:**
- Create: `src/components/Hero/HeroCanvas.jsx`
- Create: `src/components/Hero/heroShaders.js`

- [ ] **Step 1: Write shader source (`heroShaders.js`)**

```javascript
// Radial glow shader with reveal mask.
// Uniforms:
//   uTime       — animation time (seconds)
//   uMouse      — vec2 normalized cursor position (-1..1)
//   uReveal     — 0..1, global reveal progress (set externally by GSAP)
//   uAspect     — canvas aspect ratio (width/height)

export const heroVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const heroFragment = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uReveal;
  uniform float uAspect;

  void main() {
    vec2 uv = vUv;
    uv.x *= uAspect;

    // Mouse-following light source (aspect-corrected)
    vec2 light = vec2(0.5 * uAspect, 0.5) + uMouse * vec2(0.15 * uAspect, 0.15);

    float dist = length(uv - light);

    // Core glow — tightens with reveal progress
    float coreRadius = mix(0.08, 0.25, uReveal);
    float core = smoothstep(coreRadius, 0.0, dist) * uReveal;

    // Soft halo — bigger, softer
    float haloRadius = mix(0.3, 0.7, uReveal);
    float halo = smoothstep(haloRadius, 0.0, dist) * 0.45 * uReveal;

    // Subtle pulsation (±5% on halo)
    float pulse = 1.0 + sin(uTime * 1.8) * 0.05;
    halo *= pulse;

    // Mix green tint
    vec3 greenCore = vec3(0.17, 0.81, 0.11);  // approximates #2CCE1C
    vec3 greenDeep = vec3(0.12, 0.71, 0.15);  // approximates #1FB526
    vec3 color = mix(greenDeep, greenCore, core);

    float alpha = clamp(core + halo, 0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
  }
`;
```

- [ ] **Step 2: Implement `HeroCanvas.jsx` (R3F)**

```jsx
import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ShaderMaterial } from 'three';
import { heroVertex, heroFragment } from './heroShaders';

function GlowPlane({ revealRef, mouseRef }) {
  const matRef = useRef(null);
  const { viewport } = useThree();

  const material = useMemo(() => new ShaderMaterial({
    vertexShader: heroVertex,
    fragmentShader: heroFragment,
    uniforms: {
      uTime:   { value: 0 },
      uMouse:  { value: [0, 0] },
      uReveal: { value: 0 },
      uAspect: { value: 1 },
    },
    transparent: true,
    depthWrite: false,
  }), []);

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    matRef.current.uniforms.uReveal.value = revealRef.current;
    matRef.current.uniforms.uMouse.value = [mouseRef.current.x, mouseRef.current.y];
    matRef.current.uniforms.uAspect.value = viewport.width / viewport.height;
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <primitive ref={matRef} object={material} attach="material" />
    </mesh>
  );
}

/**
 * HeroCanvas — props:
 *  - revealRef: React ref object whose .current is a 0..1 number (set by GSAP)
 *  - mouseRef:  React ref object whose .current is { x, y } in -1..1 range
 */
export function HeroCanvas({ revealRef, mouseRef }) {
  return (
    <Canvas
      className="absolute inset-0"
      orthographic
      camera={{ zoom: 1, position: [0, 0, 1] }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <GlowPlane revealRef={revealRef} mouseRef={mouseRef} />
    </Canvas>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero/
git commit -m "feat(hero): WebGL glow shader + R3F canvas"
```

---

### Task 4.2: Hero composition (text + CTAs + proof bar)

**Files:**
- Create: `src/components/Hero/Hero.jsx`
- Create: `src/components/Hero/ProofBar.jsx`

- [ ] **Step 1: Write `ProofBar.jsx`**

```jsx
import { useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { animateCount, formatCount } from '../../lib/countUp';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const ITEMS = [
  { value: 7,       label: '+{n} ANOS DE OPERAÇÃO',            format: 'plain', prefix: '+' },
  { value: 100,     label: '+{n} VENDEDORES NO BRASIL',        format: 'plain', prefix: '+' },
  { value: 7_000_000, label: '+R$ 7M RECUPERADOS/MÊS',         format: 'static' },
];

export function ProofBar() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.4 });
  const reduced = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-cs-ink-700 text-sm uppercase tracking-widest font-medium"
    >
      {ITEMS.map((item, i) => (
        <ProofItem key={i} item={item} animate={isInView && !reduced} />
      ))}
    </div>
  );
}

function ProofItem({ item, animate }) {
  const [display, setDisplay] = useState(() => {
    if (item.format === 'static') return item.label;
    return item.label.replace('{n}', '0');
  });

  useEffect(() => {
    if (item.format === 'static') {
      setDisplay(item.label);
      return;
    }
    if (!animate) {
      setDisplay(item.label.replace('{n}', String(item.value)));
      return;
    }
    const cancel = animateCount({
      from: 0,
      to: item.value,
      duration: 1200,
      onTick: (v) => {
        const formatted = formatCount(v, 'plain', '');
        setDisplay(item.label.replace('{n}', formatted));
      },
    });
    return cancel;
  }, [animate, item]);

  return <span>{display}</span>;
}
```

- [ ] **Step 2: Write `Hero.jsx`**

```jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Icon } from '../Icon';
import { HeroCanvas } from './HeroCanvas';
import { ProofBar } from './ProofBar';
import { WHATSAPP_URL } from '../../lib/constants';
import { scrollToSelector } from '../../lib/smoothScroll';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const revealRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const leadRef = useRef(null);
  const ctasRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // Detect WebGL support
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      if (!gl) setWebglSupported(false);
    } catch { setWebglSupported(false); }
  }, []);

  useEffect(() => {
    if (reduced) {
      revealRef.current = 1;
      gsap.set([eyebrowRef.current, titleRef.current, leadRef.current, ctasRef.current], { opacity: 1, y: 0 });
      return;
    }

    // Reveal timeline
    const tl = gsap.timeline({ defaults: { ease: 'cubic-bezier(0.2, 0.8, 0.2, 1)' } });
    tl.to(revealRef, {
      current: 1,
      duration: 0.9,
      ease: 'power2.out',
      onUpdate: () => {}, // revealRef.current is read every frame by shader
    });
    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 0.4);
    tl.fromTo(titleRef.current, { opacity: 0, y: 32, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, 0.55);
    tl.fromTo(leadRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 1.0);
    tl.fromTo(ctasRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 1.2);

    return () => { tl.kill(); };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      // Damping
      mouseRef.current.x += (x - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (y - mouseRef.current.y) * 0.08;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced]);

  const handleVideoClick = (e) => {
    e.preventDefault();
    scrollToSelector('#operacao');
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cs-ink-0 pt-20 pb-12 px-4"
      id="hero"
    >
      {/* WebGL layer */}
      {webglSupported && !reduced ? (
        <HeroCanvas revealRef={revealRef} mouseRef={mouseRef} />
      ) : (
        <img
          src="/assets/recrutamento-radial.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-70 pointer-events-none"
        />
      )}

      {/* Content layer */}
      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        <div ref={eyebrowRef} className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-6" style={{ opacity: 0 }}>
          Recrutamento · CallSeller
        </div>

        <h1
          ref={titleRef}
          className="font-display font-extrabold uppercase text-cs-ink-900 leading-[0.95]"
          style={{
            fontSize: 'clamp(56px, 10vw, 144px)',
            letterSpacing: '-0.015em',
            opacity: 0,
            textShadow: '0 0 40px rgba(31,181,38,0.35)',
          }}
        >
          Trabalhe<br />Conosco.
        </h1>

        <p
          ref={leadRef}
          className="mt-8 max-w-[600px] mx-auto text-cs-ink-700 text-base sm:text-lg leading-relaxed"
          style={{ opacity: 0 }}
        >
          Somos uma operação de vendas de alta performance, referência nacional no Mercado Digital.
          Inseridos em um ecossistema que movimenta mais de <b className="text-cs-ink-900">R$ 1 Bilhão por ano</b>.
        </p>

        <div ref={ctasRef} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ opacity: 0 }}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 bg-cs-green-500 text-cs-ink-0 rounded-lg font-extrabold uppercase tracking-[0.14em] text-sm border-0 hover:bg-cs-green-600 transition-all duration-150 ease-brand cs-pulse"
            style={{ boxShadow: 'var(--glow-green-md)' }}
            data-cta="hero"
          >
            Quero me candidatar
            <Icon name="arrow-up-right" size={18} />
          </a>
          <button
            type="button"
            onClick={handleVideoClick}
            className="inline-flex items-center gap-2 px-7 py-4 bg-transparent text-cs-ink-900 rounded-lg font-bold uppercase tracking-[0.14em] text-sm border border-white/20 hover:border-white/40 transition-all duration-150 ease-brand"
          >
            <Icon name="play-circle" size={20} />
            Assistir vídeo institucional
          </button>
        </div>

        <ProofBar />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add CTA pulse keyframe to `globals.css`**

Append:

```css
@keyframes cs-pulse-glow {
  0%, 100% { box-shadow: 0 0 0 1px rgba(31,181,38,.45), 0 0 18px rgba(31,181,38,.45), 0 0 38px rgba(31,181,38,.25); }
  50%      { box-shadow: 0 0 0 1px rgba(31,181,38,.6), 0 0 28px rgba(31,181,38,.6),  0 0 52px rgba(31,181,38,.35); }
}
.cs-pulse {
  animation: cs-pulse-glow 2.4s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
}
@media (prefers-reduced-motion: reduce) {
  .cs-pulse { animation: none; }
}
```

- [ ] **Step 4: Wire into App**

Modify `src/App.jsx` — replace the placeholder section with `<Hero />`:

```jsx
import { Hero } from './components/Hero/Hero';
// ...
<main id="top">
  <Hero />
</main>
```

- [ ] **Step 5: Visual QA**

```bash
npm run dev
```

Expected:
- Black hero fills viewport
- After load, green glow grows from center, text fades in in order (eyebrow → title → lead → CTAs)
- CTA has pulsing glow
- Moving mouse shifts the glow (subtle)
- Proof bar numbers count up when scrolled into view

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero/ src/App.jsx src/styles/globals.css
git commit -m "feat(hero): WebGL canvas + reveal timeline + proof bar"
```

---

## Phase 5: Content sections

Each section below is a single task with: build component, visual QA, commit.

### Task 5.1: `Operacao` section

**Files:**
- Create: `src/components/Operacao.jsx`

- [ ] **Step 1: Implement**

```jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from './Icon';
import { VideoPlayer } from './VideoPlayer';
import { useInView } from '../hooks/useInView';
import { animateCount, formatCount } from '../lib/countUp';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const BULLETS = [
  { icon: 'shield-check', title: 'Solidez',            copy: 'Operando desde 2017 com crescimento constante.' },
  { icon: 'award',        title: 'Autoridade',         copy: 'Referência reconhecida em conversão e vendas online.' },
  { icon: 'cpu',          title: 'Tecnologia própria', copy: 'Operação integrada à plataforma de pagamentos PagaH.' },
];

const STATS = [
  { label: 'Ecossistema anual', value: 1_000_000_000, format: 'currency-billions-static', display: 'R$ 1 BILHÃO' },
  { label: 'Fundação',          value: 2017,          format: 'static',                   display: '2017' },
  { label: 'Parceiros',         value: 50,            format: 'plain-suffix',             prefix: '+' },
  { label: 'Vendedores',        value: 100,           format: 'plain-suffix',             prefix: '+' },
];

export function Operacao() {
  const textRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const items = textRef.current.querySelectorAll('[data-reveal]');
      gsap.fromTo(items, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    }, textRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="operacao" className="relative py-24 md:py-32 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Video */}
        <div className="order-2 md:order-1">
          <VideoPlayer
            desktopSrc="/videos/apresentacao1-desktop.mp4"
            mobileSrc="/videos/apresentacao1-mobile.mp4"
            poster="/videos/apresentacao1-poster.jpg"
            mode="autoplay"
            ariaLabel="Vídeo institucional — conheça a CallSeller"
            className="aspect-video"
          />
        </div>

        {/* Copy */}
        <div ref={textRef} className="order-1 md:order-2">
          <div data-reveal className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            Conheça a operação
          </div>
          <h2 data-reveal className="font-display font-bold uppercase text-cs-ink-900 text-4xl md:text-5xl leading-[1.05] mb-6">
            A operação que movimenta<br />+R$1 Bilhão por ano.
          </h2>
          <p data-reveal className="text-cs-ink-700 text-base md:text-lg leading-relaxed mb-8 max-w-[500px]">
            Especialistas em recuperação de vendas e aumento de ticket, conectamos grandes produtores digitais aos seus clientes finais através da nossa tecnologia própria, a plataforma <b className="text-cs-ink-900">PagaH</b>.
          </p>
          <ul className="space-y-4">
            {BULLETS.map(b => (
              <li key={b.title} data-reveal className="flex items-start gap-3">
                <Icon name={b.icon} size={24} className="text-cs-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-cs-ink-900">{b.title}:</span>{' '}
                  <span className="text-cs-ink-700">{b.copy}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Stats strip */}
      <StatsStrip />
    </section>
  );
}

function StatsStrip() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.3 });
  const reduced = usePrefersReducedMotion();

  return (
    <div ref={ref} className="max-w-[1200px] mx-auto mt-20 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {STATS.map((stat, i) => (
        <div key={i} className="flex flex-col gap-2">
          <StatNumber stat={stat} animate={isInView && !reduced} />
          <div className="text-xs text-cs-ink-600 uppercase tracking-[0.14em] font-bold">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

function StatNumber({ stat, animate }) {
  const [display, setDisplay] = (function useState() {
    // Inline state — keep file shorter
    const ref = useRef(stat.format === 'static' || stat.format === 'currency-billions-static' ? stat.display : `${stat.prefix || ''}0`);
    const [, setTick] = require('react').useState(0);
    return [ref.current, (v) => { ref.current = v; setTick(x => x + 1); }];
  })();

  useEffect(() => {
    if (stat.format === 'static' || stat.format === 'currency-billions-static') {
      setDisplay(stat.display);
      return;
    }
    if (!animate) {
      setDisplay(`${stat.prefix || ''}${stat.value}`);
      return;
    }
    const cancel = animateCount({
      from: 0,
      to: stat.value,
      duration: 1000,
      onTick: (v) => setDisplay(`${stat.prefix || ''}${formatCount(v, 'plain', '')}`),
    });
    return cancel;
  }, [animate, stat]);

  return (
    <div className="font-display font-extrabold uppercase text-cs-ink-900 leading-none" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
      {display}
    </div>
  );
}
```

**NOTE:** The `useState`-via-require trick above is gnarly. Replace with proper imports:

Rewrite the top of `Operacao.jsx`:

```jsx
import { useEffect, useRef, useState } from 'react';
```

And rewrite `StatNumber`:

```jsx
function StatNumber({ stat, animate }) {
  const getInitial = () =>
    (stat.format === 'static' || stat.format === 'currency-billions-static')
      ? stat.display
      : `${stat.prefix || ''}0`;
  const [display, setDisplay] = useState(getInitial);

  useEffect(() => {
    if (stat.format === 'static' || stat.format === 'currency-billions-static') {
      setDisplay(stat.display);
      return;
    }
    if (!animate) {
      setDisplay(`${stat.prefix || ''}${stat.value}`);
      return;
    }
    const cancel = animateCount({
      from: 0,
      to: stat.value,
      duration: 1000,
      onTick: (v) => setDisplay(`${stat.prefix || ''}${formatCount(v, 'plain', '')}`),
    });
    return cancel;
  }, [animate, stat]);

  return (
    <div className="font-display font-extrabold uppercase text-cs-ink-900 leading-none" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
      {display}
    </div>
  );
}
```

- [ ] **Step 2: Wire into App**

In `src/App.jsx`:

```jsx
import { Operacao } from './components/Operacao';
// inside <main>:
<Hero />
<Operacao />
```

- [ ] **Step 3: Visual QA + commit**

```bash
npm run dev
# verify: scroll past hero → operação section appears, video autoplays muted when visible, text fades in stagger, stats count up
git add src/components/Operacao.jsx src/App.jsx
git commit -m "feat(section): Operacao with autoplay video + stats"
```

---

### Task 5.2: `Beneficios` section

**Files:**
- Create: `src/components/Beneficios.jsx`

- [ ] **Step 1: Implement**

```jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from './Icon';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const ITEMS = [
  { icon: 'globe',           title: 'Liberdade geográfica',    copy: 'Home Office 100% — trabalhe de onde quiser.' },
  { icon: 'trending-up',     title: 'Projeção de ganhos',      copy: 'Ganhos acima da média, compatíveis com a sua dedicação.' },
  { icon: 'trophy',          title: 'Valorização do resultado', copy: 'Reconhecimento real pra quem entrega o que é proposto.' },
  { icon: 'arrow-up-right',  title: 'Oportunidades internas',  copy: 'Espaço pra assumir novas responsabilidades conforme o desempenho.' },
];

export function Beneficios() {
  const gridRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.querySelectorAll('[data-card]'),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="beneficios" className="relative py-24 md:py-32 px-4 md:px-6 bg-cs-ink-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            O que você encontra
          </div>
          <h2 className="font-display font-bold uppercase text-cs-ink-900 text-4xl md:text-5xl leading-[1.05]">
            Vantagens de trabalhar conosco.
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map(item => (
            <div
              key={item.title}
              data-card
              className="group relative p-8 rounded-2xl bg-cs-ink-100 border border-white/5 transition-all duration-200 ease-brand hover:border-cs-green-500/40"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-brand pointer-events-none"
                style={{ boxShadow: 'var(--glow-green-sm)' }}
              />
              <div className="relative">
                <Icon name={item.icon} size={40} className="text-cs-green-500 mb-6 transition-colors duration-150" />
                <h3 className="font-bold text-cs-ink-900 text-xl mb-3">{item.title}</h3>
                <p className="text-cs-ink-700 leading-relaxed">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire + commit**

```jsx
import { Beneficios } from './components/Beneficios';
// inside <main>:
<Operacao />
<Beneficios />
```

```bash
npm run dev
# verify: 4 cards with Lucide icons, stagger reveal on scroll, green glow on hover
git add src/components/Beneficios.jsx src/App.jsx
git commit -m "feat(section): Beneficios grid"
```

---

### Task 5.3: `Depoimentos` section

**Files:**
- Create: `src/components/Depoimentos.jsx`

- [ ] **Step 1: Implement**

```jsx
import { useState } from 'react';
import { VideoPlayer } from './VideoPlayer';

const VIDEOS = [
  { id: 'd1', desktop: '/videos/depoimento1-desktop.mp4', mobile: '/videos/depoimento1-mobile.mp4', poster: '/videos/depoimento1-poster.jpg', tag: 'Depoimento · Vendedor 01', name: 'Vendedor CallSeller' },
  { id: 'd2', desktop: '/videos/depoimento2-desktop.mp4', mobile: '/videos/depoimento2-mobile.mp4', poster: '/videos/depoimento2-poster.jpg', tag: 'Depoimento · Vendedor 02', name: 'Vendedor CallSeller' },
];

export function Depoimentos() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section id="depoimentos" className="relative py-24 md:py-32 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            Quem vende com a gente
          </div>
          <h2 className="font-display font-bold uppercase text-cs-ink-900 text-4xl md:text-5xl leading-[1.05]">
            Resultados reais.<br />Operação real.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VIDEOS.map(v => (
            <div
              key={v.id}
              className={`transition-opacity duration-300 ease-brand ${
                activeId && activeId !== v.id ? 'opacity-40' : 'opacity-100'
              }`}
            >
              <div className="aspect-[9/16] max-h-[600px] mx-auto">
                <VideoPlayer
                  desktopSrc={v.desktop}
                  mobileSrc={v.mobile}
                  poster={v.poster}
                  mode="click"
                  ariaLabel={v.tag}
                  className="h-full"
                />
              </div>
              <div className="mt-4 text-center">
                <div className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em]">{v.tag}</div>
                <div className="text-cs-ink-800 font-medium mt-1">{v.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire + commit**

```jsx
import { Depoimentos } from './components/Depoimentos';
// inside <main>:
<Beneficios />
<Depoimentos />
```

```bash
npm run dev
# verify: 2 video cards side-by-side, click-to-play + unmute + fullscreen
git add src/components/Depoimentos.jsx src/App.jsx
git commit -m "feat(section): Depoimentos click-to-play grid"
```

---

### Task 5.4: `Selecao` section

**Files:**
- Create: `src/components/Selecao.jsx`

- [ ] **Step 1: Implement**

```jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from './Icon';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const STEPS = [
  { n: '01', icon: 'clipboard-check',       title: 'Avaliação de perfil', copy: 'Todas as candidaturas são analisadas diretamente pelos nossos líderes de vendas.' },
  { n: '02', icon: 'message-circle-check',  title: 'Feedback ativo',      copy: 'Mantemos um fluxo de retorno ativo após a coleta de informações.' },
  { n: '03', icon: 'eye',                   title: 'Transparência total', copy: 'Selecionados participam de entrevistas detalhadas pra entender 100% da empresa.' },
];

export function Selecao() {
  const gridRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.querySelectorAll('[data-step]'),
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="selecao" className="relative py-24 md:py-32 px-4 md:px-6 bg-cs-ink-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            Nossa seleção
          </div>
          <h2 className="font-display font-bold uppercase text-cs-ink-900 text-4xl md:text-5xl leading-[1.05] mb-4">
            Foco nas pessoas.
          </h2>
          <p className="text-cs-ink-700 max-w-[560px] mx-auto">
            Processo humano e transparente. Não buscamos um padrão rígido — buscamos energia, comunicação e foco em solução.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map(s => (
            <div
              key={s.n}
              data-step
              className="group relative p-8 rounded-2xl bg-cs-ink-100 border border-white/5 transition-all duration-200 ease-brand hover:border-cs-green-500/40 overflow-hidden"
            >
              {/* Big faded step number */}
              <div
                className="absolute top-4 right-6 font-mono font-bold opacity-10 leading-none select-none pointer-events-none"
                style={{ fontSize: '72px', color: 'var(--cs-ink-1000)' }}
              >
                {s.n}
              </div>
              <div className="relative">
                <Icon name={s.icon} size={40} className="text-cs-green-500 mb-6" />
                <h3 className="font-bold text-cs-ink-900 text-xl mb-3">{s.title}</h3>
                <p className="text-cs-ink-700 leading-relaxed">{s.copy}</p>
              </div>
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-brand pointer-events-none"
                style={{ boxShadow: 'var(--glow-green-sm)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire + commit**

```bash
# add import + <Selecao /> in App.jsx after <Depoimentos />
git add src/components/Selecao.jsx src/App.jsx
git commit -m "feat(section): Selecao 3-step process"
```

---

### Task 5.5: `Treinamento` section

**Files:**
- Create: `src/components/Treinamento.jsx`

- [ ] **Step 1: Implement**

```jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from './Icon';
import { VideoPlayer } from './VideoPlayer';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const BULLETS = [
  { icon: 'zap',        title: 'Agilidade',           copy: 'Foco em contato eficiente e execução diária.' },
  { icon: 'settings',   title: 'Domínio da operação', copy: 'Você aprenderá com perfeição a plataforma PagaH e os produtos.' },
  { icon: 'headphones', title: 'Suporte real',        copy: 'Avaliação constante e feedbacks em tempo real pro seu desenvolvimento.' },
];

export function Treinamento() {
  const headlineRef = useRef(null);
  const contentRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // Word-by-word reveal on headline
      const words = headlineRef.current.querySelectorAll('[data-word]');
      gsap.fromTo(words, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Bullets stagger
      gsap.fromTo(
        contentRef.current.querySelectorAll('[data-bullet]'),
        { opacity: 0, x: -24 },
        {
          opacity: 1, x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, [reduced]);

  const splitIntoWords = (text) =>
    text.split(' ').map((w, i) => (
      <span key={i} data-word className="inline-block mr-[0.25em]" style={{ opacity: reduced ? 1 : 0 }}>
        {w}
      </span>
    ));

  return (
    <section id="treinamento" className="relative py-24 md:py-32 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            Metodologia de treinamento
          </div>
          <h2
            ref={headlineRef}
            className="font-display font-extrabold uppercase text-cs-ink-900 leading-[1.05]"
            style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}
          >
            <span className="block">{splitIntoWords('Esqueça teorias intermináveis.')}</span>
            <span className="block text-cs-green-400 mt-2">{splitIntoWords('Nós acreditamos no "fazer".')}</span>
          </h2>
        </div>

        <div ref={contentRef} className="grid md:grid-cols-2 gap-12 items-center">
          <VideoPlayer
            desktopSrc="/videos/apresentacao2-desktop.mp4"
            mobileSrc="/videos/apresentacao2-mobile.mp4"
            poster="/videos/apresentacao2-poster.jpg"
            mode="autoplay"
            ariaLabel="Vídeo — metodologia e estrutura de trabalho"
            className="aspect-video"
          />

          <ul className="space-y-6">
            {BULLETS.map(b => (
              <li key={b.title} data-bullet className="flex items-start gap-4">
                <span
                  className="flex-shrink-0 w-12 h-12 rounded-xl bg-cs-ink-100 border border-white/5 flex items-center justify-center"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
                >
                  <Icon name={b.icon} size={22} className="text-cs-green-500" />
                </span>
                <div>
                  <h3 className="font-bold text-cs-ink-900 text-lg mb-1">{b.title}</h3>
                  <p className="text-cs-ink-700 leading-relaxed">{b.copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Punchline */}
        <div className="text-center mt-20 md:mt-24">
          <p
            className="font-display font-extrabold uppercase text-cs-ink-900 inline-block"
            style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              letterSpacing: '-0.015em',
              textShadow: '0 0 40px rgba(31,181,38,0.35)',
            }}
          >
            Nenhuma aula vence a prática.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire + commit**

```bash
git add src/components/Treinamento.jsx src/App.jsx
git commit -m "feat(section): Treinamento with word-by-word headline + autoplay video"
```

---

### Task 5.6: `Numeros` section

**Files:**
- Create: `src/components/Numeros.jsx`

- [ ] **Step 1: Implement**

```jsx
import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { animateCount, formatCount } from '../lib/countUp';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const METRICS = [
  { value: 7,        display: '+{n} ANOS',          label: 'De experiência no mercado digital',    format: 'integer' },
  { value: 7_000_000, display: '+R$ 7 MILHÕES',     label: 'Vendas recuperadas mensalmente',       format: 'static' },
  { value: 50,       display: '+{n} PARCEIROS',     label: 'Impactados pela nossa tecnologia',     format: 'integer' },
  { value: 100,      display: '+{n} VENDEDORES',    label: 'Atuando em todo o Brasil',             format: 'integer' },
];

export function Numeros() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.3 });
  const reduced = usePrefersReducedMotion();

  return (
    <section id="numeros" className="relative py-24 md:py-40 px-4 md:px-6 overflow-hidden">
      {/* Vignette BG */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-brand ${isInView ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(31,181,38,0.15), transparent 60%)',
        }}
      />

      <div ref={ref} className="relative max-w-[1200px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            Por trás dos números
          </div>
          <h2 className="font-display font-bold uppercase text-cs-ink-900 text-4xl md:text-5xl leading-[1.05]">
            A CallSeller em números.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {METRICS.map((m, i) => (
            <Metric key={i} metric={m} animate={isInView && !reduced} delay={i * 300} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Metric({ metric, animate, delay }) {
  const [text, setText] = useState(() =>
    metric.format === 'static' ? metric.display : metric.display.replace('{n}', '0')
  );

  useEffect(() => {
    if (metric.format === 'static') {
      setText(metric.display);
      return;
    }
    if (!animate) {
      setText(metric.display.replace('{n}', String(metric.value)));
      return;
    }
    const timer = setTimeout(() => {
      animateCount({
        from: 0,
        to: metric.value,
        duration: 1200,
        onTick: (v) => {
          setText(metric.display.replace('{n}', formatCount(v, 'plain', '')));
        },
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [animate, metric, delay]);

  return (
    <div className="flex flex-col gap-3">
      <div
        className="font-display font-extrabold uppercase text-cs-ink-900 leading-[0.95]"
        style={{
          fontSize: 'clamp(48px, 8vw, 120px)',
          letterSpacing: '-0.015em',
          textShadow: '0 0 40px rgba(31,181,38,0.25)',
        }}
      >
        {text}
      </div>
      <div className="text-xs md:text-sm text-cs-ink-600 uppercase tracking-[0.14em] font-medium">
        {metric.label}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire + commit**

```bash
git add src/components/Numeros.jsx src/App.jsx
git commit -m "feat(section): Numeros with count-up + vignette reveal"
```

---

### Task 5.7: `FAQ` section

**Files:**
- Create: `src/components/FAQ.jsx`

- [ ] **Step 1: Implement**

```jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';

const FAQS = [
  {
    q: 'Preciso ter experiência em vendas pra me candidatar?',
    a: 'Não. Nós fornecemos o treinamento necessário pra você dominar nossa plataforma e metodologia, desde que você tenha o perfil e a vontade de aprender.',
  },
  {
    q: 'Como funciona o trabalho Home Office?',
    a: 'Você trabalha de onde quiser, precisando apenas de um computador, internet estável e um headset. Toda a comunicação e suporte são feitos de forma online.',
  },
  {
    q: 'Como sou acompanhado no dia a dia?',
    a: 'Nossos líderes de vendas acompanham a operação em tempo real, fornecendo feedbacks constantes e suporte pra que você atinja seus resultados.',
  },
  {
    q: 'Qual o próximo passo após enviar meu contato?',
    a: 'Nossa equipe de recrutamento avalia todos os perfis. Se o seu perfil estiver alinhado com o que buscamos, entraremos em contato pras próximas etapas.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="relative py-24 md:py-32 px-4 md:px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            Dúvidas
          </div>
          <h2 className="font-display font-bold uppercase text-cs-ink-900 text-4xl md:text-5xl leading-[1.05]">
            Perguntas frequentes.
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-colors duration-200 ease-brand overflow-hidden ${
                  isOpen
                    ? 'border-cs-green-500/40 bg-cs-ink-100'
                    : 'border-white/5 bg-cs-ink-50 hover:border-white/10'
                }`}
                style={isOpen ? { boxShadow: 'var(--glow-green-sm)' } : undefined}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left border-0"
                >
                  <span className="font-bold text-cs-ink-900 text-lg">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                    className="flex-shrink-0 text-cs-green-500"
                  >
                    <Icon name="plus" size={24} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-cs-ink-700 leading-loose">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire + commit**

```bash
git add src/components/FAQ.jsx src/App.jsx
git commit -m "feat(section): FAQ accordion"
```

---

### Task 5.8: `CtaFinal` section with particles

**Files:**
- Create: `src/components/CtaFinal/CtaFinal.jsx`
- Create: `src/components/CtaFinal/Particles.jsx`

- [ ] **Step 1: Implement `Particles.jsx`**

```jsx
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField({ count = 40 }) {
  const meshRef = useRef(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 10;  // x
      arr[i * 3 + 1] = Math.random() * 6 - 3;       // y (starting height)
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2;   // z
    }
    return arr;
  }, [count]);

  const speeds = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) arr[i] = 0.1 + Math.random() * 0.3;
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const y = pos.array[i * 3 + 1] + speeds[i] * delta;
      pos.array[i * 3 + 1] = y > 3 ? -3 : y;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#2CCE1C"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function Particles() {
  return (
    <Canvas
      className="absolute inset-0 pointer-events-none"
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
    >
      <ParticleField />
    </Canvas>
  );
}
```

- [ ] **Step 2: Implement `CtaFinal.jsx`**

```jsx
import { useEffect, useRef, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { Icon } from '../Icon';
import { WHATSAPP_URL } from '../../lib/constants';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useInView } from '../../hooks/useInView';

const Particles = lazy(() => import('./Particles').then(m => ({ default: m.Particles })));

export function CtaFinal() {
  const sectionRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { ref: inViewRef, isInView } = useInView({ once: true, threshold: 0.3 });

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const words = sectionRef.current.querySelectorAll('[data-word]');
      gsap.fromTo(words, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
      const cta = sectionRef.current.querySelector('[data-cta-final]');
      gsap.fromTo(cta, { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1,
        duration: 0.7, ease: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        scrollTrigger: {
          trigger: cta,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  const splitWords = (s) =>
    s.split(' ').map((w, i) => (
      <span key={i} data-word className="inline-block mr-[0.25em]" style={{ opacity: reduced ? 1 : 0 }}>
        {w}
      </span>
    ));

  return (
    <section
      id="candidatar"
      ref={(el) => { sectionRef.current = el; inViewRef.current = el; }}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-24 px-4 md:px-6"
    >
      {/* Particles */}
      {!reduced && isInView && (
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      )}

      <div className="relative z-10 text-center max-w-[900px] mx-auto">
        <div className="text-cs-green-400 text-xs font-bold uppercase tracking-[0.14em] mb-6" data-word style={{ opacity: reduced ? 1 : 0 }}>
          Vagas abertas
        </div>

        <h2
          className="font-display font-extrabold uppercase text-cs-ink-900 leading-[1.02] mb-6"
          style={{ fontSize: 'clamp(48px, 9vw, 128px)', letterSpacing: '-0.015em', textShadow: '0 0 50px rgba(31,181,38,0.4)' }}
        >
          <span className="block">{splitWords('Pronto pra')}</span>
          <span className="block">{splitWords('começar?')}</span>
        </h2>

        <p className="text-cs-ink-700 text-base md:text-lg max-w-[520px] mx-auto mb-10" data-word style={{ opacity: reduced ? 1 : 0 }}>
          Mande um oi pelo WhatsApp. A gente te conta os próximos passos.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cta-final
          data-cta="final"
          className="inline-flex items-center gap-3 px-10 py-6 bg-cs-green-500 text-cs-ink-0 rounded-xl font-extrabold uppercase tracking-[0.14em] border-0 hover:bg-cs-green-400 hover:scale-[1.02] transition-all duration-200 ease-brand cs-pulse"
          style={{ fontSize: 'clamp(16px, 2.2vw, 22px)', boxShadow: 'var(--glow-green-lg)', opacity: 0 }}
        >
          Quero me candidatar
          <Icon name="arrow-up-right" size={22} />
        </a>

        <p className="mt-8 text-xs text-cs-ink-600 uppercase tracking-[0.14em]" data-word style={{ opacity: reduced ? 1 : 0 }}>
          Atendimento direto com nossa equipe · Seg-Sex, 9h-18h
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into App**

```jsx
import { CtaFinal } from './components/CtaFinal/CtaFinal';
// last section before <Footer />:
<FAQ />
<CtaFinal />
```

- [ ] **Step 4: Commit**

```bash
git add src/components/CtaFinal/ src/App.jsx
git commit -m "feat(section): CtaFinal with lazy-loaded particles"
```

---

## Phase 6: Polish + audit

### Task 6.1: Accessibility audit

- [ ] **Step 1: Verify semantic structure**

Open browser devtools → Elements. Verify:
- `<html lang="pt-BR">`
- Single `<h1>` (in Hero)
- `<h2>` per section
- `<nav>`, `<main>`, `<footer>` landmarks present
- All images have `alt` (decorative ones with `alt=""` and `aria-hidden="true"`)
- All buttons have accessible names (button text or `aria-label`)
- All interactive elements keyboard-reachable (Tab through the page)

Fix anything missing.

- [ ] **Step 2: Test reduced-motion**

In devtools → Rendering → "Emulate CSS prefers-reduced-motion: reduce". Reload.
Expected: no WebGL hero (falls back to static image), no Lenis smooth scroll, no reveal animations (content just appears), no CTA glow pulse, no count-up (numbers show final value).

- [ ] **Step 3: Test keyboard navigation**

Press Tab from page top. Verify:
- First focus is skip-link ("Pular para o conteúdo")
- Tab order flows logically through Nav → Hero CTAs → sections
- Focus-visible ring shows (green glow) on every focusable element
- Enter activates CTAs, Space toggles FAQ items

- [ ] **Step 4: Fix issues inline, then commit**

```bash
git add -A
git commit -m "fix(a11y): semantic structure, reduced-motion, keyboard nav"
```

---

### Task 6.2: Performance audit

- [ ] **Step 1: Build production bundle**

```bash
npm run build
npm run preview
```

Opens on `http://localhost:4173`.

- [ ] **Step 2: Run Lighthouse (mobile)**

In Chrome devtools → Lighthouse → Mobile + Performance/Accessibility/Best-Practices/SEO → Analyze.

Targets:
- Performance ≥ 85
- Accessibility ≥ 95
- Best practices ≥ 95
- SEO ≥ 95

- [ ] **Step 3: Common fixes if score low**

- **LCP too slow:** preload hero image fallback + defer non-critical JS
- **CLS high:** set aspect-ratio on video containers (done — `aspect-video`); verify font loading doesn't shift layout (use `font-display: swap` — already in Google Fonts import)
- **TBT high:** lazy-load particles (done) + code-split Hero canvas if needed
- **Unused CSS:** Tailwind purge is already aggressive, should be fine

If bundle is >200KB gzipped, audit with:

```bash
npm run build -- --sourcemap
npx vite-bundle-visualizer
```

- [ ] **Step 4: Commit any optimizations**

```bash
git add -A
git commit -m "perf: Lighthouse optimizations"
```

---

### Task 6.3: OG image

**Files:**
- Create: `public/og-image.png`

- [ ] **Step 1: Generate OG image**

Simplest approach: take a 1200x630 screenshot of the hero section (after reveal) and save to `public/og-image.png`.

Alternative: create programmatically with a simple HTML → PNG using `npx @vercel/og` or just screenshot the live hero and crop.

For now, manual:
1. Run `npm run dev`
2. Open http://localhost:5173
3. Resize window to 1200x630
4. Wait for hero to reveal fully
5. Screenshot (Win+Shift+S) → save as `public/og-image.png`

- [ ] **Step 2: Commit**

```bash
git add public/og-image.png
git commit -m "chore: add OG image for social previews"
```

---

### Task 6.4: Analytics — Vercel Analytics

**Files:**
- Modify: `package.json`, `src/main.jsx`

- [ ] **Step 1: Install**

```bash
npm install @vercel/analytics
```

- [ ] **Step 2: Wire into `main.jsx`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './App.jsx';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
);
```

- [ ] **Step 3: Track CTA clicks**

The WhatsApp CTAs already have `data-cta="hero|nav|nav-mobile|final"` attributes. Vercel Analytics auto-tracks outbound link clicks — we don't need custom events for MVP. Skip for now, add if needed later.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/main.jsx
git commit -m "chore: wire Vercel Analytics"
```

---

## Phase 7: Deploy

### Task 7.1: Final local QA

- [ ] **Step 1: Full build + preview**

```bash
npm run build
npm run preview
```

- [ ] **Step 2: Manual checklist on http://localhost:4173**

Desktop:
- [ ] Hero reveals cleanly in < 2.5s
- [ ] Glow follows mouse
- [ ] Scrolling is smooth (Lenis)
- [ ] All section reveals trigger correctly
- [ ] Apresentação1 autoplays muted when `#operacao` enters viewport
- [ ] Depoimentos click-to-play works + goes fullscreen
- [ ] Apresentação2 autoplays in `#treinamento`
- [ ] Números count up once
- [ ] FAQ accordion opens/closes smoothly
- [ ] CtaFinal particles render, CTA pulses
- [ ] All WhatsApp buttons open the correct URL in a new tab with pre-filled message

Mobile (resize browser to 375x667 or use Chrome device emulation):
- [ ] Nav collapses to hamburger, drawer works
- [ ] Text never overflows viewport
- [ ] Videos use mobile source (check network tab)
- [ ] Tapping CTA opens WhatsApp (on real device, the mobile URL handoff)

- [ ] **Step 3: Fix anything broken; commit**

---

### Task 7.2: Deploy to Vercel

- [ ] **Step 1: Push to GitHub**

User needs to create a private GitHub repo (e.g. `callseller-recrutamento`) and provide the URL. Then:

```bash
git remote add origin <github-url>
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Deploy via Vercel**

Two options (user picks):

**Option A — Vercel CLI:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Option B — Vercel dashboard:**
Go to https://vercel.com/new → Import git repo → Framework: Vite → Build: `npm run build` → Output: `dist` → Deploy.

- [ ] **Step 3: Test live URL**

Vercel gives a URL like `callseller-recrutamento.vercel.app`. Open on mobile + desktop, run through QA checklist from Task 7.1 on the live URL.

- [ ] **Step 4: Document deploy instructions for user**

Create `DEPLOY.md` at project root:

```markdown
# Deploy

## Prerequisites
- Vercel account (free plan is fine)
- GitHub repo for this project (private recommended)

## First-time setup

1. Push this repo to GitHub.
2. Go to https://vercel.com/new, import the repo.
3. Framework preset: **Vite**. Root directory: **./**. Build command: **npm run build**. Output directory: **dist**.
4. Click Deploy. You'll get a `*.vercel.app` URL.

## Custom domain (callseller.com.br/trabalheconosco)

Option 1 — subdomain + reverse proxy on host of main site:
- Point `recrutamento.callseller.com.br` to Vercel.
- On the host of `callseller.com.br`, add a reverse proxy rule: `location /trabalheconosco { proxy_pass https://recrutamento.callseller.com.br; }`

Option 2 — replace main site:
- Point `callseller.com.br` root to Vercel.
- Configure Vercel rewrites so that `/` → current main site (if you keep it on another host) and `/trabalheconosco` → this project.

## Re-transcoding videos

If the source videos change:

```bash
npm run transcode-videos
git add public/videos/
git commit -m "build: re-transcode videos"
git push
```
```

```bash
git add DEPLOY.md
git commit -m "docs: add deploy instructions"
git push
```

- [ ] **Step 5: Hand-off**

Share with user:
- Live URL (Vercel)
- GitHub repo URL
- DEPLOY.md instructions for custom domain setup

---

## Self-review (done by planning agent before handing off to executor)

**1. Spec coverage check:**
- ✅ Section 1 (context) — covered in plan intro
- ✅ Section 2 (constraints) — enforced via Tailwind theme + globals.css + component styles
- ✅ Section 3 (stack) — Tasks 0.2, 0.3
- ✅ Section 4 (sections structure) — Tasks 4, 5
- ✅ Section 5 (motion) — each section task includes motion
- ✅ Section 6 (files structure) — Tasks 0, 2, 3, 4, 5
- ✅ Section 7 (video transcode) — Phase 1
- ✅ Section 8 (accessibility) — Task 6.1
- ✅ Section 9 (performance) — Task 6.2
- ✅ Section 10 (SEO) — Task 3.1 + Task 6.3
- ✅ Section 11 (analytics) — Task 6.4
- ✅ Section 12 (deploy) — Phase 7
- ✅ Section 13 (roadmap) — materialized as Phases 0-7
- ✅ Section 14 (risks) — mitigations baked into tasks (WebGL fallback, reduced-motion, autoplay muted, mobile video source)
- ✅ Section 15 (out of scope) — respected (no forms, no tests beyond logic unit tests, no multi-language)

**2. Placeholder scan:** no TBD/TODO. Every code step has complete code.

**3. Type consistency:** VideoPlayer props (`desktopSrc`, `mobileSrc`, `poster`, `mode`, `ariaLabel`, `className`) used consistently in Operacao, Depoimentos, Treinamento.

**4. Ambiguity check:**
- Hero reveal timeline: timings explicit in ms (300/800/1100/1500/1800/2200).
- VideoPlayer modes: autoplay vs click — handler logic explicit.
- Mobile breakpoint: `md:` (Tailwind default 768px).
- Anti-slop rules: enforced via the Tailwind theme + no parallax/flips/confetti anywhere in the component code.

All clean. Ready for execution.

---

**Plan complete. Saved to `docs/superpowers/plans/2026-04-18-callseller-recrutamento-plan.md`.**

Next step: execute using `superpowers:executing-plans`.
