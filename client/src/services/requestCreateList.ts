import axios from 'axios';
import { ListProps } from '@shared/list.interface';
import { getApiBaseUrl } from '@/utils/getApiBaseUrl';

const API_ENDPOINT = 'api/lists';

export const requestCreateList = async (
  email: string,
  body: ListProps
): Promise<ListProps[]> => {
  try {
    const { data } = await axios.post(
      `${getApiBaseUrl()}${API_ENDPOINT}/${email}`,
      body
    );
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al crear la lista: ${error.message}`);
    }
    throw new Error('Error inesperado al crear la lista');
  }
};
