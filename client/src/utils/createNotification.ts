import { Notification } from '@shared/interfaces/notification.interface';
import { replaceEmojis } from './replaceEmojis';

export const createNotification = (body: Omit<Notification, 'timestamp'>) => {
  return {
    type: body.type,
    action: body.action,
    message: replaceEmojis(body.message),
    id: body.id,
    timestamp: new Date().toISOString(),
  };
};
