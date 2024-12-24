import axios from 'axios';
import { TaskProps } from '@shared/task.interface';
import { getApiBaseUrl } from '@/utils/getApiBaseUrl';

interface listBodyProps {
  name?: string;
  tasks: TaskProps[];
}

export const requestUpdateList = async (
  listId: string,
  body: listBodyProps
): Promise<void> => {
  try {
    await axios.put(`${getApiBaseUrl()}api/lists/${listId}`, body);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al actualizar la lista: ${error.message}`);
    }
    throw new Error('Error inesperado al actualizar la lista');
  }
};
