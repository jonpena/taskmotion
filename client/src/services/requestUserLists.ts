import axios from 'axios';
import { ListProps } from '@shared/list.interface';
import { getApiBaseUrl } from '@/utils/getApiBaseUrl';

export const requestUserLists = async (
  sessionToken: string
): Promise<ListProps[]> => {
  try {
    const { data: response } = await axios.get(
      `${getApiBaseUrl()}api/lists/${sessionToken}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al obtener las listas: ${error.message}`);
    }
    throw new Error('Error inesperado al obtener las listas');
  }
};
