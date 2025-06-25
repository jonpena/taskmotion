import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { useTaskStore } from '../store/taskStore';
import { useParams } from 'react-router-dom';
import { replaceEmojis } from '@/utils/replaceEmojis';
import { SIZE_ID } from '@/constants/base';
import { useShortcut } from '@/hooks/useShortcut';
import { format } from 'date-fns';
import { CalendarButton } from './buttons/CalendarButton';
import { UserAuth } from '@/context/AuthContext';
import { CreateInput } from './CreateInput';
import { useUpdateNotifications } from '@/hooks/useNotification';
import { createNotification } from '@/utils/createNotification';
import { useUpdateList } from '@/hooks/useLists';

const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const { tasks } = useTaskStore();
  const { listId } = useParams();
  const [checked, setChecked] = useState(false);
  const inputRef = useRef(null!) as React.RefObject<HTMLInputElement>;
  const keydown = useShortcut(['ctrl+e']);
  const [date, setDate] = useState<string | undefined>(undefined);
  const { email } = UserAuth().user;
  const updateNotifications = useUpdateNotifications();
  const updateList = useUpdateList();

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
      setDate(undefined);
      setChecked(false);
      setTaskName('');
      updateList.mutate({ listId, body: { listId, tasks: updateTasks } });

      const body = createNotification({
        type: 'task',
        action: 'created',
        message: taskName,
        id: newTask.id,
      });

      updateNotifications.mutate({ email, body });
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
      <CalendarButton date={date} setDate={setDate} />
    </CreateInput>
  );
};

export default CreateTask;
