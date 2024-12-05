import axios from 'axios';
import { ListProps } from '@shared/list.interface';
import { getApiBaseUrl } from '@/utils/getApiBaseUrl';

const API_ENDPOINT = 'api/lists';

export const requestUserLists = async (
  sessionToken: string
): Promise<ListProps[]> => {
  try {
    const { data: response } = await axios.get(
      `${getApiBaseUrl()}${API_ENDPOINT}/${sessionToken}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al obtener las listas: ${error.message}`);
    }
    throw new Error('Error inesperado al obtener las listas');
  }
};
