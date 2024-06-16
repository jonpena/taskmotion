import { TaskProps } from '@/interfaces/task.interface';
import axios from 'axios';

type BodyProps = {
  name?: string;
  tasks: TaskProps[];
};

export const requestUpdateList = async (listId: string, body: BodyProps) => {
  try {
    if (import.meta.env.DEV) {
      const { data } = await axios.put(
        'http://localhost:8787/api/lists/' + listId,
        body
      );
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
