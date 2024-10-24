import { Trash2 } from 'lucide-react';
import { TaskProps } from '../../../shared/interfaces/task.interface';
import { useTaskStore } from '@/store/taskStore';
import { useParams } from 'react-router-dom';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useListStore } from '@/store/listStore';
import Checkbox from './ui/checkbox';
import { Tooltip } from './Tooltip';
import { replaceEmojis } from '@/utils/replaceEmojis';
import { useDragStore } from '@/store/dragStore';
import { calculateHeight } from '@/utils/calculateHeight';

type TaskComponentProps = {
  task: TaskProps;
};

const Task = ({ task }: TaskComponentProps) => {
  const textareaRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const { tasks, setTasks } = useTaskStore();
  const { listId } = useParams();
  const [taskName, setTaskName] = useState(task.name);
  const [checked, setChecked] = useState(task.checked);
  const debouncedChecked = useDebounce(checked, 200);
  const { setLists } = useListStore();
  const lists = useListStore((state) => state.lists);
  const [isFocused, setIsFocused] = useState(false);
  const [previousName, setPreviousName] = useState(task.name);
  const { isDragging: isDraggingStore } = useDragStore();

  const handleDelete = () => {
    if (listId) {
      const newTasks = tasks.filter((elem) => elem.id !== task.id);
      requestUpdateList(listId, { tasks: newTasks });
      const updateLists = [...lists];
      const index = lists.findIndex((l) => l.listId === listId);
      updateLists[index].tasks = newTasks;
      setLists([...updateLists]);
      setTasks(newTasks);
    }
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
    if (listId && name && name !== previousName) {
      textareaRef.current?.setSelectionRange(0, 0);
      const aux = [...tasks];
      const findTaskIndex = tasks.findIndex((elem) => elem.id === task.id);
      const formattedName = replaceEmojis(name);
      aux[findTaskIndex].name = formattedName;
      requestUpdateList(listId, { tasks: aux });
      setTaskName(formattedName);
      setPreviousName(formattedName);
    } else setTaskName(previousName);
    setIsFocused(false);
    textareaRef.current.style.height = 'auto';
  };

  useEffect(() => {
    if (!listId || listId === 'home' || debouncedChecked === task.checked)
      return;
    const aux = [...tasks];
    const findTaskIndex = tasks.findIndex((elem) => elem.id === task.id);
    aux[findTaskIndex].checked = checked;
    requestUpdateList(listId, { tasks: aux });
    const updateLists = [...lists];
    const index = lists.findIndex((l) => l.listId === listId);
    updateLists[index].tasks = aux;
    setLists([...updateLists]);
  }, [debouncedChecked]);

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
        className='mr-2 disabled:cursor-default z-10 top-[6px]'
      />

      <textarea
        rows={1}
        ref={textareaRef}
        maxLength={180}
        className={`w-full min-h-8 h-full overflow-auto pt-1 pl-2 mr-2 text-sm
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
        <div
          className={`absolute pt-3 left-0 z-0 w-full h-full rounded-md flex items-start
            ${isFocused && 'pointer-events-none'}
          `}
        >
          <span
            className={`pl-9 ml-[10px] w-[calc(100%-6rem)] whitespace-nowrap overflow-hidden text-ellipsis text-sm ${
              !isFocused ? 'opacity-100' : 'opacity-0'
            } ${checked && 'line-through'}
            }`}
          >
            {taskName}
          </span>
        </div>
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
