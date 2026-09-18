# Design System

## Direction

**Measured conviction.** A restrained composition built from ink navy, mineral neutrals and documentary imagery. The mark is allowed to breathe; typography and spacing establish hierarchy without decorative financial tropes.

## Color

- `--ink-950: #031923` — deepest navigation and footer surface.
- `--ink-900: #062434` — NYG brand navy and primary action.
- `--ink-800: #0d3545` — elevated dark surface.
- `--mineral-50: #f4f6f5` — main canvas.
- `--white: #ffffff` — raised surfaces and inverse text.
- `--graphite-900: #18262c` — main text on light backgrounds.
- `--graphite-600: #56676e` — supporting copy; never below WCAG AA.
- `--line-light: #d8dfdd` and `--line-dark: #31505b` — structural rules.
- `--tide-500: #3c8991` — restrained secondary accent, never the sole carrier of meaning.

The palette is restrained: navy and mineral neutrals carry almost the entire interface. There is no gold, multicolour gradient or finance-dashboard colour vocabulary.

## Typography

Use Hanken Grotesk Variable, self-hosted through the build, for display and text. Its open counters and disciplined geometry complement the NYG mark without mimicking it.

- Display: 500 weight, compact line-height, tracking no tighter than `-0.035em`.
- Headings: 500–600 weight.
- Body: 400 weight, 1.6–1.75 line-height, maximum 68 characters.
- Labels: 600 weight with moderate tracking; reserve uppercase for short navigation labels only.

## Layout

- Maximum content width: `80rem`.
- Responsive edge spacing: `clamp(1.25rem, 4vw, 4rem)`.
- Sections use deliberate changes of scale and alignment rather than repeated cards.
- Imagery alternates between full-height editorial crops and wide documentary fields.
- The header is compact and persistent only after the visitor begins scrolling.

## Components

- Header: mark, full company name, four navigation destinations and one contact action.
- Buttons: rectangular with a restrained 2–4px radius; primary ink fill, secondary text link with directional cue.
- Investment focus: three editorial chapters with different image proportions, not identical cards.
- Principles: numbered only because they form an ordered investment process.
- Portfolio marks: neutral field, consistent optical size and concise supporting metadata.
- Contact form: two fields, explicit labels, privacy consent, honeypot and clear success/error states.

## Motion

Motion communicates orientation: a restrained header transition, image reveal and section-entry choreography. No parallax, bounce or decorative looping. Under `prefers-reduced-motion: reduce`, all content remains visible and transitions become immediate.

## Responsive behavior

- Mobile is a first-class composition, not a collapsed desktop layout.
- Navigation becomes an accessible menu with a 44px minimum target.
- Typography uses fluid `clamp()` scales with explicit tests at 320, 390, 768, 1280 and 1440 pixels.
- Portfolio information remains readable without horizontal scrolling.
