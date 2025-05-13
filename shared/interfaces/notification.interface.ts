export interface INotification {
  type: 'list' | 'task';
  action: 'completed' | 'created' | 'deleted';
  message: string;
  timestamp: string;
}
