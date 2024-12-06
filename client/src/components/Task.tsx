import { useParams } from 'react-router-dom';
import { TaskProps } from '../../../shared/interfaces/task.interface';
import { useTaskStore } from '@/store/taskStore';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useDeferredValue, useEffect, useRef, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useListStore } from '@/store/listStore';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip } from './Tooltip';
import { replaceEmojis } from '@/utils/replaceEmojis';
import { useDragStore } from '@/store/dragStore';
import { calculateHeight } from '@/utils/calculateHeight';
import { Strikethrough } from './ui/strikethrough';
import { DateBadge } from './ui/DateBadge';
import { useModalStore } from '@/store/modalStore';
import { updateTaskField } from '@/services/updateTaskField';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';

type TaskComponentProps = {
  task: TaskProps;
};

const Task = ({ task }: TaskComponentProps) => {
  const MAX_TIMEOUT = 180;

  const { listId } = useParams();
  const { tasks, setTasks } = useTaskStore();
  const { lists, setLists } = useListStore();
  const { setIsOpen, setTask } = useModalStore();
  const textareaRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const [taskName, setTaskName] = useState(task.name);
  const deferredTaskName = useDeferredValue(taskName);
  const [checked, setChecked] = useState(task.checked);
  const debouncedChecked = useDebounce(checked, 300);
  const [isFocused, setIsFocused] = useState(false);
  const [previousName, setPreviousName] = useState(task.name);
  const { isDragging: isDraggingStore } = useDragStore();
  const [countClick, setCountClick] = useState(0);
  const debouncedCountClick = useDebounce(countClick, MAX_TIMEOUT);
  const [lastTapTime, setLastTapTime] = useState<number>(0);
  const [touchStartTime, setTouchStartTime] = useState<number>(0);

  const handleDelete = () => {
    // e.stopPropagation();
    if (!listId) return;
    const updateTasks = tasks.filter((elem) => elem.id !== task.id);
    requestUpdateList(listId, { tasks: updateTasks });
    const updateLists = [...lists];
    const index = lists.findIndex((l) => l.listId === listId);
    updateLists[index].tasks = updateTasks;
    setTasks(updateTasks);
    setLists([...updateLists]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskName(e.target.value.trimStart());
    calculateHeight(textareaRef);
  };

  const handleDoubleClick = () => {
    textareaRef.current?.focus();
    if (!isFocused) textareaRef.current?.setSelectionRange(-1, -1);
    calculateHeight(textareaRef);
    setIsFocused(true);
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(true);
    setTask({ ...task, checked });
  };

  const handleBlur = () => {
    if (listId && taskName && taskName !== previousName) {
      textareaRef.current?.setSelectionRange(0, 0);
      const taskNameFormatted = replaceEmojis(taskName);
      setTaskName(taskNameFormatted);
      const { id } = task;
      const updateTasks = updateTaskField(id, tasks, 'name', taskNameFormatted);
      requestUpdateList(listId, { tasks: updateTasks });
      setPreviousName(taskNameFormatted);
    } else setTaskName(previousName);
    setIsFocused(false);
    textareaRef.current.style.height = 'auto';
  };

  const handleClicks = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setCountClick(e.detail);
  };

  const handleTouchStart = () => {
    const currentTime = Date.now();
    setTouchStartTime(currentTime);
    const tapLength = currentTime - lastTapTime;

    if (tapLength < MAX_TIMEOUT && tapLength > 0) {
      setLastTapTime(0);
    } else {
      setLastTapTime(currentTime);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    const touchDuration = Date.now() - touchStartTime;
    if (touchDuration < MAX_TIMEOUT) setCountClick(countClick + 1);
  };

  useEffect(() => {
    if (!listId || listId === 'home' || debouncedChecked === task.checked)
      return;
    const updateTasks = updateTaskField(task.id, tasks, 'checked', checked);
    requestUpdateList(listId, { tasks: updateTasks });
  }, [debouncedChecked]);

  useEffect(() => {
    const { id } = task;
    const taskNameFormatted = replaceEmojis(deferredTaskName);
    const updateTasks = updateTaskField(id, tasks, 'name', taskNameFormatted);
    setTasks(updateTasks);
  }, [deferredTaskName]);

  useEffect(() => {
    if (debouncedCountClick === 0) return;
    if (debouncedCountClick === 1 && !isFocused) handleClick();
    if (debouncedCountClick > 1) handleDoubleClick();
    setCountClick(0);
  }, [debouncedCountClick]);

  useEffect(() => {
    setChecked(task.checked);
    setTaskName(task.name);
  }, [task.checked, task.name]);

  return (
    <div
      className='w-full h-full overflow-x-hidden flex justify-between items-center 
      text-neutral-500 dark:text-neutral-100 my-2 bg-neutral-100 dark:bg-neutral-900'
    >
      <Checkbox
        name='checked'
        disabled={listId === 'home' || isDraggingStore}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        classNameContainer='self-baseline'
        className='mr-2 disabled:cursor-default z-10 top-1.5'
      />

      <Textarea
        reference={textareaRef}
        disabled={listId === 'home'}
        value={taskName}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${isFocused ? 'opacity-100' : 'opacity-0'}`}
      />

      <Tooltip title={taskName} disable={listId === 'home' || isDraggingStore}>
        <button
          disabled={listId === 'home'}
          className={`absolute pt-3.5 left-0 z-0 w-full h-full rounded-md flex items-start text-left
        cursor-default
        ${isFocused && 'pointer-events-none'}
      `}
          onClick={handleClicks}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <span
            className={`pl-9 ml-1.5 whitespace-nowrap overflow-hidden text-ellipsis text-sm 
              ${!isFocused ? 'opacity-100' : 'opacity-0'}
              ${task.date ? 'w-[calc(100%-8.5rem)]' : 'w-[calc(100%-6rem)]'}
            `}
          >
            <Strikethrough checked={checked}>{taskName}</Strikethrough>
          </span>
        </button>
      </Tooltip>

      {task.date && <DateBadge date={task.date} />}

      <Tooltip title='Delete task' disable={isDraggingStore}>
        <button
          disabled={listId === 'home'}
          onClick={handleDelete}
          className={`group w-8 h-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-neutral-800 transition-all hover:bg-black/10 disabled:opacity-50 
            disabled:pointer-events-none touch-none cursor-default z-0 self-start`}
        >
          <Trash2 className='w-4 group-hover:text-red-400 select-none pointer-events-none' />
        </button>
      </Tooltip>
    </div>
  );
};

export default Task;
