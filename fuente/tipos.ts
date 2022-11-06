import { Position } from 'geojson';

export type Punto = {
  // Coordenada X
  x: number;
  // Coordenada Y
  y: number;
};

export interface IMapearCoordenadas {
  (coordenadas: Position, ancho: number, alto: number): Punto;
}
