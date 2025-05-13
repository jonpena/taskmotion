export const createDiminutive = (fullName: string) => {
  if (!fullName) return '';
  // Convertir el string en un array de palabras
  let words = fullName.split(' ');
  // Crear el diminutivo tomando la primera letra de cada palabra
  let dm = words.map((word) => word.charAt(0).toUpperCase()).join('');
  return dm.length < 2 ? dm : dm[0] + dm[1];
};
