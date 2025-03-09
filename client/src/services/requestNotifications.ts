import axios, { AxiosError } from 'axios';
import { getApiBaseUrl } from '@/utils/getApiBaseUrl';
import { INotification } from '@shared/notification.interface';

export const requestNotifications = async (
  email: string,
): Promise<INotification[]> => {
  try {
    const { data } = await axios.get(
      `${getApiBaseUrl()}api/notifications/${email}`,
    );
    return data.data;
  } catch (error: unknown) {
    throw new Error(
      `Error al obtener las notificaciones: ${(error as AxiosError).message}`
    );
  }
};
