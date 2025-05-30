import { TaskProps } from '@shared/interfaces/task.interface';
import { ListProps } from '@shared/interfaces/list.interface';

export const updateListState = (
  id: string,
  lists: ListProps[],
  updatedTasks: TaskProps[]
): ListProps[] => {
  return [...lists].map((l: ListProps) =>
    l.listId === id ? { ...l, tasks: updatedTasks } : l
  );
};
