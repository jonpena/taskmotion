import { TaskProps } from "./task.interface";

export interface ListProps {
  id: string;
  name: string;
  tasks: TaskProps[];
}
