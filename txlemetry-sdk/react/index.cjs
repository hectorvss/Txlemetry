'use strict'
const engine = require('@posthog/react')
module.exports = Object.assign({}, engine, {
  TxlemetryProvider: engine.PostHogProvider,
  useTxlemetry: engine.usePostHog,
})
