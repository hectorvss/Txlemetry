use strict
module.exports = Object.assign({}, require('@posthog/ai/otel'))
module.exports.TxlemetrySpanProcessor = require('@posthog/ai/otel').PostHogSpanProcessor
