import { TaskProps } from '@shared/task.interface';

export const updateTaskField = (
  id: string,
  tasks: TaskProps[],
  field: string,
  value: string | boolean
) => {
  const updateTasks = [...tasks];
  const taskIndex = tasks.findIndex((t) => t.id === id);
  updateTasks[taskIndex] = {
    ...updateTasks[taskIndex],
    [field]: value,
  };
  return updateTasks;
};
