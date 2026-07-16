# Publicar los paquetes Txlemetry en npm

Wrappers que reexportan el SDK bajo la marca Txlemetry, SIN cambiar comportamiento.
Se publican con TU cuenta npm (yo no puedo publicar por ti).

## 1. Una sola vez
- Cuenta en https://www.npmjs.com/
- Organizacion gratuita **txlemetry** (para paquetes @txlemetry/*): https://www.npmjs.com/org/create (plan Free).
- `npm login`

## 2. Paquetes y estado

VALIDADOS (librerias JS puras, fidelidad byte-a-byte comprobada — listos):
| Paquete | Envuelve | Cubre en SDK setup |
|---|---|---|
| @txlemetry/js    | posthog-js@1.396.3     | Web, JS, Next.js, Vue, Svelte, Astro, Framer(npm) |
| @txlemetry/react | @posthog/react@1.9.0   | React |
| @txlemetry/node  | posthog-node@5.44.0    | Node.js / servidor |
| @txlemetry/ai    | @posthog/ai@8.3.0      | AI observability (OpenAI, Anthropic, LangChain, OTel...) |

RE-EXPORT correctos, pero conviene probarlos en un proyecto real de ese framework antes de fiarse
(son plugins de build, no librerias normales):
| @txlemetry/nuxt       | @posthog/nuxt@1.7.80      | Nuxt |
| @txlemetry/docusaurus | posthog-docusaurus@2.0.5  | Docusaurus |

NO incluidos (no se pueden reexportar sin romper):
- React Native (posthog-react-native / @posthog/react-native-plugin): usan autolinking NATIVO y
  subpaths metro/expo atados al nombre del paquete. Rebrandearlos requiere un fork propio, no un
  re-export. Recomiendo dejar esos snippets con el nombre original.
- SDKs de otros lenguajes (Python, PHP, Ruby, Go, iOS, Android): no son npm — van a PyPI/Composer/
  RubyGems/Go/CocoaPods/Maven. Cada uno seria su propio proyecto en su registro.

## 3. Publicar (orden: js PRIMERO, react depende de el)
```bash
cd txlemetry-sdk/js           && npm publish --access public
cd ../node                    && npm publish --access public
cd ../ai                      && npm publish --access public
cd ../nuxt                    && npm publish --access public
cd ../docusaurus              && npm publish --access public
cd ../react                   && npm publish --access public   # despues de js
```
`--access public` es obligatorio en paquetes scoped.

## 4. Avisame
Cuando esten publicados, actualizo los snippets de SDK setup para que usen los paquetes
@txlemetry/* y redespliego. Hasta entonces NO cambio los snippets (un install de un paquete
inexistente fallaria para tus clientes).
