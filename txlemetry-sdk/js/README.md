# @txlemetry/js

Txlemetry SDK for the browser — product analytics, session replay, feature flags, A/B testing and surveys.

## Install
```bash
npm install @txlemetry/js
```

## Usage
```js
import txlemetry from '@txlemetry/js'

txlemetry.init('<YOUR_PROJECT_API_KEY>', {
  api_host: 'https://app.txlemetry.com',
})
```

This package is a thin, versioned re-export of the underlying analytics engine; the full
API (`capture`, `identify`, `group`, feature flags, session replay, surveys…) is available
exactly as documented in your Txlemetry workspace.
