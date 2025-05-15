import { updateNotifications } from '@/services/notificationsService';
import { NotificationsState } from '@/store/notificationsStore';
import { INotification } from '@shared/interfaces/notification.interface';
import { replaceEmojis } from './replaceEmojis';
import { deduplicateNotifications } from '@shared/utils/deduplicateNotifications';
import { MAX_NOTIFICATIONS } from '@shared/constants/base';

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
  const notifications = [notification, ...state.notifications];
  const removeDuplicates = deduplicateNotifications(notifications);
  state.setNotifications(removeDuplicates.slice(0, MAX_NOTIFICATIONS));
};
