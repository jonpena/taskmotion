import axios from 'axios';
import { getApiBaseUrl } from '@/utils/getApiBaseUrl';

export const requestDeleteList = async (listId: string): Promise<void> => {
  try {
    await axios.delete(`${getApiBaseUrl()}api/lists/${listId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al eliminar la lista: ${error.message}`);
    }
    throw new Error('Error inesperado al eliminar la lista');
  }
};
