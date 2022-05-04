export const convertirEscala = (
  valor: number,
  escalaBaseMin: number,
  escalaBaseMax: number,
  escalaDestinoMin: number,
  escalaDestinoMax: number
) => {
  return (
    ((valor - escalaBaseMin) * (escalaDestinoMax - escalaDestinoMin)) / (escalaBaseMax - escalaBaseMin) +
    escalaDestinoMin
  );
};
