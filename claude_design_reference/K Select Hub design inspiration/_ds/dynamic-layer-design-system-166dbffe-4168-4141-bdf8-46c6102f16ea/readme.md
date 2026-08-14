# Dynamic Layer Design System

## What this is

**Dynamic Layer** is a Flutter UI component package. This design system is built from the **free/starter tier** of that package — `dynamiclayer_flutter` v0.0.2 — which the vendor publishes as a public teaser for a **paid Pro tier** with more components and full screen templates.

Source: attached local codebase, mounted as `dynamiclayer-free/` (nested path: `dynamiclayer-free/dynamiclayer-free/dynamiclayer-free/`). Upstream repo referenced in its own README: `https://github.com/dynamiclayer/dynamiclayer-free` (ref `v0.0.2`). No Figma file, marketing site, or slide deck was provided — everything here is reverse-engineered from Dart/Flutter source.

**What the source contains:** design tokens (color, typography, spacing, radius, border-width), 9 Flutter widgets, and a small SVG/PNG icon set. **What it does not contain:** a logo/wordmark, any marketing copy or product screens, a custom typeface, or any full app/website design. Because of that:

- No logo was created — the brand mark is rendered as plain type ("Dynamic Layer") wherever a logo would go. See BRAND MARK below.
- No UI kit / full-screen recreations were built. The free tier is a component catalog, not a set of product screens — there is nothing to recreate faithfully, and inventing screens would misrepresent the source. If you get access to the Pro repo or a product using Dynamic Layer, re-run this process against it.
- No slide template was built (none was provided).

## Content fundamentals

The source is code-only — there is no marketing copy, onboarding text, or brand voice guide to draw from. The only user-facing strings in the components themselves are functional, not brand voice: placeholder copy like "Error helper text", and README component names. Treat any copy in mocks built from this system as **placeholder** until real product copy is supplied — do not invent a "Dynamic Layer voice."

## Visual foundations

- **Palette is neutral-first.** Every interactive primitive (button, input, card) is built from **black / white / grey scale** — there is no "brand blue" or similar accent color used anywhere in the components. Primary buttons are solid black on white; nothing else uses color by default.
- **Color is reserved for status.** Only two hues appear in component logic: **red** (`red-500` — error state, notification badge) and **green** (`green-600` — success state). 19 additional full 11-step hue scales (indigo, violet, teal, orange, etc.) exist as tokens but are **not** wired into any component — they're available for data visualization or accent work, not brand identity.
- **Typography:** no custom typeface is declared in source (Flutter `TextStyle` objects omit `fontFamily`, which defaults to the platform system font). This design system uses a system-UI stack (`-apple-system, "Segoe UI", Roboto, …`) as a faithful stand-in. **Flag for the user:** if Dynamic Layer has a brand typeface, supply the font files/name to replace this default.
- **Scale:** 9 font sizes (12–40px) each with a matched line-height and a slightly negative letter-spacing at larger sizes (down to −0.4 at the largest step) — a common "optically tightened" display treatment. 5 weights (light–bold) plus dedicated link (underline) and strikethrough styles.
- **Spacing:** an 18-step scale from 0–96px (not a strict power-of-two grid — includes 12, 20, 28, 36, 44, etc.), used directly as padding/gap in every component.
- **Corners:** consistent `radius-md` (8px) on buttons and inputs, `radius-lg` (12px) on cards, `radius-full` on badges — never sharp corners on interactive elements.
- **Borders:** hairline dividers are 1px `grey-200`. Focus/active states use a 2px solid border (black) rather than a glow or shadow — DlInput and DlButton (tertiary) both border, never box-shadow.
- **No shadows, no gradients, no blur/transparency, no imagery.** Every surface in the source is a flat fill. Backgrounds are always solid white or grey-100/200 — no photography, illustration, texture, or gradient anywhere in the free tier.
- **Hover/press states are color shifts, not motion.** Buttons/cards darken to a deeper grey (or black→grey-700 for primary) on press; there is no scale/shrink, no shadow change, and the source defines no transition/easing curves — treat presses as instant color swaps unless told otherwise.
- **Disabled state:** always grey-100 background + grey-500/600 text — never lowered opacity.
- **Layout rules:** top navigation and bottom navigation are full-width, edge-to-edge, with a 1px separator between them and content; both are meant to be fixed/pinned (top nav = 56px tall in `md`, bottom nav = 64px tall).

## Iconography

- The kit ships its own small **SVG icon set** (`assets/icons/`): `alert-triangle-filled`, `arrow-up`, `circle-alert`, `circle-check`, `circle-x`, `info`, `placeholder`, `plus`, `search`, `x`, `user` — plus one raster `avatar-image.png` placeholder photo. These are copied verbatim from source; do not redraw them.
- Icons are rendered via `flutter_svg` at a controlled size/color (`DlAssetIcon`/`DlPlaceholderIcon` in source) — i.e. single-color, tintable line icons, not multi-color illustrations.
- No icon font, no emoji, and no Unicode-character icons are used anywhere in source.
- The set is small and clearly a placeholder/demo set (`placeholder.svg` is literally named that) — if you need icons beyond this list for a real build, the closest CDN match by weight/style is **Lucide** (similar stroke-based, rounded-cap line icons); flag any substitution you make.

## Intentional additions

None. Every component below has a 1:1 counterpart in the source's `lib/src/components/` — no primitives were invented.

## Components

| Component | Group | Notes |
|---|---|---|
| `DlButton` | Buttons | primary/secondary/tertiary/ghost × lg/md/sm/xs |
| `DlButtonIcon` | Buttons | icon-only variant of DlButton |
| `DlButtonDock` | Buttons | full-width action bar, horizontal or vertical |
| `DlBadge` | Feedback | red dot (sm) or count pill (md) |
| `DlInput` | Forms | floating-label text field, default/error/success |
| `DlCard` | Content | icon + title(+description) tile, horizontal or stacked |
| `DlSeparator` | Layout | 1px hairline, horizontal or vertical |
| `DlTopNavigation` | Navigation | screen header, md (compact) or lg (large title) |
| `DlBottomNavigation` | Navigation | tab bar with icon/label/badge |

## Index

- `styles.css` — root stylesheet, imports everything under `tokens/`
- `tokens/colors.css` — 21 hue scales (11 steps each) + black/white + dark-mode grey override + semantic aliases
- `tokens/typography.css`, `tokens/spacing.css`, `tokens/radius.css`, `tokens/borders.css`
- `components/{buttons,feedback,forms,content,layout,navigation}/` — the 9 components above, each with `.jsx` + `.d.ts` + `.prompt.md`, plus one `@dsCard`-tagged `.html` per directory
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand groups)
- `assets/icons/` — the source icon set (SVG + one PNG)
- `SKILL.md` — Claude-Code-compatible skill wrapper for this system

## Caveats / ask

- **No logo file exists in source.** If Dynamic Layer has a real mark, attach it and it will replace the plain wordmark used throughout.
- **No custom typeface exists in source.** Currently substituted with the system UI font stack. If there's a brand typeface, send font files/name.
- **No product screens exist in this (free) tier**, so no UI kit was built. If you have access to the Pro tier or a real product built on Dynamic Layer, attach it and full screens can be recreated faithfully.
- **No marketing copy / voice guide exists**, so copy tone above is inferred from absence, not evidence — treat it as a gap, not a rule.
