export interface INotification {
  type: 'list' | 'task';
  action: 'created' | 'completed' | 'deleted';
  message: string;
  timestamp: string;
}