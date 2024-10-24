import { type CSSProperties } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TASK_MAXWIDTH, TASK_MINWIDTH } from '@/constants/base';
import Task from '../Task';
import { TaskProps } from '@shared/task.interface';
import SortableButton from '@/components/sortable/SortableButton';

type SortableItemProps = {
  task: TaskProps;
};

const SortableItem = ({ task }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    maxWidth: `calc(clamp(${TASK_MINWIDTH}px, 100vw, ${TASK_MAXWIDTH}px))`,
    margin: '0 auto',
    paddingLeft: '10px',
    paddingRight: '10px',
    userSelect: 'none',
    transition,
    height: '48px',
    borderRadius: '8px',
    opacity: isDragging ? 0 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`relative bg-gray-100 dark:bg-neutral-900 flex justify-between items-center flex-grow list-none`}
    >
      <Task task={task} />
      <SortableButton attributes={attributes} listeners={listeners} />
    </li>
  );
};

export default SortableItem;
