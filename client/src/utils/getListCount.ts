import { ListProps } from '@shared/list.interface';
import { format, isSameDay, subDays } from 'date-fns';

export const getListCount = (lists: ListProps[]) => {
  const total = lists.reduce((acc, list) => acc + list.tasks.length, 0);

  const completed = lists.reduce(
    (acc, list) => acc + list.tasks.filter((task) => task.checked).length,
    0
  );

  const overdue = lists.reduce((acc, list) => {
    const today = new Date();
    return (
      acc +
      list.tasks.filter((task) =>
        task.date ? !task.checked && !isSameDay(today, task.date) : 0
      ).length
    );
  }, 0);

  const pending = total - completed - overdue;

  const last7DaysStats = Array.from({ length: 7 }, (_, index) => {
    const date = subDays(new Date(), index);

    const completedTasksForDay = lists.reduce((acc, list) => {
      return (
        acc +
        list.tasks.filter(
          (task) =>
            task.checked && task.date && isSameDay(new Date(task.date), date)
        ).length
      );
    }, 0);

    return {
      name: format(date, 'EEE'),
      tasks: completedTasksForDay,
    };
  });

  const completedPercentage = Math.round((completed * 100) / total);
  const pendingPercentage = Math.round((pending * 100) / total);
  const overduePercentage = 100 - completedPercentage - pendingPercentage;

  return {
    total,
    completed,
    completedPercentage,
    pending,
    pendingPercentage,
    overdue,
    overduePercentage,
    last7DaysStats,
  };
};
