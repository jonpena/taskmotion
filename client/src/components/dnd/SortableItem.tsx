import SortableButton from '@/components/dnd/SortableButton';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { TASK_MAXWIDTH, TASK_MINWIDTH } from '@/constants/base';
import Task from '@/components/Task';
import { TaskProps } from '@shared/task.interface';

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

  return (
    <li
      ref={setNodeRef}
      style={{
        maxWidth: `calc(clamp(${TASK_MINWIDTH}px, 100vw, ${TASK_MAXWIDTH}px))`,
        opacity: isDragging ? 0 : 1,
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={`relative bg-gray-100 dark:bg-neutral-900 flex 
        justify-between items-start flex-grow list-none user-select-none rounded-lg mx-auto px-2
        `}
    >
      <Task task={task} />
      <SortableButton attributes={attributes} listeners={listeners} />
    </li>
  );
};

export default SortableItem;
