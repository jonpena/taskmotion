import { TaskProps } from '@shared/task.interface';
import { ListProps } from '@shared/list.interface';

export const mergeListUpdate = (id: string, lists: ListProps[], updatedTasks: TaskProps[]
): ListProps[] => {
  return [...lists].map((l: ListProps) =>
    l.listId === id ? { ...l, tasks: updatedTasks } : l
  );
};
