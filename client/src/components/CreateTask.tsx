import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { useTaskStore } from '../store/taskStore';
import { useParams } from 'react-router-dom';
import { updateList } from '@/services/listService';
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
      updateList(listId, { tasks: updateTasks });
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
        id: newTask.id,
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
      <CalendarButton date={date} setDate={setDate} />
    </CreateInput>
  );
};

export default CreateTask;
