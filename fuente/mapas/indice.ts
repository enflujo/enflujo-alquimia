import { PI_CUARTO, aRadianes } from '../matematica/indice';
import { IMapearCoordenadas, Punto } from '../tipos';
import { Position } from 'geojson';

export const mercatorY = (latitud: number): number => Math.log(Math.tan(latitud / 2 + PI_CUARTO));

/**
 * Proyecta un punto de coordenadas a pixeles.
 */
export const escalaCoordenadas = (
  latitudMin: number,
  latitudMax: number,
  longitudMin: number,
  longitudMax: number
): IMapearCoordenadas => {
  const sur = aRadianes(latitudMin);
  const norte = aRadianes(latitudMax);
  const oriente = aRadianes(longitudMax);
  const occidente = aRadianes(longitudMin);
  const yMin = mercatorY(sur);
  const yMax = mercatorY(norte);

  // https://stackoverflow.com/questions/41557891/convert-lat-long-to-x-y-position-within-a-bounding-box
  /**
   * Proyección de un punto de coordenadas a pixeles
   *
   * @param punto Punto en formato [longitud, latitud]
   * @param ancho Ancho del mapa en pixeles
   * @param alto Alto del mapa en pixeles
   * @returns Coordenadas en {x, y}
   */
  return ([longitud, latitud]: Position, ancho: number, alto: number): Punto => {
    const latitudRad = aRadianes(latitud);
    const longitudRad = aRadianes(longitud);

    const escalaX = ancho / (oriente - occidente);
    const escalaY = alto / (yMax - yMin);

    const x = (longitudRad - occidente) * escalaX;
    const y = (yMax - mercatorY(latitudRad)) * escalaY;
    return { x, y };
  };
};

const crearSeccionSvg = (
  punto: Position,
  cabeza: string,
  mapearCoordenadas: IMapearCoordenadas,
  ancho: number,
  alto: number
) => {
  const coordenadas = mapearCoordenadas(punto, ancho, alto);
  return `${cabeza}${coordenadas.x | 0} ${coordenadas.y | 0} `;
};

/**
 * Averigua si cada `grupo` de coordenadas es un polígono o un multipolígono y a la
 * variable `res` (respuesta), que contiene los datos de los SVG, le agrega la
 * ubicación de cada punto y sus líneas conectoras.
 *
 * `M` = _moveTo_ (Inicio del _path_. `M{punto.x} {punto.y}`)
 *
 * `L` = _lineTo_ (Punto de una línea. `L{punto.x} {punto.y}`)
 *
 * `Z` = _closePath_ (Fin del _path_. `Z`)
 * @param coordenadas Array de coordenadas
 * @param mapearCoordenadas Función para mapear de latitud, longitud a pixeles.
 * @returns res contiene los datos de los elementos SVG<path>
 */
export const crearLinea = (
  coordenadas: Position[][] | Position[][][],
  mapearCoordenadas: IMapearCoordenadas,
  ancho: number,
  alto: number
): string => {
  let res = '';

  coordenadas.forEach((grupo: Position[] | Position[][]): void => {
    grupo.forEach((punto: Position | Position[], i: number) => {
      const cabeza = i === 0 ? 'M' : 'L';

      if (typeof punto[0] === 'object') {
        (punto as Position[]).forEach((puntoMulti: Position, j: number): void => {
          if (j === 0) {
            res += crearSeccionSvg(puntoMulti, 'M', mapearCoordenadas, ancho, alto);
          } else {
            res += crearSeccionSvg(puntoMulti, 'L', mapearCoordenadas, ancho, alto);
          }
        });
      } else {
        res += crearSeccionSvg(punto as Position, cabeza, mapearCoordenadas, ancho, alto);
      }

      res += i === grupo.length - 1 ? 'Z' : '';
    });
  });

  return res;
};
