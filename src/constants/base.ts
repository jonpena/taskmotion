import { ListProps } from '../interfaces/list.interface';

export const TASK_MAXWIDTH = 640;
export const TASK_MINWIDTH = 375;

export const LIST_DEFAULT: ListProps[] = [
  {
    listId: '1',
    name: 'home',
    tasks: [],
  },
  {
    listId: '2',
    name: 'personal',
    tasks: [],
  },
];
