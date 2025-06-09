import { Notification } from '../interfaces/notification.interface';

export const deduplicateNotifications = (
  notifications: Notification[]
): Notification[] => {
  const map = new Map<string, Notification>();

  for (const notification of notifications) {
    const key = `${notification.id}-${notification.type}-${notification.action}`;
    const existing = map.get(key);

    if (
      !existing ||
      new Date(notification.timestamp) > new Date(existing.timestamp)
    ) {
      map.set(key, notification);
    }
  }

  return Array.from(map.values());
};
