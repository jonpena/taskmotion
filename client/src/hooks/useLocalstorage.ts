import { useEffect, useState } from 'react';
import { TaskProps } from '../interfaces/task.interface';

// hook de react que me permite guardar en el localstorage y
//obtener los datos del localstorage y si no exite me crea un estado
//inicial en el localstorage con un arreglo vacio
export const useLocalstorage = (key: string) => {
  const [state, setState] = useState<TaskProps[]>(() => {
    const localData = localStorage.getItem(key);
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
