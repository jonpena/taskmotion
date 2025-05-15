import { updateNotifications } from '@/services/notificationsService';
import { NotificationsState } from '@/store/notificationsStore';
import { INotification } from '@shared/notification.interface';
import { replaceEmojis } from './replaceEmojis';

export const createNotification = (
  state: NotificationsState,
  email: string,
  body: Omit<INotification, 'timestamp'>
) => {
  const notification: INotification = {
    type: body.type,
    action: body.action,
    message: replaceEmojis(body.message),
    id: body.id,
    timestamp: new Date().toISOString(),
  };
  updateNotifications(email, notification);
  state.setNotifications([notification, ...state.notifications]);
};
