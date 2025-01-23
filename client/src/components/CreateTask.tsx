import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { useTaskStore } from '../store/taskStore';
import { useParams } from 'react-router-dom';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useListStore } from '@/store/listStore';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { replaceEmojis } from '@/utils/replaceEmojis';
import { MAX_CONTENT_TASK, SIZE_ID } from '@/constants/base';
import { useShortcut } from '@/hooks/useShortcut';
import { useMediaQuery } from '@uidotdev/usehooks';
import { format } from 'date-fns';
import { CalendarButton } from './buttons/CalendarButton';
import { ShortcutBadge } from './buttons/ShortcutBadge';
import { AddButton } from './buttons/AddButton';

const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const { tasks, setTasks } = useTaskStore();
  const { lists, setLists } = useListStore();
  const { listId } = useParams();
  const [checked, setChecked] = useState(false);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const keydown = useShortcut(['Control+e']);
  const isSmallDevice = useMediaQuery('only screen and (max-width : 1023px)');
  const [date, setDate] = useState<string | undefined>(undefined);

  const createTask = () => {
    if (taskName && listId) {
      const newTask = {
        id: nanoid(SIZE_ID),
        name: replaceEmojis(taskName),
        description: '',
        checked,
        date: date ? format(date, 'MM-dd-yyyy') : '',
      };
      const updateTasks = [newTask, ...tasks];
      requestUpdateList(listId, { tasks: updateTasks });
      setTasks(updateTasks);
      const index = lists.findIndex((l) => l.listId === listId);
      const updateLists = [...lists];
      if (index !== -1) updateLists[index].tasks = updateTasks;
      setDate(undefined);
      setChecked(false);
      setTaskName('');
      setLists([...updateLists]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') createTask();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    taskName ? createTask() : inputRef.current?.focus();
  };

  useEffect(() => {
    if (keydown === 'Control+e') inputRef.current?.focus();
  }, [keydown]);

  return (
    <div className='relative group flex items-center w-full bg-gray-100 dark:bg-neutral-900 rounded-md px-2'>
      <Checkbox
        name='checked'
        checked={checked}
        className='transition-all duration-1000'
        onChange={(e) => setChecked(e.target.checked)}
      />

      <Input
        type='text'
        maxLength={MAX_CONTENT_TASK}
        ref={inputRef}
        placeholder='Create new task...'
        className='text-neutral-600 dark:text-neutral-50 px-3 outline-none w-full h-12 border-none focus-visible:ring-0 focus-visible:placeholder:text-neutral-400 dark:focus-visible:placeholder:text-neutral-100 rounded-none shadow-none'
        onKeyDown={handleKeyPress}
        onChange={(e) => setTaskName(e.target.value.trimStart())}
        value={taskName}
      />

      {!isSmallDevice && (
        <ShortcutBadge keys='E' className={`${taskName && 'opacity-0'}`} />
      )}

      <CalendarButton
        date={date}
        setDate={setDate}
        className={`${!taskName && 'opacity-0'}`}
      />

      <AddButton title='Create new task' onMouseDown={handleClick} />
    </div>
  );
};

export default CreateTask;
