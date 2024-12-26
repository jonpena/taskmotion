import axios, { AxiosError } from 'axios';
import { ListProps } from '@shared/list.interface';
import { getApiBaseUrl } from '@/utils/getApiBaseUrl';

export const requestCreateList = async (
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
    throw new Error(
      `Error al crear la lista: ${(error as AxiosError).message}`
    );
  }
};
