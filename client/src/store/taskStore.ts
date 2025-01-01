import { create } from 'zustand';
import { TaskProps } from '@shared/task.interface';

interface TaskState {
  tasks: TaskProps[];
  setTasks: (tasks: TaskProps[]) => void;
  addTask: (newTask: TaskProps) => void;
  deleteTask: (taskId: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),

  addTask: (newTask) =>
    set((state) => ({
      tasks: [newTask, ...state.tasks],
    })),

  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
}));
