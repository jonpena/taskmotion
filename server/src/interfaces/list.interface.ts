import { TaskProps } from './task.interface';

export interface ListProps {
  name?: string;
  listId?: string;
  tasks: TaskProps[];
}
