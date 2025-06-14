import axios from 'axios';
import { getApiBaseUrl } from '@/utils/getApiBaseUrl';
import { Notification } from '@shared/interfaces/notification.interface';

export const getNotifications = async (
  email: string
): Promise<Notification[]> => {
  try {
    const { data } = await axios.get(
      `${getApiBaseUrl()}api/notifications/${email}`
    );
    return data.data;
  } catch (error: unknown) {
    throw new Error(`Error al obtener las notificaciones`);
  }
};

export const updateNotifications = async (
  email: string,
  body: Notification
): Promise<Notification[]> => {
  try {
    const { data } = await axios.put(
      `${getApiBaseUrl()}api/notifications/${email}`,
      body
    );
    return data.data;
  } catch (error: unknown) {
    throw new Error(`Error al actualizar las notificaciones`);
  }
};
