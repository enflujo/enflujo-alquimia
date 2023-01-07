import { writeFileSync } from 'fs';

/**
 * Convierte texto: sin mayúsculas, tildes o espacios alrededor;
 *
 * @param texto Texto a convertir
 * @returns Texto sin mayúsculas, tildes o espacios alrededor.
 */
export const normalizarTexto = (texto: string) =>
  texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();

/**
 * Guardar datos localmente en archivo .json
 * @param {Object} json Datos que se quieren guardar en formato JSON.
 * @param {String} nombre Nombre del archivo, resulta en ${nombre}.json
 */
export const guardarJSON = (json: object, nombre: string) => {
  writeFileSync(`./src/datos/${nombre}.json`, JSON.stringify(json));
};

/**
 * Descontar semanas de una fecha.
 *
 * @param semanas Número de semanas para descontar de la fecha.
 * @param fecha Fecha a la que se le quieren descontar semanas.
 * @returns Fecha con semanas descontadas.
 */
export const reducirSemanas = (semanas: number, fecha: Date): Date => {
  return new Date(fecha.setDate(fecha.getDate() - semanas * 7));
};
