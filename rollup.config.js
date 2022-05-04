import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';

function configuracion() {
  const entrada = './fuente/inicio.ts';
  const salida = {
    file: pkg.main,
    format: 'esm',
  };

  return {
    watch: {
      clearScreen: false,
    },
    // sourcemap: true,
    input: entrada,
    output: salida,
    plugins: [typescript()],
  };
}

export default configuracion();
