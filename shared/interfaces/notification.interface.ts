export interface Notification {
  id: string;
  type: 'list' | 'task';
  action: 'completed' | 'created' | 'deleted';
  message: string;
  timestamp: string;
}
