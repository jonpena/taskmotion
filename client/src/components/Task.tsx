import { Trash2 } from 'lucide-react';
import { TaskProps } from '../interfaces/task.interface';
import { useTaskStore } from '@/store/taskStore';
import { useParams } from 'react-router-dom';
import { requestUpdateList } from '@/services/requestUpdateList';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useListStore } from '@/store/listStore';
import Checkbox from './UI/Checkbox';

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

  const handleDelete = () => {
    if (!listId) return;
    const newTasks = tasks.filter((elem) => elem.id !== task.id);
    requestUpdateList(listId, { tasks: newTasks });
    const updateLists = [...lists];
    const index = lists.findIndex((l) => l.listId === listId);
    updateLists[index].tasks = newTasks;
    setLists([...updateLists]);
    setTasks(newTasks);
  };

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!inputRef || !inputRef.current) return;
    if (e.key === 'Enter') inputRef.current.blur();
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
      text-gray-500 my-2 bg-gray-200'
    >
      <Checkbox
        name='checked'
        disabled={listId === 'home'}
        checked={checked}
        onChange={handleChecked}
        className='mr-2 cursor-pointer disabled:cursor-default'
      />

      <input
        ref={inputRef}
        name='name'
        title={name}
        type='text'
        disabled={listId === 'home'}
        className={`w-[90%] whitespace-nowrap overflow-hidden text-ellipsis text-sm h-7 pl-2 outline-none cursor-pointer rounded disabled:pointer-events-none bg-gray-200 focus:bg-gray-50
         ${checked && 'line-through'} 
        `}
        value={name}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />

      <button
        disabled={listId === 'home'}
        title='Delete task'
        onClick={handleDelete}
        className='group h-8 w-8 flex flex-shrink-0 cursor-pointer items-center justify-center rounded-lg bg-black/5 transition-all hover:bg-black/10 disabled:opacity-50 disabled:pointer-events-none'
      >
        <Trash2 className='w-4 group-hover:text-red-400' />
      </button>
    </div>
  );
};

export default Task;