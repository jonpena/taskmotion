import { TaskProps } from '@shared/task.interface';

export const mergeTaskUpdate = (
  id: string,
  tasks: TaskProps[],
  task: Partial<TaskProps>
): TaskProps[] => {
  const taskIndex = tasks.findIndex((t) => t.id === id);

  // Validación para asegurarse de que la tarea existe
  if (taskIndex === -1) {
    throw new Error(`Task with id ${id} not found`);
  }

  const updateTasks = [...tasks];
  updateTasks[taskIndex] = {
    ...updateTasks[taskIndex],
    ...task,
  };

  return updateTasks;
};
