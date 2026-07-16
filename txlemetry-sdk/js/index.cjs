'use strict'
// CommonJS entry. Unwrap the ESM interop default so
//   const txlemetry = require('@txlemetry/js')
//   txlemetry.init(...)
// works like the ESM default import.
const engine = require('posthog-js')
module.exports = (engine && engine.default) ? engine.default : engine
