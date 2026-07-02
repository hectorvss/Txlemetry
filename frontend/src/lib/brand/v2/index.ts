// Redesigned Txlemetry logo, copied from posthog.com (the canonical source). Additive —
// the existing lib/brand components (Logo, Logomark, PostHogWordmarkLogo) are unchanged.
//
// One props-based component. Pick the composition/treatment with props:
//   variant:  'gradient' (default) | 'print' | 'mono'
//   color:    for variant="mono" — 'black' (default) | 'white' | 'primary' (theme-aware) | any CSS color
//   wordmark: include the "Txlemetry" wordmark (default true); false = icon only
//   stacked:  stack the icon above the wordmark (portrait); default landscape
//   code:     use the "Txlemetry Code" wordmark
export { PostHogLogo } from './PostHogLogo'
export type { PostHogLogoProps } from './PostHogLogo'
