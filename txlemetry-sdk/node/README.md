# @txlemetry/node

Txlemetry SDK for Node.js (server-side).

```bash
npm install @txlemetry/node
```
```js
import { Txlemetry } from '@txlemetry/node'

const client = new Txlemetry('<YOUR_PROJECT_API_KEY>', { host: 'https://app.txlemetry.com' })
client.capture({ distinctId: 'user-1', event: 'signed_up' })
await client.shutdown()
```
`Txlemetry` is a branded alias of the underlying `PostHog` server client; all other exports are re-exported unchanged.
