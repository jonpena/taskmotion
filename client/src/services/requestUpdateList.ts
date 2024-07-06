import { TaskProps } from '@/interfaces/task.interface';
import axios from 'axios';

type BodyProps = {
  name?: string;
  tasks: TaskProps[];
};

export const requestUpdateList = async (listId: string, body: BodyProps) => {
  try {
    let apiUrl = '';
    if (import.meta.env.DEV) {
      apiUrl = import.meta.env.VITE_TASKMOTION_API_DEV;
    } else {
      apiUrl = import.meta.env.VITE_TASKMOTION_API_PROD;
    }
    const { data } = await axios.put(apiUrl + listId, body);
    return data;
  } catch (error) {
    console.log(error);
  }
};
