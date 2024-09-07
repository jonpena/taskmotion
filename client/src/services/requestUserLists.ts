import axios from 'axios';
import { ListProps } from '@shared/list.interface';

export const requestUserLists = async (sessionToken: string) => {
  try {
    let apiUrl = '';
    if (import.meta.env.DEV) {
      apiUrl = import.meta.env.VITE_TASKMOTION_API_DEV;
    } else {
      apiUrl = import.meta.env.VITE_TASKMOTION_API_PROD;
    }
    const { data } = await axios.get(apiUrl + sessionToken);
    return data.data as ListProps[];
  } catch (error) {
    throw new Error('A ocurrido un error durante la obtención de la lista');
  }
};
