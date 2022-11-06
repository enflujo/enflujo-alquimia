// https://unicode-table.com/en

const punto = '\u2588'; // █
const espacio = '*';

const letras = {
  e: `00010,
      00101,
      01000,
      10000,
      01100,
      10000,
      01001,
      00110`,

  n: `00000,
      00100,
      00010,
      10001,
      11001,
      10101,
      10011,
      10010`,

  f: `00110,
      01001,
      10000,
      01000,
      00110,
      01001,
      01000,
      01000`,

  l: `01000,
      10000,
      01000,
      10000,
      01000,
      10000,
      01001,
      10111`,

  u: `01001,
      10010,
      01001,
      10010,
      01001,
      10010,
      01001,
      00110`,

  j: `00000,
      00000,
      00001,
      00000,
      00101,
      01001,
      11011,
      01110`,

  o: `10001,
      00100,
      01010,
      01010,
      01010,
      01010,
      00100,
      10001`,
};

const lineasCompletas = ['', '', '', '', '', '', '', ''];
for (const llave in letras) {
  const binario = letras[llave];
  binario.split(',').forEach((codigos, i) => {
    const fila = [...codigos.replace(/\n +/g, '')].map((numero) => (numero == 1 ? punto : espacio));
    lineasCompletas[i] += fila.join('') + ' ';
  });
}

export const cartel = (version) =>
  `/*\n${lineasCompletas.join('\n')}\n++++++++++++ versión: ${version} ++++++++++++\n*/`;
