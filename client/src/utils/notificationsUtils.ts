import { INotification } from "@shared/notification.interface";

export const notificationsStyle = (action: INotification['action']) => {
  if (action === 'created') return 'bg-amber-400/10 text-amber-500';
  if (action === 'completed') return 'bg-green-400/10 text-green-500';
  if (action === 'deleted') return 'bg-red-400/10 text-red-500';
};