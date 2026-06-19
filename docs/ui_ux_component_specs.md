# BAB — UI/UX Component Specifications
### Figma Architecture, Auto Layout Parameters, Glassmorphism Design System, and Tamagotchi States

This specification document outlines the precise UI and UX design tokens and components for the BAB (Breaking All Barriers) product ecosystem. It is designed to ensure pixel-perfect, high-fidelity implementation across the Athlete App (B2C), Coach Dashboard (B2B), and Parent Portal.

---

## 🎨 1. Global Brand Design Tokens

These values represent the single source of truth for the BAB visual system.

### Color Palette (Hex & HSL)
*   **Background (Canvas):** `#080C12` | `hsl(216, 40%, 5%)` (Midnight Dark Blue — provides maximum contrast, privacy, and low-light battery efficiency).
*   **Card Background:** `#171F2E` | `hsl(218, 33%, 14%)` (Dark Slate Blue — base for container elements).
*   **Primary Text & Highlights:** `#FAF9F6` | `hsl(45, 25%, 97%)` (Warm Panna — readable, off-white to eliminate blue-light eye strain).
*   **Action Teal:** `#34BBC0` | `hsl(182, 57%, 48%)` (Vibrant Cyan — primary buttons, active interactive elements, and success indicators).
*   **Accent Lime:** `#DAE69A` | `hsl(69, 56%, 75%)` (Yellow-Green — key highlights, progress milestones, active avatar energy rings, and data callouts).

### Typography Scale
*   **Headlines & Title Display (Hero, Cards, Headers):** **Corben** (Serif, heavy-weight, rounded vintage Y2K aesthetic).
    *   *H1 Display:* `36px` | Line height: `110%` (`40px`) | Letter spacing: `-0.02em` | Weight: `Bold (700)`
    *   *H2 Section:* `24px` | Line height: `120%` (`28px`) | Letter spacing: `-0.01em` | Weight: `Bold (700)`
    *   *H3 Card:* `18px` | Line height: `130%` (`24px`) | Letter spacing: `0em` | Weight: `Bold (700)`
*   **Body & Interface Copy (Descriptions, Forms, Data):** **Plus Jakarta Sans** (Modern geometric sans-serif, optimized for readability on small screens).
    *   *Body Large:* `16px` | Line height: `150%` (`24px`) | Letter spacing: `-0.01em` | Weight: `Medium (500) / Regular (400)`
    *   *Body Medium:* `14px` | Line height: `140%` (`20px`) | Letter spacing: `0em` | Weight: `Regular (400)`
    *   *Body Small / Metadata:* `12px` | Line height: `130%` (`16px`) | Letter spacing: `+0.02em` | Weight: `Medium (500) / Bold (700)` for tags.

---

## ❄️ 2. Glassmorphism Surface Specifications

To evoke the Y2K translucent "physical-digital" look (frosted plastic/glass), widgets and cards use a specialized transparent styling structure.

```
┌────────────────────────────────────────────────────────┐
│  STROKE (Internal)                                     │
│  Linear Gradient (45°):                                │
│  Top-Left: rgba(250, 249, 246, 0.15)                   │
│  Bottom-Right: rgba(52, 187, 192, 0.05)                │
│  ├────────────────────────────────────────────────────┤
│  FILL (Background)                                     │
│  Solid Color: #171F2E at 75% Opacity                   │
│  Figma Blend Mode: Normal                              │
│  ├────────────────────────────────────────────────────┤
│  EFFECTS                                               │
│  1. Backdrop Blur: 20px                                │
│  2. Drop Shadow: 0px 12px 32px rgba(8, 12, 18, 0.4)    │
└────────────────────────────────────────────────────────┘
```

### Technical Figma Settings

#### A. Standard Container Card
*   **Fill (Background):** `#171F2E` at `75%` Opacity (`rgba(23, 31, 46, 0.75)`).
*   **Backdrop Blur:** `20px` (applied as a Layer/Background Effect).
*   **Stroke (Border):** `1px` inside. Linear Gradient at `45deg`:
    *   `0%` (Top-Left): `#FAF9F6` at `15%` Opacity (`rgba(250, 249, 246, 0.15)`)
    *   `100%` (Bottom-Right): `#34BBC0` at `5%` Opacity (`rgba(52, 187, 192, 0.05)`)
*   **Corner Radius:** `20px` (smooth squircle clipping enabled).
*   **Effects:**
    *   *Drop Shadow:* `0px 12px 32px rgba(8, 12, 18, 0.4)` (spread `0px`, blur `32px`).

#### B. Active / Interactive Card (Hover / Focus State)
*   **Fill (Background):** `#171F2E` at `85%` Opacity (`rgba(23, 31, 46, 0.85)`).
*   **Backdrop Blur:** `24px`.
*   **Stroke (Border):** `1.5px` inside. Linear Gradient at `45deg`:
    *   `0%` (Top-Left): `#34BBC0` at `40%` Opacity (`rgba(52, 187, 192, 0.4)`)
    *   `100%` (Bottom-Right): `#DAE69A` at `20%` Opacity (`rgba(218, 230, 154, 0.2)`)
*   **Effects:**
    *   *Drop Shadow:* `0px 16px 40px rgba(52, 187, 192, 0.15)` (Active Teal glow).

#### C. Overlay Modals / Sheets
*   **Fill (Background):** `#080C12` at `80%` Opacity (`rgba(8, 12, 18, 0.8)`).
*   **Backdrop Blur:** `32px`.
*   **Stroke (Border):** `1px` inside. Solid `#FAF9F6` at `10%` Opacity.
*   **Effects:**
    *   *Drop Shadow:* `0px 24px 64px rgba(0, 0, 0, 0.6)`.

---

## 📐 3. Auto Layout Layout & Grid System

All interface components are structured with Figma Auto Layout to support responsive scaling across mobile viewports (minimum width: `360px`, standard: `393px`, maximum: `430px`).

### Mobile App (B2C) Frame Geometry
*   **Margins:** Left/Right padding: `16px` (Fixed). Top/Bottom padding: `24px`.
*   **Vertical Spacing (Gap):**
    *   *Section-to-Section:* `24px` (Auto Layout: Vertical, Gap: `24px`).
    *   *Card Inner Content:* `16px` (Auto Layout: Vertical, Gap: `16px`, Padding: `16px` top/bottom/left/right).
    *   *Item Lists:* `12px` (Auto Layout: Vertical, Gap: `12px`).
*   **Horizontal Layout Constraints:**
    *   Parent Containers: Set to `Fill Container` (stretches to fill the standard margins).
    *   Text Layers: Set to `Fill Container` (enforces proper wrapped lines).
    *   Button elements: Set to `Hug Contents` or `Fill Container` depending on row layout.

### Dashboard (B2B Coach Portal) Frame Geometry
*   **Grid:** 12-Column Grid | Column width: `80px` | Gutter: `24px` | Margins: `40px` (desktop view).
*   **Nav Sidebar:** Width: `240px` (Fixed) | Height: `100vh` | Padding: `32px 24px`.
*   **Main Content Area:** Padding: `40px 48px` | Scroll: Vertical enabled.
*   **Widget Bento Grid:**
    *   *Large Widgets:* Span 8 columns (`808px` width) | Height: `320px`.
    *   *Small Widgets:* Span 4 columns (`392px` width) | Height: `320px`.
    *   *Auto Layout:* Wrap layout enabled with `Gap: 24px`.

---

## 🧩 4. UI Components & Iconography Specs

### Geometric Primitive Mapping for Icons
To avoid heavy graphic weight and sustain the retro-tech visual language, all UI icons must be designed inside a `24x24px` bounding box using simple geometric primitives (circles, squares, and stars).

```
Icon Construction Grid (24px x 24px)
┌───────────────────────────┐
│     ▲ Stroke: 1.5px       │
│   ┌─┴─┐   Circle:         │
│   │ ✦ │   Radius 8px      │
│   └─┬─┘   Star: 4-pointed │
│     ▼     Square: 16x16px │
└───────────────────────────┘
```

1.  **Stretching / Recovery Activity:**
    *   *Primitives:* A central outer Circle (`diameter: 16px`, `stroke: 1.5px` active teal) containing a concentric inner Circle (`diameter: 6px`, `fill: #DAE69A`).
2.  **LCA Video Check (Shield):**
    *   *Primitives:* A square (`14x14px`, `stroke: 1.5px` active teal) rotated `45°` to form a diamond shape, intersected by a horizontal line (`width: 14px`, `stroke: 1.5px` warm panna).
3.  **Hormonal Cycle / Bio Log:**
    *   *Primitives:* A 4-pointed Y2K Star (Figma Star tool: `4 points`, inner radius `25%`, width/height `18px`, `fill: #DAE69A`).
4.  **Coach Alert Trigger:**
    *   *Primitives:* An equilateral triangle (`width: 18px`, `height: 16px`, `stroke: 1.5px`, corner radius `2px`, color `#FAF9F6`) with a single dot circle (`diameter: 3px`, `fill: #34BBC0`) placed in the bottom center.

---

## 🐣 5. Tamagotchi Avatar State Variants

The Tamagotchi is the primary driver of engagement for the under-18 athlete. It acts as an emotional mirror of their physiological state, removing the clinical feel of traditional tracking.

### Interactive State Matrix

┌───────────────────┬──────────────────────────────┬────────────────────────┐
│ Variant           │ Visual Style                 │ UI Accents             │
├───────────────────┼──────────────────────────────┼────────────────────────┤
│ 1. Active (High)  │ Sparking eyes, upright,      │ Accent Lime aura,      │
│                   │ jumping motion               │ +100% Progress Ring    │
├───────────────────┼──────────────────────────────┼────────────────────────┤
│ 2. Default (Mid)  │ Open eyes, neutral posture,  │ Thin Teal ring,        │
│                   │ subtle floating animation    │ Idle particles         │
├───────────────────┼──────────────────────────────┼────────────────────────┤
│ 3. Down (Low)     │ Sleepy eyes, sitting down,   │ No ring, desaturated,  │
│                   │ cloud overlay                │ Zzz... sleep bubble    │
└───────────────────┴──────────────────────────────┴────────────────────────┘

---

### Variant 1: Active State (High Readiness & Peak Energy)
*   **Figma Variant ID:** `status=active`
*   **Avatar Character Details:**
    *   *Pose:* Character is upright, arms raised in a celebration vector, jumping.
    *   *Face:* Pixel-art sparkling eyes (rendered using `4px` diamond vectors) and a wide open smile.
    *   *Visual Effect:* Outer radial glow color `#DAE69A` with `40px` blur, `15%` opacity. Three small 4-pointed stars (`✦`, size `8px`) floating around the head.
*   **UI Component Accents:**
    *   The ring surrounding the avatar is filled with a sweeping dual gradient: `#34BBC0` to `#DAE69A` (representing 100% recovery status).
    *   *Figma prototype animation:* Continuous vertical bounce (`Y-axis translation: -8px`, transition: `Smart Animate`, dynamic spring `mass: 0.8, stiffness: 220, damping: 10`).

---

### Variant 2: Default State (Balanced Energy & Baseline Status)
*   **Figma Variant ID:** `status=default`
*   **Avatar Character Details:**
    *   *Pose:* Character stands upright with neutral hand positions, floating slightly on the horizontal plane.
    *   *Face:* Simple open circular eyes (`width: 4px`, `height: 4px`) and a flat neutral line mouth.
    *   *Visual Effect:* No external stars or particles. Transparent ambient halo behind the character using `#34BBC0` at `5%` opacity.
*   **UI Component Accents:**
    *   The surrounding border ring is a single solid color stroke of `#171F2E` (representing standard baseline, no active warning).
    *   *Figma prototype animation:* Slow vertical breathing effect (`Y-axis translation: -2px` over `2000ms`, transition: `Smart Animate`, `Ease In/Out`).

---

### Variant 3: Down State (Cycle-Sync, High Fatigue, Recovery Mode)
*   **Figma Variant ID:** `status=down`
*   **Avatar Character Details:**
    *   *Pose:* Character is sitting down, wrapped in a cozy pixelated blanket outline.
    *   *Face:* Curved sleep eyes (`u u` pattern) and a relaxed soft mouth curve.
    *   *Visual Effect:* A small, slow-pulsing speech bubble containing pixelated `Zzz` text. Character color saturation is desaturated by `25%` compared to normal.
*   **UI Component Accents:**
    *   The surrounding ring is completely inactive/hidden.
    *   An Accent Lime indicator dot (`#DAE69A`) appears next to a text badge saying `Piano B Attivo` in the bottom-left corner of the widget.
    *   *Figma prototype animation:* Very slow breathing scale fluctuation (`scale: 98%` to `100%` over `3000ms`, transition: `Ease In/Out`).

---

> [!IMPORTANT]
> **Figma Prototyping Interactions for Developers:**
> All hover states for secondary buttons must use a `Smart Animate` bounce to `scale: 96%` on click (`Press`) to simulate tactile retro buttons. Standard transitions between views must take exactly `250ms` using `Ease-Out` curves to maintain a snappy, premium feel without slowing down daily check-ins.
