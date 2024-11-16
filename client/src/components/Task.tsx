import { Trash2 } from 'lucide-react';
import { TaskProps } from '../../../shared/interfaces/task.interface';
import { useTaskStore } from '@/store/taskStore';
import { useParams } from 'react-router-dom';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useDeferredValue, useEffect, useRef, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useListStore } from '@/store/listStore';
import Checkbox from '@/components/ui/checkbox';
import { Tooltip } from './Tooltip';
import { replaceEmojis } from '@/utils/replaceEmojis';
import { useDragStore } from '@/store/dragStore';
import { calculateHeight } from '@/utils/calculateHeight';
import { MAX_CONTENT_TASK } from '@/constants/base';

type TaskComponentProps = {
  task: TaskProps;
};

const Task = ({ task }: TaskComponentProps) => {
  const textareaRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const { tasks, setTasks } = useTaskStore();
  const { listId } = useParams();
  const [taskName, setTaskName] = useState(task.name);
  const [checked, setChecked] = useState(task.checked);
  const debouncedChecked = useDebounce(checked, 300);
  const { lists, setLists } = useListStore();
  const [isFocused, setIsFocused] = useState(false);
  const [previousName, setPreviousName] = useState(task.name);
  const { isDragging: isDraggingStore } = useDragStore();
  const deferredTaskName = useDeferredValue(taskName);

  const handleDelete = () => {
    if (!listId) return;
    const updateTasks = tasks.filter((elem) => elem.id !== task.id);
    requestUpdateList(listId, { tasks: updateTasks });
    const updateLists = [...lists];
    const index = lists.findIndex((l) => l.listId === listId);
    updateLists[index].tasks = updateTasks;
    setTasks(updateTasks);
    setLists([...updateLists]);
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setChecked(e.target.checked);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskName(e.target.value.trimStart());
    calculateHeight(textareaRef);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!textareaRef || !textareaRef.current) return;
    if (e.key === 'Enter') textareaRef.current.blur();
  };

  const handleDoubleClick = () => {
    textareaRef.current?.focus();
    if (!isFocused) textareaRef.current?.setSelectionRange(-1, -1);
    calculateHeight(textareaRef);
    setIsFocused(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.detail === 2) handleDoubleClick();
  };

  const handleBlur = () => {
    if (listId && taskName && taskName !== previousName) {
      textareaRef.current?.setSelectionRange(0, 0);
      const updateTasks = [...tasks];
      const taskIndex = tasks.findIndex((t) => t.id === task.id);
      const taskNameFormatted = replaceEmojis(taskName);
      updateTasks[taskIndex].name = taskNameFormatted;
      requestUpdateList(listId, { tasks: updateTasks });
      setTaskName(taskNameFormatted);
      setPreviousName(taskNameFormatted);
    } else setTaskName(previousName);
    setIsFocused(false);
    textareaRef.current.style.height = 'auto';
  };

  useEffect(() => {
    if (!listId || listId === 'home' || debouncedChecked === task.checked)
      return;
    const updateTasks = [...tasks];
    const taskIndex = tasks.findIndex((t) => t.id === task.id);
    updateTasks[taskIndex].checked = checked;
    requestUpdateList(listId, { tasks: updateTasks });
  }, [debouncedChecked]);

  useEffect(() => {
    if (taskName === deferredTaskName) return;
    const updateTasks = [...tasks];
    const taskIndex = tasks.findIndex((t) => t.id === task.id);
    const taskNameFormatted = replaceEmojis(deferredTaskName);
    updateTasks[taskIndex].name = taskNameFormatted;
  }, [deferredTaskName]);

  return (
    <div
      className='w-full h-full overflow-x-hidden flex justify-between items-center 
      text-neutral-500 dark:text-neutral-100 my-2 bg-neutral-100 dark:bg-neutral-900'
      onClick={handleClick}
    >
      <Checkbox
        name='checked'
        disabled={listId === 'home' || isDraggingStore}
        checked={checked}
        onChange={handleChecked}
        classNameContainer='self-baseline'
        className='mr-2 disabled:cursor-default z-10 top-1.5 w-5 h-5'
      />

      <textarea
        rows={1}
        ref={textareaRef}
        maxLength={MAX_CONTENT_TASK}
        disabled={listId === 'home'}
        className={`w-full min-h-8 h-full overflow-auto pt-[6px] pl-1.5 mr-2 text-sm
          bg-neutral-100 dark:bg-neutral-800 resize-none
          outline-none rounded
          ${isFocused ? 'opacity-100' : 'opacity-0'}
          `}
        value={taskName}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        onBlur={handleBlur}
      />
      <Tooltip title={taskName} disable={isDraggingStore}>
        <button
          disabled={listId === 'home'}
          className={`absolute pt-3.5 left-0 z-0 w-full h-full rounded-md flex items-start text-left
            cursor-default
            ${isFocused && 'pointer-events-none'}
          `}
        >
          <span
            className={`pl-9 ml-1.5 w-[calc(100%-6rem)] whitespace-nowrap overflow-hidden text-ellipsis text-sm ${
              !isFocused ? 'opacity-100' : 'opacity-0'
            }
            }`}
          >
            <span
              className={`${checked && 'strikethrough_complete'} strikethrough`}
            >
              {taskName}
            </span>
          </span>
        </button>
      </Tooltip>

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
