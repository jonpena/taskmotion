import axios from 'axios';
import { ListProps } from '@/interfaces/list.interface';

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
    console.log(error);
  }
};
