import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useTaskStore } from '../store/taskStore';
import { useParams } from 'react-router-dom';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useListStore } from '@/store/listStore';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { replaceEmojis } from '@/utils/replaceEmojis';
import { MAX_CONTENT_TASK } from '@/constants/base';
import { useShortcut } from '@/hooks/useShortcut';
import { useMediaQuery } from '@uidotdev/usehooks';
import { format } from 'date-fns';
import CalendarButton from './buttons/CalendarButton';
import ShortcutButton from './buttons/ShortcutButton';
import AddButton from './buttons/AddButton';

const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const { tasks, setTasks } = useTaskStore();
  const { setLists } = useListStore();
  const lists = useListStore((state) => state.lists);
  const { listId } = useParams();
  const [checked, setChecked] = useState(false);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const keydown = useShortcut(['Control+e']);
  const isSmallDevice = useMediaQuery('only screen and (max-width : 1023px)');
  const [date, setDate] = useState<string | undefined>(undefined);

  const createTask = (name: string) => {
    if (!listId || !name) return;

    const newTask = {
      id: uuid(),
      name: replaceEmojis(name),
      description: '',
      checked,
      date: date ? format(date, 'MM-dd-yyyy') : '',
    };
    const updateTasks = [newTask, ...tasks];
    requestUpdateList(listId, { tasks: updateTasks });
    setTasks(updateTasks);
    const updateLists = [...lists];
    const index = lists.findIndex((l) => l.listId === listId);
    updateLists[index].tasks = updateTasks;
    setLists([...updateLists]);
    setTaskName('');
    setChecked(false);
    setDate(undefined);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') createTask(taskName);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    taskName ? createTask(taskName) : inputRef.current?.focus();
  };

  useEffect(() => {
    if (keydown === 'Control+e') inputRef.current?.focus();
  }, [keydown]);

  return (
    <div className='relative group flex items-center w-full bg-gray-100 dark:bg-neutral-900 rounded-md px-2'>
      <Checkbox
        disabled={listId === 'home'}
        name='checked'
        checked={checked}
        className='transition-all duration-1000'
        onChange={(e) => setChecked(e.target.checked)}
      />

      <Input
        type='text'
        maxLength={MAX_CONTENT_TASK}
        ref={inputRef}
        disabled={listId === 'home'}
        placeholder='Create new task...'
        className='text-neutral-600 dark:text-neutral-50 px-3 outline-none w-full h-12 border-none focus-visible:ring-0 focus-visible:placeholder:text-neutral-400 dark:focus-visible:placeholder:text-neutral-100 rounded-none shadow-none'
        onKeyDown={handleKeyPress}
        onChange={(e) => setTaskName(e.target.value.trimStart())}
        value={taskName}
      />

      {!isSmallDevice && (
        <ShortcutButton keys='E' className={`${taskName && 'opacity-0'}`} />
      )}

      <CalendarButton
        date={date}
        setDate={setDate}
        disabled={listId === 'home'}
        className={`${!taskName && 'opacity-0'}`}
      />

      <AddButton
        disabled={listId === 'home'}
        title='Create new task'
        onMouseDown={handleClick}
      />
    </div>
  );
};

export default CreateTask;
