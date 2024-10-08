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
    if (!isFocused) {
      inputRef.current?.setSelectionRange(
        inputRef.current?.value.length,
        inputRef.current?.value.length
      );
    }
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
      text-gray-500 my-2 bg-gray-100'
      onClick={(e) => handleClick(e)}
    >
      <Checkbox
        name='checked'
        disabled={listId === 'home' || isDraggingStore}
        checked={checked}
        onChange={(e) => handleChecked(e)}
        className='mr-2 disabled:cursor-default'
      />

      <input
        ref={inputRef}
        name='name'
        type='text'
        disabled={listId === 'home'}
        className={`w-full h-8 pl-2 mr-2 whitespace-nowrap overflow-hidden text-ellipsis text-sm outline-none  rounded disabled:pointer-events-none bg-gray-100 focus:bg-white
         ${checked && !isFocused && 'line-through'} 
         ${!isFocused && 'pointer-events-none'}
        `}
        value={name}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        onClick={(e) => handleClick(e)}
        onBlur={handleBlur}
      />

      <Tooltip title='Delete task' disable={isDraggingStore}>
        <button
          disabled={listId === 'home'}
          onClick={handleDelete}
          className='group w-8 h-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-black/5 transition-all hover:bg-black/10 disabled:opacity-50 disabled:pointer-events-none touch-none cursor-default'
        >
          <Trash2 className='w-4 group-hover:text-red-400 select-none pointer-events-none' />
        </button>
      </Tooltip>
    </div>
  );
};

export default Task;
