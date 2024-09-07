import { ListProps } from '@shared/list.interface';
import { TaskProps } from '@shared/task.interface';

export function ListLengthCompleted(
  list: ListProps,
  tasks: TaskProps[],
  listId: string
) {
  return list.listId === listId
    ? tasks.filter((t) => t.checked).length
    : list.tasks.filter((t) => t.checked).length;
}
