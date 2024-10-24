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

type TaskComponentProps = {
  task: TaskProps;
};

const Task = ({ task }: TaskComponentProps) => {
  const { setTasks } = useTaskStore();
  const tasks = useTaskStore((state) => state.tasks);
  const { listId } = useParams();
  const [name, setName] = useState(task.name);
  const [checked, setChecked] = useState(task.checked);
  const debouncedChecked = useDebounce(checked, 200);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trimStart());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!inputRef || !inputRef.current) return;
    if (e.key === 'Enter') inputRef.current.blur();
  };

  const handleDoubleClick = () => {
    inputRef.current?.focus();
    if (!isFocused) inputRef.current?.setSelectionRange(-1, -1);
    setIsFocused(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.detail === 2) handleDoubleClick();
  };

  const handleBlur = () => {
    if (listId && name && name !== previousName) {
      inputRef.current?.setSelectionRange(0, 0);
      const aux = [...tasks];
      const findTaskIndex = tasks.findIndex((elem) => elem.id === task.id);
      const formattedName = replaceEmojis(name);
      aux[findTaskIndex].name = formattedName;
      requestUpdateList(listId, { tasks: aux });
      setName(formattedName);
      setPreviousName(formattedName);
    } else setName(previousName);
    setIsFocused(false);
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
      onClick={(e) => handleClick(e)}
    >
      <Checkbox
        name='checked'
        disabled={listId === 'home' || isDraggingStore}
        checked={checked}
        onChange={handleChecked}
        className='mr-2 disabled:cursor-default z-10'
      />

      <input
        ref={inputRef}
        type='text'
        className={`w-full pl-2 mr-2 h-8 whitespace-nowrap overflow-hidden text-ellipsis text-sm bg-neutral-100 dark:bg-neutral-800
          outline-none rounded
          ${isFocused ? 'opacity-100' : 'opacity-0'}
          `}
        value={name}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        onBlur={handleBlur}
      />
      <Tooltip title={name} disable={isDraggingStore}>
        <div
          className={`absolute left-0 z-0 w-full h-12 rounded-md flex items-center 
            ${isFocused && 'pointer-events-none'}
          `}
        >
          <span
            className={`pl-9 ml-[10px] w-[calc(100%-5.5rem)] whitespace-nowrap overflow-hidden text-ellipsis text-sm ${
              !isFocused ? 'opacity-100' : 'opacity-0'
            } ${checked && 'line-through'}
            }`}
          >
            {name}
          </span>
        </div>
      </Tooltip>

      <Tooltip title='Delete task' disable={isDraggingStore}>
        <button
          disabled={listId === 'home'}
          onClick={handleDelete}
          className={`group w-8 h-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-neutral-800 transition-all hover:bg-black/10 disabled:opacity-50 
            disabled:pointer-events-none touch-none cursor-default z-0`}
        >
          <Trash2 className='w-4 group-hover:text-red-400 select-none pointer-events-none' />
        </button>
      </Tooltip>
    </div>
  );
};

export default Task;
