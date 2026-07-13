# Plan maestro — Conversión UI del SaaS a Shopify Admin

> Directrices de ejecución. Backend intocable. Cada elemento se cambia en su
> componente/token compartido y aplica a todo el SaaS. Un commit por elemento.

## 0. Reglas de ejecución (no negociables)

1. **Backend 100% intacto**: no se toca Kea, kea-router, `lib/api`, ni Django.
2. **API pública intacta**: los componentes conservan nombre, props y comportamiento (patrón ya probado en los 3 tiers de Polaris).
3. **Agresivo en claro, intacto en oscuro**: valores Shopify reales en el bloque light de `base.scss`; el bloque dark define los suyos y no se toca.
4. **`data-attr` y clases legacy se preservan** (Playwright + autocapture).
5. **Ciclo por elemento**: leer estructura → mapear estilos → editar solo su carpeta → build Docker (typecheck real) → deploy → captura → commit. Reversible commit a commit.
6. **Prohibido tocar mecánica** en: LemonTable (orden/selección/paginación), Monaco, replay player (rrweb), react-grid-layout, floating-ui/portales.

## 1. Inventario por capas

### Capa A — Tokens raíz (`frontend/src/styles/base.scss`) → afecta a TODO

| # | Elemento | Actual | Objetivo Shopify | Riesgo |
|---|---|---|---|---|
| A1 | Lienzo `--color-bg-primary` | ✅ hecho (`#f1f1f2`, commit e326d77a) | gris admin | — |
| A2 | Sidebar `--txl-sidebar-surface` | ✅ hecho (`#f1f1f2`) | mismo gris | — |
| A3 | Acento interactivo (`--accent-*`, primary-3000) | naranja/rojo PostHog | negro `#1a1a1a` acciones primarias; azul `#005bd3` para links | Medio: revisar estados hover/active y gráficos que usen accent |
| A4 | Focus ring global | ring actual | 2px `#005bd3` en `:focus-visible` | Bajo |
| A5 | Bordes y radios | `--radius` 0.5rem, bordes cálidos | bordes `#e3e3e3`, radius 8 (controles) / 12 (tarjetas) | Bajo |
| A6 | Tipografía | ya ajustada en skin fase 2 | Inter, base 13px, títulos 20/600 | Bajo (verificar densidad tablas) |

**Dependencias**: todos los componentes consumen estos tokens. QA visual amplio tras esta capa.

### Capa B — Shell (1 instancia global; ficheros `layout/navigation-3000/` + `layout/panel-layout/`)

| # | Elemento | Estructura actual | Cambio | Dependencias/riesgo |
|---|---|---|---|---|
| B1 | **Topbar negra (NUEVA)** | No existe topbar global; grid `'left/content'` en `Navigation.scss` | Añadir fila superior: logo mini + **búsqueda central** (abre la paleta de comandos existente, `commandLogic`/Cmd+K → funcionalidad real) + cuenta a la derecha (reutilizar `NewAccountMenu`) | `--z-layout-navbar`, modo móvil (`panelLayoutLogic`), resizer. **El más delicado del shell** — probar móvil y side panel |
| B2 | Sidebar detalle | Ya gris/negrita/iconos negros | Item activo = **píldora blanca + sombra** (patrón Shopify), iconos 20px, labels sección 11px uppercase | Bajo: carril `.txl-sidebar` ya existe en `Nav.scss` |
| B3 | Contenedor principal | `main-content-container` = tarjeta única con borde | Contenido directo sobre gris con `max-width` centrado (patrón Page); conservar excepciones `sceneConfig` (replay, canvas, raw) | Medio: `--side-panel-width`, `noPaddingScene` |

### Capa C — Chrome de escena (3 compartidos → 180+ pantallas; `layout/scenes/`)

| # | Elemento | Usos | Cambio | Riesgo |
|---|---|---|---|---|
| C1 | `SceneTitleSection` | 174 ficheros | Cabecera patrón Page: back-arrow + título 20/600 + acciones derecha (primaria negra, secundarias outline); sticky con banda blanca al scroll | Medio (sticky/z-index, `@container`) |
| C2 | `SceneContent` | 180 ficheros | Espaciado vertical 16px entre secciones (ritmo BlockStack) | Bajo |
| C3 | `SceneStickyBar` | compartido | Hereda gris de A1; borde inferior `#e3e3e3` al pegarse | Bajo |

### Capa D — Superficies de datos

| # | Elemento | Usos | Cambio | Riesgo |
|---|---|---|---|---|
| D1 | `LemonTable` nivel 2 | 292 consumidores, 1 scss | Contenedor tarjeta blanca borde `#e3e3e3` radius 12; header 12px/#616161; hover `#fafafa`; paginación pie Shopify. **Solo SCSS** | Medio (regla: mecánica prohibida) |
| D2 | `InsightCard` | 30 ficheros | Superficie blanca + borde + sombra sutil; header interno tipografía Shopify | Medio (modo edición react-grid-layout) |
| D3 | Dashboard grid | `DashboardItems.scss` | gap 16px; fondo hereda A1 | Bajo |
| D4 | Monaco / replay player | — | **Excluidos** (solo marcos exteriores con tokens) | — |
| D5 | Gráficas | tema chart | Mantener paleta de series (legibilidad); ejes/grid `#e3e3e3` | Bajo |

### Capa E — Transversales

| # | Elemento | Usos | Cambio | Riesgo |
|---|---|---|---|---|
| E1 | `ButtonPrimitives` (cva) | 124 ficheros, 1 fichero de variantes | Variantes → equivalencias Polaris (default/outline/danger) | Medio (menús del árbol lo usan) |
| E2 | Focus rings | global | A4 aplicado | Bajo |
| E3 | Empty states | componente compartido | Patrón EmptyState (imagen + título + acción centrados) | Bajo |
| E4 | Toasts | `LemonToast.scss` | **Toast negro Shopify** (bg `#1a1a1a`, texto blanco, bottom-center) | Bajo |
| E5 | Iconos | `@posthog/icons` global | **Mantener** global; swap dirigido solo topbar/nav con `polaris-icons` si hace falta | — |
| E6 | Scrollbars | global css | Finos overlay estilo admin | Bajo |

### Capa F — Átomos nivel 2 (quitar la timidez donde se fue conservador)

Revisar los 15 componentes "adopción visual" con valores Shopify directos en claro:
`LemonInput` (borde idle `#8a8a8a`, focus 2px negro), `LemonModal` (radius 12, overlay 50%),
`LemonTabs` (subrayado negro), `LemonSwitch` (verde Shopify), `LemonSkeleton` (shimmer gris frío),
`LemonBanner` (paddings exactos), `LemonSelect` trigger. Cada uno en su carpeta, API intacta.

## 2. Orden de ejecución

| Fase | Contenido | Entregable |
|---|---|---|
| 1 | **Capa A completa** (A1-A2 ya commiteados + A3-A6) | El "big bang" de percepción |
| 2 | B2 + B3 (sidebar detalle + contenedor Page) | Marco Shopify sin topbar |
| 3 | B1 (topbar negra + búsqueda) | El elemento más reconocible |
| 4 | Capa C (chrome de escena) | Cabeceras Page en 180+ pantallas |
| 5 | Capa D (tablas, tiles, dashboards) | Datos con look admin |
| 6 | Capas E + F (cva, toasts, empty states, átomos nivel 2) | Coherencia total |

Cada fase = commit(s) propios + build + deploy + capturas. Una fase no empieza hasta verificar la anterior en producción.

## 3. Decisiones de producto pendientes (pedir OK)

1. **A3**: ¿links azul Shopify `#005bd3` o mantener acento de marca Txlemetry?
2. **Dark mode**: ¿congelarlo (light-only como Shopify) o mantenerlo funcional como hasta ahora?
3. **B1**: ¿la topbar lleva el switcher de proyecto o se queda en el sidebar?

## 4. Estado

- A1/A2 commiteados (`e326d77a`), build pendiente (servidor Oracle caído a fecha de este plan).
- Resto: pendiente, en este orden.
