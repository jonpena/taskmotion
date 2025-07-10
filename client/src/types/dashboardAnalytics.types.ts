export type DashboardAnalytics = {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  tasksByDay: {
    name: string;
    tasks: number;
  }[];
  notifications?: {
    id: number;
    type: 'created' | 'completed' | 'overdue';
    message: string;
    timestamp: string;
  }[];
};
