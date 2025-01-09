import { useParams } from 'react-router-dom';
import { TaskProps } from '@shared/task.interface';
import { Checkbox } from '@/components/ui/checkbox';
import { Strikethrough } from './ui/strikethrough';
import { DateBadge } from './buttons/DateBadge';
import { Textarea } from '@/components/ui/textarea';
import { DeleteButton } from './buttons/DeleteButton';
import { useDragStore } from '@/store/dragStore';
import { useTaskInteractions } from '@/hooks/useTaskInteractions';

interface TaskComponentProps {
  task: TaskProps;
}

export const Task = ({ task }: TaskComponentProps) => {
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
      className='w-full h-full overflow-x-hidden flex justify-between items-center 
      text-neutral-500 dark:text-neutral-100 my-2 bg-neutral-100 dark:bg-neutral-900'
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
          isFocused && '!bg-neutral-200 dark:!bg-neutral-800 opacity-100 peer'
        }`}
        onClick={handleClicks}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />

      <button
        onMouseDown={(e) => e.preventDefault()}
        className={`absolute pt-1.5 left-0 z-0 w-full h-8 rounded-md flex items-start text-left 
        pointer-events-none peer-focus:opacity-0 peer-focus:!text-transparent`}
      >
        <span
          className={`pl-9 ml-1.5 whitespace-nowrap overflow-hidden text-ellipsis text-sm 
          ${task.date ? 'w-[calc(100%-8.5rem)]' : 'w-[calc(100%-6rem)]'}`}
        >
          <Strikethrough checked={checked}>{taskName}</Strikethrough>
        </span>
      </button>

      {task.date && !checked && <DateBadge date={task.date} />}

      <DeleteButton onClick={handleDelete} />
    </div>
  );
};
