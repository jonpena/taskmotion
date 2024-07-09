import { ListProps } from '@/interfaces/list.interface';
import { TaskProps } from '@/interfaces/task.interface';

export function ListLength(
  list: ListProps,
  tasks: TaskProps[],
  listId?: string
) {
  return list.listId === listId ? tasks.length : list.tasks.length;
}
