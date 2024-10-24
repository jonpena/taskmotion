import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

export const useShortcut = (sc: string[] = []) => {
  const [keydown, setKeydown] = useState('');
  const keydownDebounced = useDebounce(keydown, 100);

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      setKeydown((keydown) => event.key + '+' + keydown);
    };

    // Función para desactivar zoom con Ctrl + E/L
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        (e.key.toLocaleUpperCase() === 'E' || e.key.toUpperCase() === 'L')
      ) {
        e.preventDefault(); // Previene el zoom al usar Ctrl + +/-/0
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (keydownDebounced !== '') setKeydown('');
  }, [keydownDebounced]);

  return sc.find((s) => keydown.includes(s)) ?? undefined;
};
