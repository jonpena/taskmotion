import { EMOJIS } from '@/constants/emojis';

export const replaceEmojis = (text: string) => {
  for (const key in EMOJIS) {
    const regex = new RegExp(`:${key}`, 'ig'); // Crea una expresión regular para buscar el token :key:
    text = text.replace(regex, EMOJIS[key]); // Reemplaza todas las ocurrencias
  }
  return text;
};
