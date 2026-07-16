// @txlemetry/react — Txlemetry SDK for React.
// Re-exports the React bindings and provides Txlemetry-branded aliases for the
// two most-used APIs. Original names remain available via the wildcard re-export.
export * from '@posthog/react'
export { PostHogProvider as TxlemetryProvider, usePostHog as useTxlemetry } from '@posthog/react'
