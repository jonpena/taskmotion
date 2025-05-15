import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { useTaskStore } from '../store/taskStore';
import { useParams } from 'react-router-dom';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useListStore } from '@/store/listStore';
import { replaceEmojis } from '@/utils/replaceEmojis';
import { SIZE_ID } from '@/constants/base';
import { useShortcut } from '@/hooks/useShortcut';
import { format } from 'date-fns';
import { CalendarButton } from './buttons/CalendarButton';
import { UserAuth } from '@/context/AuthContext';
import { createNotification } from '@/utils/createNotification';
import { useNotificationsStore } from '@/store/notificationsStore';
import { CreateInput } from './CreateInput';

const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const { tasks, setTasks } = useTaskStore();
  const { lists, setLists } = useListStore();
  const { listId } = useParams();
  const [checked, setChecked] = useState(false);
  const inputRef = useRef(null!) as React.RefObject<HTMLInputElement>;
  const keydown = useShortcut(['ctrl+e']);
  const [date, setDate] = useState<string | undefined>(undefined);
  const { email } = UserAuth().user;
  const notificationsStore = useNotificationsStore();

  const createTask = () => {
    // Create task
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

      createNotification(notificationsStore, email, {
        type: 'task',
        action: 'created',
        message: taskName,
      });
    }
  };

  const handleTaskCreation = () => {
    taskName ? createTask() : inputRef.current?.focus();
  };

  useEffect(() => {
    if (keydown === 'ctrl+e') inputRef.current?.focus();
  }, [keydown]);

  return (
    <CreateInput
      checked={checked}
      onCheck={setChecked}
      value={taskName}
      onChange={setTaskName}
      onSubmit={handleTaskCreation}
      inputRef={inputRef}
      placeholder='Create new task...'
      shortcutKey='e'
    >
      <CalendarButton
        date={date}
        setDate={setDate}
        // className={`opacity-0 group-focus-within:opacity-100 ${
        //   !taskName && 'opacity-0'
        // }`}
      />
    </CreateInput>

    // <div className='relative group flex items-center w-full bg-gray-100 dark:bg-neutral-900 rounded-md px-2'>
    //    <Checkbox
    //     name='checked'
    //     checked={checked}
    //     className='transition-all duration-1000'
    //     onChange={(e) => setChecked(e.target.checked)}
    //     onKeyDown={(e) => e.key === 'Enter' && setChecked(!checked)}
    //   />

    //   <Input
    //     type='text'
    //     maxLength={MAX_CONTENT_TASK}
    //     ref={inputRef}
    //     placeholder='Create new task...'
    //     className='text-neutral-600 dark:text-neutral-50 px-3 outline-none w-full h-12 border-none focus-visible:ring-0 focus-visible:placeholder:text-neutral-400 dark:focus-visible:placeholder:text-neutral-100 rounded-none shadow-none'
    //     onKeyDown={handleKeyPress}
    //     onChange={(e) => setTaskName(e.target.value.trimStart())}
    //     value={taskName}
    //   />

    //   {!isSmallDevice && (
    //     <ShortcutBadge keys='E' className={`${taskName && 'opacity-0'}`} />
    //   )} */}

    //   <AddButton
    //     title='Create new task'
    //     onMouseDown={handleClick}
    //     onKeyDown={handleKeyDown}
    //   />
    // </div>
  );
};

export default CreateTask;
