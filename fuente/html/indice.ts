/**
 * Busca enlaces en bloques de texto y los convierte en enlaces de HTML.
 *
 * @param valor Texto crudo donde se van a buscar enlaces.
 * @returns El mismo texto pero con enlaces convertidos a HTML.
 */
export const urlsAEnlacesHTML = (valor: string): string => {
  const urls = valor.match(/(((ftp|https?):\/\/)[-\w@:%_+.~#?,&//=A-zÀ-ú]+)/g);

  if (urls) {
    urls.forEach((url) => {
      valor = valor.replace(url, `<a href="${url}" target="_blank">${url}</a>`);
    });
  }

  return valor;
};
