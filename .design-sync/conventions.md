# BAB Design System — conventions

BAB is a Y2K-neobrutalist brand for teenage girls in sport. Components are **full page
sections** (a hero, a FAQ, a dashboard), not atomic primitives — compose a page by
stacking them, then add your own layout glue in the same idiom.

## Wrapping & setup (required)

Every component calls `useTranslation()` (i18next) and framer-motion. Render each one
inside **`BabProvider`** — without it the component throws ("NO_I18NEXT_INSTANCE") and
the card is blank. `BabProvider` supplies the i18n instance (it/en/fr, Italian-first)
and forces reduced motion so output is deterministic.

```jsx
import { BabProvider, Home } from 'bab-landing';

<BabProvider>
  <Home onOpenWaitlist={(target) => openModal(target)} />
</BabProvider>
```

All exports live on `window.BABLanding.*` at runtime.

## Styling idiom

Tailwind CSS v4 utility classes, neobrutalist. The recognizable signature, use it
consistently:

- **Hard black structure**: `border-[3px]` / `border-[4px] border-black`.
- **Offset drop shadows** (never blurred): `shadow-[8px_8px_0_0_#0F0F12]` — shadow color
  is ink, or an accent for emphasis (`shadow-[8px_8px_0_0_#34BBC0]`).
- **Display type uppercase**, often with a text stroke: `font-['Bricolage_Grotesque',_sans-serif]`,
  `style={{ WebkitTextStroke: '2px #0F0F12' }}`.
- Body copy: `font-['Space_Grotesk',_sans-serif]`, usually `font-bold`/`font-black`.

Both font families are served by the host app at runtime — reference them by name; no
`@font-face` ships in the bundle.

## Palette (core — keep it tight)

The palette is deliberately small. Backgrounds/accents use arbitrary Tailwind values:

| Role | Value |
|---|---|
| Paper / safe space | `#FAF9F6` (cream) |
| Ink (borders, text, shadows) | `#0F0F12` |
| White surface | `#FFFFFF` |
| Brand primary (dark) | `#1F7A63` — also the named utility `text-vividteal` / `bg-vividteal` |
| Dark surface | `#143F36` (`text-deepteal`) |
| Interactive accent | `#34BBC0` (teal) |
| CTA / highlight | `#D2EC7C` (lime) |
| Soft accent surface | `#EBE5FF` (lavender) |

Semantic-only, do not use as decoration: `#FF6B5C` coral = alert/challenge
(`bg-coral`); `#FF8FB1` pink = body/cycle (reserved for the in-app game + mascot).
Avoid reintroducing the retired scatter (sky, peach, gold, sage, bright-lime).

## Where the truth lives

`styles.css` (imports `_ds_bundle.css` + tokens + fonts) is the full style closure read
by every design. Per-component API and usage: each `components/general/<Name>/<Name>.prompt.md`
and `<Name>.d.ts`. Read those before composing.
