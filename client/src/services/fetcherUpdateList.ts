import { TaskProps } from '@/interfaces/task.interface';
import axios from 'axios';

type TaskFetcherPros = {
  tasks: TaskProps[];
};

export const fetcherUpdateList = async (
  listId: string,
  tasks: TaskFetcherPros
) => {

  try {
    if (import.meta.env.DEV) {
      const { data } = await axios.put(
        'http://localhost:8787/api/lists/' + listId,
        tasks
      );
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
