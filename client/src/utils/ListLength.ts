import { ListProps } from '@shared/list.interface';
import { TaskProps } from '@shared/task.interface';

export function ListLength(
  list: ListProps,
  tasks: TaskProps[],
  listId?: string
) {
  return list.listId === listId ? tasks.length : list.tasks.length;
}
