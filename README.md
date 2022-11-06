# @enflujo/alquimia

Librería para NodeJS o explorador que contiene funciones que usamos generalmente en los proyectos de EnFlujo.

## Instalación

```bash
yarn add @enflujo/alquimia
```

## Versiones

| Tipo     | Descripción                                                                   |
| -------- | ----------------------------------------------------------------------------- |
| **ESM**  | Versión modular para ambientes donde usamos `import` y `export` en JS (>ES6). |
| **CJS**  | Versión para NodeJS donde usamos `require()`.                                 |
| **IIFE** | Versión empaquetada para usar directo en el explorador.                       |

### ESM (Recomendada)

Esta es la manera recomendada de usar la librería, ya que permite _sacudir_ ([Tree Shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)) para importar en el JS final solo las partes de la librería que se usan en la aplicación. Esto asume que se usa algún empaquetador como Vite, Webpack, Rollup, etc.

### Ejemplo con Vite

Esta sería la estructura de archivos:

```md
- aplicacion/
  - index.html
  - package.json
  - src/
    - programa.js
```

Archivo `index.html`

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>..:: EnFlujo ::..</title>
  </head>
  <body>
    <h1>..:: EnFlujo ::..</h1>
    <h2 id="subtitulo"></h2>
    <script type="module" src="/src/programa.js"></script>
  </body>
</html>
```

Archivo `src/programa.js`

```js
import { convertirEscala, version } from '@enflujo/alquimia';

const subtitulo = document.getElementById('subtitulo');
subtitulo.innerText = `@enflujo/alquimia version: ${version}`;

console.log(convertirEscala(50, 0, 100, 100, 200));
```

Archivo `package.json`

_(Las versiones de los paquetes en `"dependencies"` y `"devDependencies"` cambian con el tiempo, esto es sólo un ejemplo)_.

```json
{
  "name": "nombre-de-la-aplicacion",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite"
  },
  "dependencies": {
    "@enflujo/alquimia": "^0.0.2"
  },
  "devDependencies": {
    "vite": "^3.0.5"
  }
}
```

Ver aplicación en modo de desarrollo con un servidor local:

```bash
yarn dev
```

Ver página en http://localhost:5173/

### Node CJS

La librería se puede importar usando `import` y también con `require()`. Luego de instalarla desde NPM uno puede decidir la forma de importarla dependiendo del ambiente de trabajo, no hay ninguna diferencia entre uno u otro.

Importar con `require()`:

```js
const { convertirEscala, version } = require('@enflujo/alquimia');

console.log(version);
console.log(convertirEscala(50, 0, 100, 100, 200));
```

### IIFE o simple HTML

```yaml
***█* ***** **██* *█*** *█**█ ***** █***█
**█*█ **█** *█**█ █**** █**█* ***** **█**
*█*** ***█* █**** *█*** *█**█ ****█ *█*█*
█**** █***█ *█*** █**** █**█* ***** *█*█*
*██** ██**█ **██* *█*** *█**█ **█*█ *█*█*
█**** █*█*█ *█**█ █**** █**█* *█**█ *█*█*
*█**█ █**██ *█*** *█**█ *█**█ ██*██ **█**
**██* █**█* *█*** █*███ **██* *███* █***█
```

La librería está disponible como paquete que se puede importar de manera directa en HTML y queda disponible en JavaScript como objeto global con el nombre de `alquimia`.

A diferencia de las otras versiones, acá se va a descargar la librería completa en el explorador. Es útil para hacer ejercicios sencillos con los estudiantes sin tener que enseñarles a usar NPM o algún empaquetador. Acá se se importa como `<script>` y ya está.

De momento la librería no está en un CDN entonces se puede descargar directo desde Github [alquimia.min.js](../../libreria/alquimia.min.js).

Un ejemplo de la estructura básica de un proyecto de HTML:

```md
- ejemplo/
  - alquimia.min.js
  - index.html
  - programa.js
```

Algo así sería el archivo `index.html`:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>..:: EnFlujo | Alquimia ::..</title>
  </head>
  <body>
    <!-- Importar la librería antes de usarla.  -->
    <script src="./alquimia.min.js"></script>

    <!-- Queda disponible de manera global y se puede usar en otros archivos JS. -->
    <script src="./programa.js"></script>
  </body>
</html>
```

Al importar la versión llamada `alquimia.min.js`, queda disponible como objeto global. Entonces la podemos usar en otros JS que importamos posteriormente.

Archivo `programa.js`:

```js
console.log(alquimia);

const version = alquimia.version;
const algunCalculo = alquimia.convertirEscala(50, 0, 100, 100, 200);
```
