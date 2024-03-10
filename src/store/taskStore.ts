import { create } from "zustand";
import { TaskProps } from "../interfaces/task.interface";

interface BearState {
  tasks: TaskProps[];
  addTask: (newTask: TaskProps) => void;
  initTasks: (tasks: TaskProps[]) => void;
}

export const useTaskStore = create<BearState>()((set) => ({
  tasks: [],
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
  initTasks: (tasks) => set({ tasks }),
}));
