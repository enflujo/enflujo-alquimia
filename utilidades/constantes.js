import colores from 'cli-color';
import { emojify } from 'node-emoji';

const logColoreado = (mensaje, color) => console.log(color(mensaje));
/**
 * Para usar otros colores, usar esta tabla para saber el número: https://robotmoon.com/256-colors/
 * Texto: xterm(40)
 * Fondo: bgXterm(40)
 */
export const logError = (mensaje) => logColoreado(mensaje, colores.red.bold);
export const logAviso = (mensaje) => logColoreado(mensaje, colores.bold.xterm(214));
export const logBloque = (mensaje) => logColoreado(mensaje, colores.bgCyan.black);
export const logCyan = (mensaje) => logColoreado(mensaje, colores.cyan.bold);
export const logVerde = (mensaje) => logColoreado(mensaje, colores.greenBright);
export const logNaranjaPulso = (mensaje) => logColoreado(mensaje, colores.xterm(214).blink);

// https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json
export const cadena = emojify(':link:');
export const conector = emojify(':electric_plug:');
export const gorila = emojify(':gorilla:');
export const chulo = emojify(':white_check_mark:');
