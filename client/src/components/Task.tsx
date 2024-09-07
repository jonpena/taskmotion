import { Trash2 } from 'lucide-react';
import { TaskProps } from '../../../shared/interfaces/task.interface';
import { useTaskStore } from '@/store/taskStore';
import { useParams } from 'react-router-dom';
import { requestUpdateList } from '@/services/requestUpdateList';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useListStore } from '@/store/listStore';
import Checkbox from './UI/checkbox';

type TaskComponentProps = {
  task: TaskProps;
};

const Task = ({ task }: TaskComponentProps) => {
  const { setTasks } = useTaskStore();
  const tasks = useTaskStore((state) => state.tasks);
  const { listId } = useParams();
  const [name, setName] = useState(task.name);
  const [checked, setChecked] = useState(task.checked);
  const debouncedName = useDebounce(name, 500);
  const debouncedChecked = useDebounce(checked, 200);
  const inputRef =
    useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  const { setLists } = useListStore();
  const lists = useListStore((state) => state.lists);
  const [isFocused, setIsFocused] = useState(false);

  const handleDelete = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!listId) return;

    if (e.detail === 1) {
      const newTasks = tasks.filter((elem) => elem.id !== task.id);
      requestUpdateList(listId, { tasks: newTasks });
      const updateLists = [...lists];
      const index = lists.findIndex((l) => l.listId === listId);
      updateLists[index].tasks = newTasks;
      setLists([...updateLists]);
      setTasks(newTasks);
    } else if (e.detail === 2) e.stopPropagation();
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setChecked(e.target.checked);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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

  useEffect(() => {
    if (!listId || debouncedName === task.name) return;
    const aux = [...tasks];
    const findTaskIndex = tasks.findIndex((elem) => elem.id === task.id);
    aux[findTaskIndex].name = name;
    requestUpdateList(listId, { tasks: aux });
  }, [debouncedName]);

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
      text-gray-500 my-2 bg-gray-200 cursor-pointer'
      title={name}
      onClick={(e) => handleClick(e)}
    >
      <Checkbox
        name='checked'
        disabled={listId === 'home'}
        checked={checked}
        onChange={(e) => handleChecked(e)}
        className='mr-2 disabled:cursor-default'
      />

      <input
        ref={inputRef}
        name='name'
        type='text'
        disabled={listId === 'home'}
        className={`w-[90%] whitespace-nowrap overflow-hidden text-ellipsis text-sm h-7 pl-2 outline-none cursor-pointer rounded disabled:pointer-events-none bg-gray-200 focus:bg-gray-50
         ${checked && 'line-through'} 
         ${!isFocused && 'pointer-events-none'}
        `}
        value={name}
        onChange={handleTextChange}
        onKeyDown={handleKeyPress}
        onClick={(e) => handleClick(e)}
        onBlur={() => setIsFocused(false)}
      />

      <button
        disabled={listId === 'home'}
        title='Delete task'
        onClick={(e) => handleDelete(e)}
        className='group h-8 w-8 flex flex-shrink-0 cursor-pointer items-center justify-center rounded-lg bg-black/5 transition-all hover:bg-black/10 disabled:opacity-50 disabled:pointer-events-none'
      >
        <Trash2 className='w-4 group-hover:text-red-400' />
      </button>
    </div>
  );
};

export default Task;
