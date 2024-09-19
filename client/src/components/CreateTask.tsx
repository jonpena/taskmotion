import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useTaskStore } from '../store/taskStore';
import { useParams } from 'react-router-dom';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useListStore } from '@/store/listStore';
import { Input } from '@/components/UI/input';
import Checkbox from '@/components/UI/checkbox';
import { Plus } from 'lucide-react';

const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const { setTasks } = useTaskStore();
  const tasks = useTaskStore((state) => state.tasks);
  const { setLists } = useListStore();
  const lists = useListStore((state) => state.lists);
  const { listId } = useParams();
  const [checked, setChecked] = useState(false);

  const createTask = (name: string) => {
    if (!listId || !name) return;

    const newTask = {
      id: uuid(),
      name,
      checked,
    };
    const newTasksArray = [newTask, ...tasks];
    requestUpdateList(listId, { tasks: newTasksArray });
    const updateLists = [...lists];
    const index = lists.findIndex((l) => l.listId === listId);
    updateLists[index].tasks = newTasksArray;
    setTaskName('');
    setTasks(newTasksArray);
    setLists([...updateLists]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      createTask(taskName);
    }
  };

  const handleClick = () => createTask(taskName);

  return (
    <div className='flex items-center w-full bg-gray-100 rounded px-2'>
      <Checkbox
        disabled={listId === 'home'}
        name='checked'
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className=''
      />
      <Input
        disabled={listId === 'home'}
        type='text'
        placeholder='Create new task...'
        className='text-gray-600 px-3 outline-none w-full h-12 border-none focus-visible:ring-0 focus-visible:placeholder:text-gray-400'
        onKeyDown={handleKeyPress}
        onChange={(e) => setTaskName(e.target.value.trimStart())}
        value={taskName}
      />

      <button
        title='Create new task'
        onClick={handleClick}
        className=' w-8 h-7 right-2 top-3 flex justify-center items-center 
        text-sm font-medium flex-grow-1 rounded-lg select-none bg-white'
      >
        <Plus className='w-4 h-4 text-gray-600 pointer-events-none' />
      </button>
    </div>
  );
};

export default CreateTask;
