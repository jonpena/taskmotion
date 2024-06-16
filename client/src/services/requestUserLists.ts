import axios from 'axios';
import { ListProps } from '@/interfaces/list.interface';

export const requestUpdateList = async (email: string) => {
  try {
    if (import.meta.env.DEV) {
      const { data } = await axios.get(
        'http://localhost:8787/api/lists/' + email
      );
      return data.data as ListProps[];
    }
  } catch (error) {
    console.log(error);
  }
};
