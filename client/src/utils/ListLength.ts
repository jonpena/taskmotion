import { ListProps } from '@shared/list.interface';
import { TaskProps } from '@shared/task.interface';

export const listLength = (
  list: ListProps,
  tasks: TaskProps[],
  listId?: string
) => (list.listId === listId ? tasks.length : list.tasks.length);
