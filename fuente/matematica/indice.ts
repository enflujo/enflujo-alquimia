export const PI_CUARTO = Math.PI / 4;

/**
 * Convierte de grados a radianes.
 *
 * @param grados Ángulo en grados
 * @returns Ángulo en radianes
 */
export const aRadianes = (grados: number): number => (grados * Math.PI) / 180;

/**
 * Convierte un valor de una escala a otra.
 *
 * @param valor Valor que se quiere convertir
 * @param escalaBaseMin Valor mínimo de la escala inicial.
 * @param escalaBaseMax Valor máximo de la escala inicial.
 * @param escalaDestinoMin Valor mínimo de la escala final.
 * @param escalaDestinoMax Valor máximo de la escala final.
 * @returns Valor convertido a la nueva escala.
 */
export const convertirEscala = (
  valor: number,
  escalaBaseMin: number,
  escalaBaseMax: number,
  escalaDestinoMin: number,
  escalaDestinoMax: number
): number => {
  return (
    ((valor - escalaBaseMin) * (escalaDestinoMax - escalaDestinoMin)) / (escalaBaseMax - escalaBaseMin) +
    escalaDestinoMin
  );
};

/**
 * Revisa si el valor de un texto contiene un número.
 *
 * @param valor {string} Texto a revisar
 * @returns true o false
 */
export const esNumero = (valor: string): boolean => !isNaN(parseInt(valor));

/**
 * Redondea y reduce el número de decimales de un numero.
 *
 * @ejemplo
 * ```js
 * redondearDecimal(3.1938477402, 2, 5); // 3.19385
 * ```
 * @param num Número decimal que se va a transformar.
 * @param minimo El mínimo de decimales que debe tener el resultado.
 * @param maximo El máximo de decimales que debe tener el resultado.
 * @returns Número con decimales reducidos.
 */
export const redondearDecimal = (num: number, minimo: number, maximo: number): number =>
  Number(
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minimo,
      maximumFractionDigits: maximo,
    }).format(num)
  );
