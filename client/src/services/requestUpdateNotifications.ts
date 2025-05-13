import axios, { AxiosError } from 'axios';
import { getApiBaseUrl } from '@/utils/getApiBaseUrl';
import { INotification } from '@shared/notification.interface';

export const requestUpdateNotifications = async (
  email: string,
  body: INotification
): Promise<INotification[]> => {
  try {
    const { data } = await axios.put(
      `${getApiBaseUrl()}api/notifications/${email}`,
      body
    );
    return data.data;
  } catch (error: unknown) {
    throw new Error(
      `Error al obtener las notificaciones: ${(error as AxiosError).message}`
    );
  }
};
