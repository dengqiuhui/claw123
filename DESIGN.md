---
name: "OpenClaw Terminal"
description: "极客效率工具的深色终端设计系统，踩碎赛博朋克、拥抱工具理性"
colors:
  terminal-violet: "#7c3aed"
  terminal-violet-deep: "#6d28d9"
  terminal-violet-pale: "#c4b5fd"
  deep-slate: "#0c0c14"
  raised-slate: "#15151f"
  signal-green: "#16a34a"
  signal-green-deep: "#047857"
  warm-amber: "#f59e0b"
  text-primary: "#ffffff"
  text-secondary: "#a1a1aa"
  text-muted: "#71717a"
  border-subtle: "#1e1e2e"
typography:
  display:
    fontFamily: "Outfit, Inter, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 8rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
  section-title:
    fontFamily: "'Plus Jakarta Sans', Outfit, sans-serif"
    fontSize: "42px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "Outfit, Inter, sans-serif"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0.01em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  tight: "8px"
  compact: "12px"
  standard: "16px"
  comfortable: "24px"
  generous: "32px"
  section-gap: "64px"
components:
  button-primary:
    backgroundColor: "{colors.terminal-violet}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.terminal-violet-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-ghost-hover:
    backgroundColor: "rgba(255,255,255,0.05)"
    textColor: "{colors.text-primary}"
  card-surface:
    backgroundColor: "rgba(255,255,255,0.03)"
    rounded: "{rounded.md}"
    padding: "16px"
  chip-accent:
    backgroundColor: "rgba(124,58,237,0.2)"
    textColor: "{colors.terminal-violet-pale}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
---

# Design System: OpenClaw Terminal

## 1. Overview

**Creative North Star: "The Terminal"**

A dark, type-driven design system for an AI agent onboarding tool. The aesthetic borrows from developer terminals — information-dense, monospace-adjacent rhythm, surfaces that feel like they're printed on dark glass. Nothing ornamental. Every element justifies its existence by what it communicates, not how it decorates.

The system explicitly rejects Product 赛博朋克和霓虹灯炫技审美. No electric blues, no glowing cyan borders, no scan-line overlays. This is the calm, competent terminal of a seasoned engineer, not a Hollywood hacker screen. It also rejects the SaaS landing-page template: no white backgrounds, no purple-to-blue gradients, no hero sections with floating 3D isometric illustrations.

**Key Characteristics:**
- Dark-first, single-accent color strategy (violet ≤15% surface)
- Outfit for display weight, Inter for reading comfort, Plus Jakarta Sans for section anchoring
- Semi-transparent surface layers that stack without shadows
- Touch feedback via luminosity shift, not scale or shadow
- Information architecture biased toward comparison: tables, grids, side-by-side cards
- Mobile rhythm: the same density at smaller breakpoints, no desktop-only layouts

## 2. Colors

A restrained palette built on tinted near-blacks and a single violet accent. Dark surfaces shift from `#0c0c14` (deepest background) through `#15151f` (cards) to `#1e1e2e` (hover/active). The violet accent appears on ≤15% of any given screen — buttons, chip borders, link text, the glow behind the hero headline.

### Primary
- **Terminal Violet** (`#7c3aed`): The only accent. Used for primary buttons, active tab indicators, link text, scroll-to-top FAB, and the hero glow text-shadow. Never used as a background tint exceeding 20% opacity.
- **Terminal Violet Deep** (`#6d28d9`): Button hover state, gradient-destination on primary CTAs.
- **Terminal Violet Pale** (`#c4b5fd`): Chip text, badge labels, the "reading" indicator on article cards. Always on a semi-transparent violet background.

### Secondary
- **Signal Green** (`#16a34a`): SkillHub section accent. Used for SkillHub entry-point buttons, skill category badges, download count highlights. A deliberate secondary lane that never competes with violet.
- **Signal Green Deep** (`#047857`): Hover depth on green buttons.

### Neutral
- **Deep Slate** (`#0c0c14`): Page background. The base of the gradient from `#0a0a0f` → `#141420`. Never used as a surface color.
- **Raised Slate** (`#15151f`): Card and container background (`dark-surface`). The 3% white overlay lifts elements from the background without a shadow.
- **Border Subtle** (`#1e1e2e`): Divider and card border. 8% white on the background; visible enough to separate surfaces, invisible when you stop looking.
- **Text Primary** (`#ffffff`): Headlines, active nav items, product names. Pure white is permitted here because the dark background makes it the natural reading anchor.
- **Text Secondary** (`#a1a1aa`): Body copy on dark backgrounds, nav link defaults, article metadata.
- **Text Muted** (`#71717a`): Card descriptions, "downloads" counts, timestamp labels.

### Named Rules

**The One Accent Rule.** Terminal Violet is used on ≤15% of any given screen. Its rarity is the point. When a screen feels like it needs more violet, it actually needs less — redistribute to Signal Green or let the neutral layers carry the weight.

**The Luminosity-Only Surface Rule.** Surfaces distinguish themselves by luminosity shift alone (3% → 6% → 10% white overlay). No shadows, no borders thicker than 1px, no backdrop-blur on cards. Hover is a brightness step, not a movement or shadow.

## 3. Typography

**Display Font:** Outfit (with Inter, system-ui fallback)  
**Section Title Font:** Plus Jakarta Sans 700 (with Outfit fallback)  
**Body Font:** Inter, PingFang SC, Microsoft YaHei (Chinese-first stack)  
**Label/Mono Font:** Inter 500 for badges and metadata

**Character:** Outfit's geometric letterforms give headlines a crafted, slightly technical precision that reads as "engineer-built." Plus Jakarta Sans at 700 weight anchors section titles with architectural weight. Inter carries body text without calling attention to itself — the reading experience is frictionless. The Chinese stack prefers PingFang SC for macOS/iOS, Microsoft YaHei for Windows, both tuned for on-screen legibility.

### Hierarchy
- **Display** (Outfit, 700, `clamp(2.5rem, 7vw, 8rem)`, 1.0): Hero headline only. Tight tracking (-0.02em) for the machined feel. The violet glow (`text-shadow: 0 0 40px rgba(139, 92, 246, 0.3)`) is the only decorative effect in the entire system; never apply glow to anything else.
- **Section Title** (Plus Jakarta Sans, 700, 42px, 1.2, -0.02em): Section headers on the home page and knowledge center. Fixed size, not responsive — it's the anchor that gives the scroll rhythm its pulse.
- **Heading** (Outfit, 600): Article titles, card headings, nav brand name. Weight 600 creates clear separation from 400 body without competing with 700.
- **Body** (Inter, 400, 1.6): All paragraph text, descriptions, article content. Capped at 72ch line length in articles, free-flowing in card snippets.
- **Label** (Inter, 500, 12px, 0.01em): Badge text, nav items, metadata chips, "阅读文章" link indicators.

### Named Rules

**The Fixed-Anchor Rule.** Section titles are 42px fixed. They don't scale with viewport. This creates a rhythmic vertical pulse: the scroll hits the same visual weight at every section boundary. Body text scales; the anchor doesn't.

## 4. Elevation

This system is flat by design. Surfaces separate through luminosity, not shadow. The one exception is the scroll-to-top FAB, which carries a single `shadow-lg` with a violet tint — a deliberate exception that signals "this is the one floating element."

The navigation bar uses `backdrop-blur-md` on a `bg-black/50` base. This is the only blurred element in the system. It works because the nav is a frame, not a surface — it belongs to the viewport, not the content.

**The Flat-By-Default Rule.** Surfaces are flat at rest. If an element needs to feel like it's lifting, shift its luminosity — don't add a shadow. Shadows are reserved for the single FAB and nothing else.

## 5. Components

### Buttons

**Character:** Tactile and affirmative. Hover states shift noticeably — not via scale or shadow, but via a crisp color step. The ghost button is the workhorse of the nav; the gradient primary button is rare and deliberate.

- **Shape:** Rounded corners at 8px (`rounded-lg`). Square enough to feel structural, rounded enough to feel human.
- **Primary:** Gradient from `#7c3aed` (Terminal Violet) to `#6d28d9` (Terminal Violet Deep). White text. Padding 10px × 24px. Hover deepens to solid `#6d28d9`.
- **Ghost (Nav):** Transparent background with `#a1a1aa` text. Padding 8px × 16px. Hover: white text on 5% white background. Transition 200ms.
- **Tab (Active):** Same gradient as primary button. White text, subtle shadow. Marked as active by the gradient presence alone; inactive tabs are gray on transparent.
- **FAB (Scroll-to-Top):** Violet-to-purple gradient, 48px circular, the only element with a real shadow. Hover scales 110% — the lone scale animation in the system, justified by being the only floating element.

### Chips / Badges

- **Accent Chip:** `rgba(124, 58, 237, 0.2)` background, Terminal Violet Pale text, 1px violet border at 30% opacity, full-rounded. Used for hero eyebrow ("AI 助手新时代"), section indicators ("知识中心"), skill categories.
- **Status Badge:** Amber gradient background (`#f59e0b` → `#b45309`) for milestone markers. Full-rounded, compact. Only used on the graduation card.
- **Pending Badge:** Yellow-tinted with "待创建" label. Signals content not yet written.

### Cards / Containers

- **Corner Style:** 12px radius default, 16px for hero entry cards.
- **Background:** 3% white overlay (`rgba(255, 255, 255, 0.03)`) on the dark gradient.
- **Border:** 1px at 8% white opacity. Subtle, structural, never colored.
- **Hover:** Background lifts to 6% white, border to 15% opacity. No scale, no shadow, no translation. The luminosity shift is the feedback.
- **Internal Padding:** 16px compact, 20px standard, 32px for hero cards.
- **Grid Behavior:** Product cards at `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`. Tutorial cards at 3 columns. Skill cards at 4 columns. The layout collapses to single-column on mobile — same cards, stacked.

### Navigation

- **Top Nav:** Fixed, 64px height, `bg-black/50` with `backdrop-blur-md`. Bottom border at `border-white/10`. Brand name left-aligned in Outfit 600.
- **Nav Links:** Ghost buttons with icon + label. Default gray, hover white. Desktop row; hidden on mobile.
- **Breadcrumb / Back Link:** ArrowLeft icon + "返回知识中心" text. Gray, hover white. Used on article pages.

### Inputs / Fields

None yet in the current codebase. Will be added when search or filter inputs are implemented.

## 6. Do's and Don'ts

All anti-references from PRODUCT.md carry through here as explicit prohibitions.

### Do:
- **Do** use luminosity steps (3% → 6% → 10% white overlay) to distinguish surfaces.
- **Do** cap Terminal Violet at ≤15% of any screen surface.
- **Do** use the fixed 42px section title as the scroll rhythm anchor.
- **Do** provide touch feedback via color shift, not scale or shadow (FAB is the only exception).
- **Do** stack cards into grids that collapse cleanly to single-column on mobile.
- **Do** use 1px `border-white/10` as the universal separator — never a colored border accent.
- **Do** run the same information density on mobile; shrink padding, not content.

### Don't:
- **Don't** use 赛博朋克 / 霓虹灯式风格. No electric blues, no cyan borders, no scan-line effects, no terminal-green text on black.
- **Don't** use gradient text (`background-clip: text`).
- **Don't** use glassmorphism or blur on content surfaces. The nav blur is the only one.
- **Don't** use side-stripe borders (`border-left` > 1px as accent).
- **Don't** use nested cards. One card per piece of information.
- **Don't** use modal dialogs as the first interaction pattern.
- **Don't** add shadows to cards. Surfaces lift via luminosity, not drop-shadow.
- **Don't** use the violet glow text-shadow on anything except the hero headline.
- **Don't** animate layout properties. Transitions target `background-color`, `color`, `opacity` only.
- **Don't** hide content behind desktop-only breakpoints. Core flows work on mobile.
