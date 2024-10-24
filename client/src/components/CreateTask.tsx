import { useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useTaskStore } from '../store/taskStore';
import { useParams } from 'react-router-dom';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useListStore } from '@/store/listStore';
import { Input } from '@/components/ui/input';
import Checkbox from '@/components/ui/checkbox';
import { Plus } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { replaceEmojis } from '@/utils/replaceEmojis';

const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const { tasks, setTasks } = useTaskStore();
  const { setLists } = useListStore();
  const lists = useListStore((state) => state.lists);
  const { listId } = useParams();
  const [checked, setChecked] = useState(false);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const createTask = (name: string) => {
    if (!listId || !name) return;

    const newTask = {
      id: uuid(),
      name: replaceEmojis(name),
      checked,
    };
    const newTasksArray = [newTask, ...tasks];
    requestUpdateList(listId, { tasks: newTasksArray });
    const updateLists = [...lists];
    const index = lists.findIndex((l) => l.listId === listId);
    updateLists[index].tasks = newTasksArray;
    setTasks(newTasksArray);
    setLists([...updateLists]);
    setTaskName('');
    setChecked(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') createTask(taskName);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    taskName ? createTask(taskName) : inputRef.current?.focus();
  };

  return (
    <div className='group flex items-center w-full bg-gray-100 dark:bg-neutral-900 rounded-md px-2'>
      <Checkbox
        disabled={listId === 'home'}
        name='checked'
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />

      <Input
        ref={inputRef}
        disabled={listId === 'home'}
        type='text'
        placeholder='Create new task...'
        className='text-neutral-600 dark:text-neutral-50 px-3 outline-none w-full h-12 border-none focus-visible:ring-0 focus-visible:placeholder:text-neutral-400 dark:focus-visible:placeholder:text-neutral-100 rounded-none shadow-none'
        onKeyDown={handleKeyPress}
        onChange={(e) => setTaskName(e.target.value.trimStart())}
        value={taskName}
      />

      <Tooltip title='Create new task'>
        <button
          onMouseDown={handleClick}
          className='bg-white dark:bg-neutral-800 w-7 h-7 right-2 top-3 flex justify-center items-center 
        text-sm font-medium flex-grow-1 rounded-lg select-none aspect-square'
        >
          <Plus className='w-4 h-4 text-neutral-600 dark:text-neutral-50 pointer-events-none group-focus-within:rotate-90 transition-transform duration-200' />
        </button>
      </Tooltip>
    </div>
  );
};

export default CreateTask;
