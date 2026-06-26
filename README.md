# Veylon - Premium Tech Showcase & Intelligent Pricing Engine

Veylon is an engineering demonstration of a high-performance, premium landing showcase and dynamic pricing engine. Built using Next.js 15, React 19, and Tailwind CSS v4, Veylon represents the intersection of rich aesthetics, state isolation, and semantic accessibility.

## Key Architecture & Features

### 1. Animated Logo Preloader
- Displays a custom, isometric 3D Veylon cube constructed with pure SVG vectors.
- Animates top, left, and right cube faces dynamically on entry to simulate assembly.
- Uses a staggered letter-reveal animation for the brand name, ending in a smooth slide-up exit transition once load progress reaches 100%.

### 2. Viewport-Synchronized Feature Showcase
- Renders a multi-dimensional Bento Grid layout on desktop and collapses into a nested Accordion layout on mobile and tablet screens.
- Utilizes a `ResizeObserver`-based media query hook to monitor viewport changes cleanly, preventing unthrottled layout recalculations.
- Shares a unified state context (`useFeatureShowcase`) so that resizing the browser preserves which feature item is actively selected.
- Employs a robust, declarative re-render restoration mechanism in the scroll reveal hook to ensure cards stay fully visible and functional during React state reconciliation.

### 3. Isolated Pricing Engine
- Integrates a derived-pricing context to support runtime billing cycle toggling (monthly vs. annual discount rates) and multi-currency localized formatting (USD, EUR, INR, GBP).
- Restricts re-renders strictly to the pricing text components (`PriceText`) via React context subscription, leaving the surrounding layout blocks (`PricingCard`, sibling sections) fully static during updates.

### 4. Color System & Aesthetics
- Implements two contrasting, highly polished themes:
  - **Dark Mode**: Powered by an `oceanic-noir` backdrop (#172B36) with teal highlights (#114C5A) and golden Forsythia elements (#FFC801).
  - **Light Mode**: Powered by an ivory base (#F1F6F4) accented with Sage (#D9E8E2) and premium teal highlights (#114C5A).
- Uses linear mesh patterns, radial spot glows, and animated sweeping grid outlines to create visual depth and premium feel.

### 5. Accessibility & Semantic Layouts
- Structurally compliant with WCAG AA specifications.
- Includes a functional skip-to-content anchor for keyboard users.
- Enforces strict heading hierarchies (exactly one `h1`, cascading to `h2` and `h3` logically).
- Configures proper `aria-*` tags (`aria-expanded`, `aria-controls`, `aria-label`) and assigns `aria-hidden="true"` to purely decorative SVGs.

---

## Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS v4
- **WebGL**: Three.js (used for background interactive canvas layers)

---

## Getting Started

### Prerequisites

Ensure you have Node.js 18.x or later installed on your system.

### Installation

Install the project dependencies using npm:

```bash
npm install
```

### Run the Development Server

Start the local server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Build for Production

Compile and optimize the build:

```bash
npm run build
```

The optimized static pages will be written to the `.next` directory, ready for deployment.
