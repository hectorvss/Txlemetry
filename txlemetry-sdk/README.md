# txlemetry-sdk

Paquetes npm de marca Txlemetry que reexportan el SDK subyacente (posthog-js / @posthog/react)
sin cambiar comportamiento. Permiten que los snippets de onboarding digan `@txlemetry/js`
en lugar de `posthog-js`.

- `js/`    -> **@txlemetry/js**   (navegador: analytics, replay, flags, surveys) — wrap de posthog-js@1.396.3
- `react/` -> **@txlemetry/react** (provider y hooks para React) — wrap de @posthog/react@1.9.0

Validados con smoke-tests (el default de @txlemetry/js es el MISMO objeto que el de posthog-js).

Para publicarlos: ver [PUBLISHING.md](./PUBLISHING.md). Requiere tu cuenta de npm.
