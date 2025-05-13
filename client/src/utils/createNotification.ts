import { requestUpdateNotifications } from "@/services/requestUpdateNotifications";
import { NotificationsState } from "@/store/notificationsStore";
import { INotification } from "@shared/notification.interface";
import { replaceEmojis } from "./replaceEmojis";

export const createNotification = (
  n: NotificationsState,
  email: string, body: Partial<INotification>) => {
  const notification: INotification = {
    type: body.type as INotification['type'],
    action: body.action as INotification['action'],
    message: replaceEmojis(body.message as INotification['message']),
    timestamp: new Date().toISOString(),
  };
  requestUpdateNotifications(email, notification);
  n.setNotifications([notification, ...n.notifications]);
}