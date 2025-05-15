import { ListProps } from '@shared/interfaces/list.interface';
import { TaskProps } from '@shared/interfaces/task.interface';

export const getTaskCount = (
  list: ListProps,
  tasks: TaskProps[],
  listId?: string
) => (list.listId === listId ? tasks.length : list.tasks.length);
