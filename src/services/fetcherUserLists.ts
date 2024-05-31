import axios from 'axios';
import { ListProps } from '@/interfaces/list.interface';

export const fetcherUserLists = async (email: string) => {
  try {
    if (import.meta.env.DEV) {
      const response = await axios.get(
        'http://localhost:8787/api/lists/' + email
      );
      return response.data.data as ListProps[];
    }
  } catch (error) {
    console.log(error);
  }
};
