import axios from 'axios';
import { ListProps } from '@shared/list.interface';
import { getApiBaseUrl } from '@/utils/getApiBaseUrl';

export const userLists = async (sessionToken: string): Promise<ListProps[]> => {
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

export const updateList = async (listId: string, body: ListProps) => {
  try {
    await axios.put(`${getApiBaseUrl()}api/lists/${listId}`, body);
  } catch (error: unknown) {
    throw new Error(`Error al actualizar la lista`);
  }
};

export const createList = async (
  email: string,
  body: ListProps
): Promise<ListProps[]> => {
  try {
    const { data } = await axios.post(
      `${getApiBaseUrl()}api/lists/${email}`,
      body
    );
    return data.data;
  } catch (error: unknown) {
    throw new Error(`Error al crear la lista`);
  }
};

export const deleteList = async (listId: string) => {
  try {
    await axios.delete(`${getApiBaseUrl()}api/lists/${listId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al eliminar la lista: ${error.message}`);
    }
    throw new Error('Error inesperado al eliminar la lista');
  }
};
