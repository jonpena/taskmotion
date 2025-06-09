export interface Notification {
  type: 'list' | 'task';
  action: 'completed' | 'created' | 'deleted';
  message: string;
  timestamp: string;
  id: string;
}
