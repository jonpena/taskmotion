import axios from 'axios';
import { getApiBaseUrl } from '@/utils/getApiBaseUrl';

const API_ENDPOINT = 'api/lists';

export const requestDeleteList = async (listId: string): Promise<void> => {
  try {
    await axios.delete(`${getApiBaseUrl()}${API_ENDPOINT}/${listId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al eliminar la lista: ${error.message}`);
    }
    throw new Error('Error inesperado al eliminar la lista');
  }
};
