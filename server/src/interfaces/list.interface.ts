import { Task } from "./task.interface";

export interface ListProps {
  name: string;
  listId: string;
  tasks: Task[];
}