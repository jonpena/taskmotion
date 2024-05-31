import { create } from 'zustand';
import { TaskProps } from '../interfaces/task.interface';

interface BearState {
  tasks: TaskProps[];
  addTask: (newTask: TaskProps) => void;
  setTasks: (tasks: TaskProps[]) => void;
}

export const useTaskStore = create<BearState>()((set) => ({
  tasks: [],
  addTask: (newTask) => set((state) => ({ tasks: [newTask, ...state.tasks] })),
  setTasks: (tasks) => set({ tasks }),
}));
