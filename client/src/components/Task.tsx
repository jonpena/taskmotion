import { TaskProps } from '@shared/task.interface';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { TextInput } from '@/components/ui/text-input';
import { DeleteButton } from './buttons/DeleteButton';
import { useDragStore } from '@/store/dragStore';
import { useTask } from '@/hooks/task/useTask';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import SortableButton from './dnd/SortableButton';
import { TextDisplay } from './TextDisplay';
import { dateStyle, dateText } from '@/utils/dateUtils';
import { OptionTaskButton } from './buttons/OptionTaskButton';

interface TaskComponentProps {
  task: TaskProps;
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
}

export const Task = ({ task, attributes, listeners }: TaskComponentProps) => {
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
    handleDuplicate,
    handleMoveTo,
  } = useTask(task);

  return (
    <div
      title={task.name}
      className={`w-full h-full p-1.5 my-1 overflow-x-hidden
      rounded-lg flex justify-between items-center text-neutral-500 dark:text-neutral-100
      bg-neutral-100 dark:bg-neutral-900`}
    >
      <SortableButton attributes={attributes} listeners={listeners} />

      <Checkbox
        name='checked'
        disabled={isDraggingStore}
        checked={checked}
        onChange={handleCheckboxChange}
        classNameContainer='self-baseline'
        className='ml-1 disabled:cursor-default z-10 top-1.5'
      />

      <TextInput
        ref={textareaRef}
        value={taskName}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`mx-1.5 opacity-0 
          ${
            isFocused &&
            `
           bg-neutral-200 focus:bg-white dark:bg-neutral-900
           dark:focus:bg-neutral-800 focus:opacity-100 peer`
          }`}
      />

      <TextDisplay
        taskName={task.name}
        checked={checked}
        date={task.date || ''}
        onClick={handleClicks}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />

      {task.date && !checked && (
        <Badge text={dateText(task.date)} className={dateStyle(task.date)} />
      )}

      <DeleteButton onClick={handleDelete} onTouchEnd={handleDelete} />

      <OptionTaskButton
        handleDuplicate={handleDuplicate}
        handleMoveTo={handleMoveTo}
      />
    </div>
  );
};
