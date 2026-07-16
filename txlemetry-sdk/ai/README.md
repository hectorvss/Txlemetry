# @txlemetry/ai

Txlemetry LLM analytics — observability for OpenAI, Anthropic, Gemini, LangChain, Vercel AI SDK and OpenTelemetry.

```bash
npm install @txlemetry/ai
```
Import from the provider subpath you use, e.g. OpenTelemetry:
```js
import { TxlemetrySpanProcessor } from '@txlemetry/ai/otel'
```
Subpaths available: `/openai`, `/anthropic`, `/gemini`, `/langchain`, `/vercel`, `/otel`, `/openai-agents`.
Behavior-preserving re-export of `@posthog/ai`.
