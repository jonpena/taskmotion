import axios from 'axios';
import { ListProps } from '@shared/list.interface';

export const requestCreateList = async (email: string, body: ListProps) => {
  try {
    let apiUrl = '';
    if (import.meta.env.DEV) {
      apiUrl = import.meta.env.VITE_TASKMOTION_API_DEV;
    } else {
      apiUrl = import.meta.env.VITE_TASKMOTION_API_PROD;
    }
    const { data } = await axios.post(apiUrl + email, body);
    return data.data as ListProps[];
  } catch (error) {
    throw new Error('A ocurrido un error durante la creación de la lista');
  }
};
