import { build, context } from 'esbuild';
import { replace } from 'esbuild-plugin-replace';
import { cartel } from './utilidades/cartel.js';
import { logAviso, logCyan, logError, logVerde } from './utilidades/constantes.js';
import pkg from './package.json' assert { type: 'json' };

const enDesarrollo = process.argv.includes('--desarrollo');

const configuracionGeneral = {
  entryPoints: ['fuente/alquimia.ts'],
  bundle: true,
  target: ['esnext'],
  plugins: [
    replace({
      // Reemplaza la palabra __VERSION_ACTUAL__ dentro de los archivos, por la número de la versión en package.json
      __VERSION_ACTUAL__: pkg.version,
    }),
  ],
};

/**
 * Formato ESM:
 * - Significa "ECMAScript module"
 * - Implica que el ambiente donde se trabaja con la librería puede usar `import` y `export` (JS moderno).
 * - Esta versión se minifíca para que se pueda usar una versión liviana en exploradores donde se importa como módulos.
 * Por ejemplo, en el HTML <script type="module" src="alquimia.js"></script>
 *
 */
const configuracionESM = {
  ...configuracionGeneral,
  outdir: 'libreria',
  sourcemap: true,
  minify: false,
  splitting: true,
  format: 'esm',
};

/**
 * Formato IIFE:
 * - Significa "immediately-invoked function expression".
 * - El formato clásico de exploradores, se vuelve disponible inmediatamente.
 */

const configuracionIIFE = {
  ...configuracionGeneral,
  outfile: 'libreria/alquimia.min.js',
  sourcemap: false,
  minify: true,
  globalName: 'alquimia',
  format: 'iife',
  banner: {
    js: cartel(pkg.version),
  },
};

/**
 * Formato CJS:
 * - Significa "Common JS"
 * - Para ambientes que usan `require()`, típicamente Node.
 */

const configuracionCJS = {
  ...configuracionGeneral,
  outfile: 'libreria/alquimia.cjs',
  format: 'cjs',
  sourcemap: true,
  minify: false,
};

if (enDesarrollo) {
  servidorDesarrollo();
} else {
  /**
   * Crear los archivos y salir cuando se corre con `yarn build`, es decir, en modo de producción.
   */
  build(configuracionIIFE)
    .then(() => logCyan('Procesado IIFE'))
    .catch(() => process.exit(1));

  build(configuracionCJS)
    .then(() => logCyan('Procesado CJS'))
    .catch(() => process.exit(1));

  build(configuracionESM)
    .then(() => logCyan('Procesado ESM'))
    .catch(() => process.exit(1));
}

async function servidorDesarrollo() {
  /**
   * Iniciar modo de desarrollo con `yarn dev`.
   * Sólo exporta la versión ESM que es la única que se necesita para hacer pruebas.
   */

  const extensiones = [
    {
      name: 'recargar',
      setup(build) {
        let conteo = 0;
        build.onEnd((resultado) => {
          if (resultado.errors) {
            resultado.errors.forEach((error) => {
              logError('Problemas:', error);
            });
          }

          if (resultado.warings) {
            resultado.warings.forEach((aviso) => {
              logAviso(aviso);
            });
          }
          if (++conteo < 2) return;
          logVerde('Código actualizado');
        });
      },
    },
  ];

  const contexto = await context({ ...configuracionESM, plugins: extensiones });
  logAviso('En desarrollo!');
  await contexto.watch();
  // await contexto.dispose();
}
