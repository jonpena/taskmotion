import { format, isPast, isToday, startOfDay } from 'date-fns';

type DateBadgeProps = {
  date: string | Date;
};

export const DateBadge = ({ date }: DateBadgeProps) => {
  const dateObj = new Date(date);

  const getDateStyle = () => {
    if (isToday(dateObj)) {
      return 'bg-amber-400/10 text-amber-500';
    }
    return isPast(startOfDay(dateObj))
      ? 'bg-red-400/10 text-red-500'
      : 'bg-green-400/10 text-green-500';
  };

  const getDateText = () => {
    if (isToday(dateObj)) return 'Today';
    return format(dateObj, 'd.MMM');
  };

  return (
    <div
      className={`table self-baseline rounded-lg text-xs font-medium leading-none px-1 py-1.5 mr-1
        ${getDateStyle()}`}
    >
      {getDateText()}
    </div>
  );
};
