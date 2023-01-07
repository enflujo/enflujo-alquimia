export * from './matematica/indice';
export * from './color/indice';
export * from './mapas/indice';
export * from './html/indice';
export * from './node/indice';

export const version = '__VERSION_ACTUAL__';

/**
 * Una función asincrónica que espera un tiempo definido antes de continuar.
 *
 * @param tiempo Tiempo en milisegundos que debe esperar.
 * @returns
 */
export const esperar = async (tiempo: number): Promise<void> => {
  return new Promise((respuesta) => {
    setTimeout(() => {
      respuesta();
    }, tiempo);
  });
};
