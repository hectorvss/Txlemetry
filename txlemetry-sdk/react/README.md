# @txlemetry/react

Txlemetry SDK for React — provider and hooks.

## Install
```bash
npm install @txlemetry/js @txlemetry/react
```

## Usage
```jsx
import { TxlemetryProvider, useTxlemetry } from '@txlemetry/react'

function App() {
  return (
    <TxlemetryProvider apiKey="<YOUR_PROJECT_API_KEY>" options={{ api_host: 'https://app.txlemetry.com' }}>
      <YourApp />
    </TxlemetryProvider>
  )
}
```

`TxlemetryProvider` and `useTxlemetry` are Txlemetry-branded aliases of the underlying React
bindings; every other export (feature-flag components, hooks, etc.) is re-exported unchanged.
