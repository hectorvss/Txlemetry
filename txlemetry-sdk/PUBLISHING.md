# Publicar los paquetes Txlemetry en npm

Estos paquetes son wrappers que reexportan el SDK (mismo comportamiento, marca Txlemetry).
Ya estan validados (fidelidad byte-a-byte con posthog-js). Solo falta publicarlos con TU cuenta npm.

## 1. Cuenta y organizacion (una sola vez)
- Crea cuenta en https://www.npmjs.com/ si no tienes.
- Como los paquetes son "scoped" (@txlemetry/...), crea la organizacion gratuita **txlemetry**:
  https://www.npmjs.com/org/create  (elige el plan Free -> paquetes publicos gratis).

## 2. Login desde tu maquina
```bash
npm login
```

## 3. Publicar (IMPORTANTE: primero js, luego react)
```bash
# desde la raiz del repo
cd txlemetry-sdk/js
npm publish --access public

cd ../react
npm publish --access public
```
`--access public` es obligatorio para paquetes scoped (por defecto npm los haria privados).
Publica `js` antes que `react` porque react depende de `@txlemetry/js`.

## 4. Verificar
```bash
npm view @txlemetry/js
npm view @txlemetry/react
```

## 5. Avisame
Cuando esten publicados, dimelo y actualizo los snippets de SDK setup para que usen
`@txlemetry/js` / `@txlemetry/react` (en vez de posthog-js) y redespliego. Hasta que no
esten publicados NO cambio los snippets, para no mostrar un `npm install` que fallaria.

## Actualizaciones futuras
Cuando quieras subir de version: cambia `version` en el package.json correspondiente
(sigue la version de posthog-js/@posthog/react que use la instancia) y repite `npm publish`.
