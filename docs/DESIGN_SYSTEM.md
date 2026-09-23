# Design system

Fresh, warm and calm: off-white paper, one teal-green accent, and a Pacific Northwest waterfall as the signature visual.

## Colour tokens

Defined as CSS variables in `src/app/globals.css` and exposed to Tailwind through `@theme inline`. Use only these names in markup (`bg-surface`, `text-ink-2`, and so on).

| Token | Light | Dark | Use |
|---|---|---|---|
| `canvas` | `#f6f5ef` | `#0d1012` | Page background |
| `surface` | `#ffffff` | `#14181b` | Cards, inputs |
| `surface-2` | `#eceae1` | `#1b2024` | Hover fills, chips |
| `line` | `#dfdcd0` | `#2a3035` | Borders, dividers |
| `ink` | `#14181a` | `#eceee9` | Primary text |
| `ink-2` | `#454c51` | `#b4bab7` | Body text |
| `ink-3` | `#62696e` | `#8d9492` | Metadata (4.5:1 on canvas) |
| `accent` | `#0a7563` | `#5ad4b5` | Links, primary buttons, focus ring |
| `accent-soft` | `#d6eee6` | `#123129` | Tinted panels |
| `accent-ink` | `#ffffff` | `#062019` | Text on accent |

Scene colours (`--scene-*`) are separate and only used inside the SVG illustrations.

Light is the default and needs no JavaScript. Dark is a `.dark` class on `<html>`, set before paint by the inline script in `layout.tsx` from `localStorage`.

## Type

- Display: Bricolage Grotesque (`font-display`), headings and big numbers, tight tracking.
- Body: Geist (`font-body`).
- Scale tokens: `text-hero`, `text-title`, `text-lede`, all fluid with `clamp()`.

Both fonts load through `next/font` with `display: swap`.

## Layout

- `shell`: up to 1800px wide with fluid side padding.
- `prose-width`: 68ch for reading text.
- Radii are generous (1.5 to 2rem on cards, full pills on chips and buttons).

## Motion

- Reveals: elements with `data-reveal` fade up once when they enter the viewport. They are hidden only when `<html>` has `.js`, fall back to visible after 2.5s if the observer never mounts, and never hide under reduced motion.
- The waterfall scene animates water, ripples, mist, ferns, birds and fireflies (dark theme). It starts after the page has loaded and gone idle, pauses offscreen through `PauseOffscreen`, and is static under `prefers-reduced-motion`.
- The mobile menu ends in `PoolScene`: a plunge pool with basalt columns, a mossy boulder and their reflections. It fills the space left under the menu, anchored to the bottom, and its top fades into the panel, so short screens crop only sky. Below 760px of height the menu tightens its spacing to keep the rocks in view.
- The mobile menu and command palette are native `<dialog>` elements with CSS enter transitions. The palette has no header button; Ctrl/⌘ K opens it.
- The site icon (`src/app/icon.svg`) is the same world in miniature: a waterfall between two cliffs into a pool with mossy rocks. `favicon.ico` and `apple-icon.png` are rendered from it.

## Components

- `ProjectCard`: lead and default sizes, whole-card link, metrics as a `<dl>`, numbered architecture steps.
- `ArchitectureDiagram`: an ordered list of steps with connectors; real text, not an image.
- `PageHeader`: eyebrow, h1 and lede over a masked dot grid.
- `CommandPalette`: Ctrl/⌘ K, combobox and listbox semantics, commands defined as data in `src/content/commands.ts`.
