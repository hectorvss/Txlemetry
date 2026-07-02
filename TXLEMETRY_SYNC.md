# Txlemetry PostHog Sync

This repository tracks the full Txlemetry SaaS codebase on top of upstream PostHog.

## Base

- Upstream: `https://github.com/PostHog/posthog`
- Upstream branch at sync time: `master`
- Upstream commit at sync time: `ade566d9`
- Txlemetry branch: `codex/txlemetry-posthog-sync`

## Custom layers

- `landing-txlemetry-v2/`: source landing implementation currently used for Txlemetry marketing pages.
- `landing-txlemetry/`: static/exported landing snapshots and verification captures.
- `imagenes/`: source visual gallery used by the landing and auth screens.
- `frontend/public/txlemetry/`: brand assets consumed by the internal SaaS UI.
- `frontend/src/lib/brand/TxlemetryBrand.*`: Txlemetry wordmark/logomark components.
- `frontend/src/scenes/authentication/TxlemetryAuthAside.*`: branded login side panel.
- `frontend/src/scenes/authentication/shared/WelcomeLogo.tsx`: replaces the default PostHog auth logo with Txlemetry.
- `frontend/src/scenes/authentication/login/variants/*`: wires the current auth variants to Txlemetry copy and brand elements.

## Validation Notes

- Use Node `>=24 <25`.
- Use `pnpm@10.29.3` via Corepack:

```powershell
corepack pnpm@10.29.3 install --frozen-lockfile
```

- On Windows, native packages such as `node-rdkafka`, `lz4`, and `cpu-features` require Visual Studio Build Tools with the C++ workload.
- Frontend lint for the touched files was verified with `oxlint`.

## Production Notes

The Oracle deployment currently runs upstream container images such as `posthog/posthog:latest`.
Deploying Txlemetry SaaS customizations requires building and publishing a custom PostHog image from this repository,
then updating `/opt/deploy/docker-compose.override.yml` or the relevant compose file to use that image for:

- `web`
- `worker`
- `temporal-django-worker`

Always back up Postgres, ClickHouse, and `/opt/deploy` before replacing PostHog images or running migrations.
