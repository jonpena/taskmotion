import { TaskProps } from '@shared/types/task.types';
import { ListProps } from '@shared/types/list.types';

export const updateListState = (
  id: string,
  lists: ListProps[],
  updatedTasks: TaskProps[]
): ListProps[] => {
  return [...lists].map((l: ListProps) => (l.listId === id ? { ...l, tasks: updatedTasks } : l));
};
