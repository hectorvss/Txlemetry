use strict
const engine = require('posthog-node')
module.exports = Object.assign({}, engine, { Txlemetry: engine.PostHog })
