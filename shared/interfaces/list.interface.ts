import { TaskProps } from './task.interface';

export interface ListProps {
  listId?: string;
  name?: string;
  tasks: TaskProps[];
  created_at?: string;
}
