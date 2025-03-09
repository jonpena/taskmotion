import { INotification } from '@shared/notification.interface';
import { create } from 'zustand';

export interface NotificationsState {
  notifications: INotification[];
  setNotifications: (notifications: INotification[]) => void;
}

export const useNotificationsStore = create<NotificationsState>()((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
}));
