import { TaskProps } from '@shared/types/task.types';

export const reorder = (list: TaskProps[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
