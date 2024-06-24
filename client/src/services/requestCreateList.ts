import axios from 'axios';
import { ListProps } from '@/interfaces/list.interface';

export const requestCreateList = async (email: string, body: ListProps) => {
  try {
    if (import.meta.env.DEV) {
      const { data } = await axios.post(
        'http://localhost:8787/api/lists/' + email,
        body
      );
      return data.data as ListProps[];
    }
  } catch (error) {
    console.log(error);
  }
};
