import { PI_CUARTO, aRadianes } from '../matematica/indice';
import type { IMapearCoordenadas, Punto } from '../tipos';
import type { Feature, FeatureCollection, Geometry, MultiPolygon, Polygon, Position } from 'geojson';

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
 * @param geometria Array de coordenadas
 * @param mapearCoordenadas Función para mapear de latitud, longitud a pixeles.
 * @param ancho Ancho en pixeles del contenedor.
 * @param alto Alto en pixeles del contenedor.
 * @returns res contiene los datos de los elementos SVG<path>
 */
export const crearLinea = (
  geometria: Polygon | MultiPolygon,
  mapearCoordenadas: IMapearCoordenadas,
  ancho: number,
  alto: number
): string => {
  let res = '';

  geometria.coordinates.forEach((grupo): void => {
    grupo.forEach((posicion, i) => {
      const cabeza = i === 0 ? 'M' : 'L';

      if (typeof posicion[0] === 'object') {
        (posicion as Position[]).forEach((puntoMulti: Position, j: number): void => {
          if (j === 0) {
            res += crearSeccionSvg(puntoMulti, 'M', mapearCoordenadas, ancho, alto);
          } else {
            res += crearSeccionSvg(puntoMulti, 'L', mapearCoordenadas, ancho, alto);
          }
        });
      } else {
        res += crearSeccionSvg(posicion as Position, cabeza, mapearCoordenadas, ancho, alto);
      }

      res += i === grupo.length - 1 ? 'Z' : '';
    });
  });

  return res;
};

/**
 * Extrae los extremos del area contenida en datos GeoJSON
 *
 * @param geojson - Datos en GeoJSON
 */

export const extremosLugar = (geojson: Feature | FeatureCollection) => {
  let latitudMin = Infinity;
  let latitudMax = -Infinity;
  let longitudMin = Infinity;
  let longitudMax = -Infinity;

  if (geojson.type === 'FeatureCollection') {
    geojson.features.forEach((area) => {
      extrearDeGeometria(area.geometry);
    });
  } else if (geojson.type === 'Feature') {
    extrearDeGeometria(geojson.geometry);
  }

  function extraer(areas: Position[]) {
    areas.forEach((punto) => {
      const [longitud, latitud] = punto;
      longitudMin = longitudMin > longitud ? longitud : longitudMin;
      longitudMax = longitudMax < longitud ? longitud : longitudMax;
      latitudMin = latitudMin > latitud ? latitud : latitudMin;
      latitudMax = latitudMax < latitud ? latitud : latitudMax;
    });
  }

  function extrearDeGeometria(geometria: Geometry) {
    if (geometria.type === 'Polygon') {
      geometria.coordinates.forEach((posiciones) => {
        extraer(posiciones);
      });
    } else if (geometria.type === 'MultiPolygon') {
      geometria.coordinates.forEach((grupo) => {
        grupo.forEach((posiciones) => {
          extraer(posiciones);
        });
      });
    }
  }

  return { latitudMin, latitudMax, longitudMin, longitudMax };
};
