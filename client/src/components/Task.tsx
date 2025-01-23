import { useParams } from 'react-router-dom';
import { TaskProps } from '@shared/task.interface';
import { Checkbox } from '@/components/ui/checkbox';
import { Strikethrough } from './ui/strikethrough';
import { DateBadge } from './buttons/DateBadge';
import { Textarea } from '@/components/ui/textarea';
import { DeleteButton } from './buttons/DeleteButton';
import { useDragStore } from '@/store/dragStore';
import { useTaskInteractions } from '@/hooks/useTaskInteractions';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import SortableButton from './dnd/SortableButton';

interface TaskComponentProps {
  task: TaskProps;
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
}

export const Task = ({ task, attributes, listeners }: TaskComponentProps) => {
  const { listId } = useParams();
  const { isDragging: isDraggingStore } = useDragStore();

  const {
    textareaRef,
    taskName,
    checked,
    isFocused,
    handleChange,
    handleBlur,
    handleDelete,
    handleCheckboxChange,
    handleClicks,
    handleTouchStart,
    handleTouchEnd,
  } = useTaskInteractions(task, listId);

  return (
    <div
      className='w-full h-full p-2 my-1 overflow-x-hidden rounded-lg flex justify-between items-center 
      text-neutral-500 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-900'
      onClick={handleClicks}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Checkbox
        name='checked'
        disabled={isDraggingStore}
        checked={checked}
        onChange={handleCheckboxChange}
        classNameContainer='self-baseline'
        className='mr-2 disabled:cursor-default z-10 top-1.5'
      />

      <Textarea
        reference={textareaRef}
        value={taskName}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`opacity-0 ${
          isFocused &&
          `bg-neutral-200 dark:bg-neutral-900 dark:focus:bg-neutral-800
           dark:focus:opacity-100 peer`
        }`}
      />

      <button
        onMouseDown={(e) => e.preventDefault()}
        className={`absolute pt-1.5 left-0 z-0 w-full h-8 rounded-md flex items-start text-left 
        pointer-events-none peer-focus:opacity-0 peer-focus:!text-transparent`}
      >
        <span
          className={`pl-9 ml-1.5 whitespace-nowrap overflow-hidden text-ellipsis text-sm 
          ${
            task.date && !checked
              ? 'w-[calc(100%-8.5rem)]'
              : 'w-[calc(100%-6rem)]'
          }`}
        >
          <Strikethrough checked={checked}>{taskName}</Strikethrough>
        </span>
      </button>

      {task.date && !checked && <DateBadge date={task.date} />}

      <DeleteButton onClick={handleDelete} />

      <SortableButton attributes={attributes} listeners={listeners} />
    </div>
  );
};
