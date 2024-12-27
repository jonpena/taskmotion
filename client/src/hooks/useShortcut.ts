import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

export const useShortcut = (sc: string[]) => {
  const [keydown, setKeydown] = useState<string[]>([]);
  const keydownDebounced = useDebounce(keydown, 100);
  const [keys, setKeys] = useState('');

  useEffect(() => {
    const handleKeyUp = ({ key }: KeyboardEvent) => {
      setKeydown((kd) => [...kd, key.toLowerCase()]);
    };

    // Función para desactivar Ctrl + E/L
    const handleKeyDown = (e: KeyboardEvent) => {
      const { ctrlKey, key: _key } = e;
      const key = _key.toLowerCase();
      if (ctrlKey && (key === 'e' || key === 'l')) e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!keys && keydownDebounced.length === 0) {
      setKeys('');
    } else {
      setKeys(
        keydownDebounced.join('+') + keydownDebounced.reverse().join('+')
      );
      setKeydown([]);
    }
  }, [keydownDebounced]);

  return sc.find((s) => keys.includes(s.toLowerCase())) ?? undefined;
};
