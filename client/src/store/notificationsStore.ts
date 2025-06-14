import { Notification } from '@shared/interfaces/notification.interface';
import { create } from 'zustand';

export interface NotificationsState {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
}

export const useNotificationsStore = create<NotificationsState>()((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
}));
