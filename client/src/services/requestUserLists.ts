import axios from 'axios';
import { ListProps } from '@shared/list.interface';

export const requestUserLists = async (sessionToken: string) => {
  try {
    let URL = '';
    if (import.meta.env.DEV) {
      URL = import.meta.env.VITE_TASKMOTION_API_DEV;
    } else {
      URL = import.meta.env.VITE_TASKMOTION_API_PROD;
    }
    const { data } = await axios.get(URL + sessionToken);
    return data.data as ListProps[];
  } catch (error) {
    throw new Error('A ocurrido un error durante la obtención de la lista');
  }
};
