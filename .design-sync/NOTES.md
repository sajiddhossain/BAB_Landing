# BAB Design System — Sync Notes

## Re-sync procedure

Before re-syncing, always run:
```bash
npm run build
cp dist/assets/index-*.css src/styles/ds-compiled.css
```
Then rebuild and recapture:
```bash
node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./node_modules --entry ./src/components/index.ts --out ./ds-bundle
node .ds-sync/package-capture.mjs --out ./ds-bundle
```

## Known issues

### FAQ excluded from sync
`FAQ.tsx` exports a default named `FAQ` (all-caps). The converter's `isComponentName` filter excludes names matching `/^[A-Z][A-Z0-9_]+$/` as enum-like. No config override exists. FAQ content is embedded inside `Home.tsx` and is covered there.

### Tailwind v4 CSS requires pre-compile
`src/index.css` uses `@import "tailwindcss"` which the converter cannot process directly. Fix: run `npm run build` and copy the compiled output to `src/styles/ds-compiled.css` (gitignored). `cssEntry` in config points to this stable path.

### BabProvider required for i18n context
All components use `useTranslation()`. The `BabProvider` wrapper (`src/lib/BabProvider.tsx`) provides `I18nextProvider` + `MotionConfig reducedMotion="always"`. Listed in `extraEntries` and referenced as `provider.component`.

### WaitlistModal: fixed positioning and frozen clock
`WaitlistModal` uses `position: fixed inset-0` for the full-screen overlay. The `ds-cell` container has `transform: translateZ(0)` which creates a new CSS containing block — fixed children have zero height. Fix: exported `WaitlistPanel` (no fixed wrapper) for the preview. `WaitlistPanelContent` uses a plain `div` (not `motion.div`) so it renders correctly when `requestAnimationFrame` is frozen by `page.clock.setFixedTime` in the capture script.

### RENDER_THIN warning for WaitlistModal
Both `OpenAllenatore` and `OpenGenitore` render identically at step 1 of the quiz (sport selection). The `target` prop only affects which `user_type` is stored in Supabase, not the initial visual. Warning is benign.

### Barrel entry file required
Without `--entry`, the converter sets `PKG_DIR = node_modules/bab-landing` which doesn't exist (self-install). Fix: `src/components/index.ts` is the barrel entry; pass `--entry ./src/components/index.ts` so the converter walks up to find the real `package.json` at repo root.
