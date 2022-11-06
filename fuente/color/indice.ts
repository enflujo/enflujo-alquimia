import { convertirEscala } from '../matematica/indice';

export const hexARGB = (valor: string): number[] | null => {
  valor = valor.includes('#') ? valor.replace('#', '') : valor;

  if (valor.length === 3) {
    valor = valor[0] + valor[0] + valor[1] + valor[1] + valor[2] + valor[2];
  }

  if (valor.length != 6) {
    console.log(`No se puede convertir el color ${valor}`);
  }

  const color = valor.match(/.{1,2}/g);
  if (color) {
    const rgb = [parseInt(color[0], 16), parseInt(color[1], 16), parseInt(color[2], 16)];

    return rgb;
  }

  return null;
};

/**
 * Convierte una escala de valores a una escala de colores y mapea el
 * valor ingresado al color correspondiente.
 * @param valorMin Valor mínimo de la escala que se quiere mapear.
 * @param valorMax Valor máximo de la escala que se quiere mapear.
 * @param color1 Color inicial de la escala en hexadecimal.
 * @param color2 Color final de la escala en hexadecimal.
 * @returns
 */
export const escalaColores = (valorMin: number, valorMax: number, color1: string, color2: string) => {
  const colorMin = hexARGB(color1);
  const colorMax = hexARGB(color2);

  const [rMin, gMin, bMin] = colorMin ? colorMin : [255, 255, 255];
  const [rMax, gMax, bMax] = colorMax ? colorMax : [0, 0, 0];
  /**
   * @param {number} valor Cualquier número de la escala que se quiere mapear.
   */
  return (valor: number) => {
    const r = convertirEscala(valor, valorMin, valorMax, rMin, rMax);
    const g = convertirEscala(valor, valorMin, valorMax, gMin, gMax);
    const b = convertirEscala(valor, valorMin, valorMax, bMin, bMax);
    return `rgb(${r},${g},${b})`;
  };
};
