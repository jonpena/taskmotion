import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useTaskStore } from '../store/taskStore';
import { useParams } from 'react-router-dom';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useListStore } from '@/store/listStore';
import { Input } from '@/components/UI/input';
import Checkbox from '@/components/UI/checkbox';

const CreateTask = () => {
  const [inputData, setInputData] = useState('');
  const { setTasks } = useTaskStore();
  const tasks = useTaskStore((state) => state.tasks);
  const { setLists } = useListStore();
  const lists = useListStore((state) => state.lists);
  const { listId } = useParams();
  const [checked, setChecked] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!listId) return;

    if (e.key === 'Enter' && (e.target as HTMLInputElement).value !== '') {
      setInputData('');
      const newTask = {
        id: uuid(),
        name: (e.target as HTMLInputElement).value,
        checked,
      };
      const newTasksArray = [newTask, ...tasks];
      requestUpdateList(listId, { tasks: newTasksArray });
      const updateLists = [...lists];
      const index = lists.findIndex((l) => l.listId === listId);
      updateLists[index].tasks = newTasksArray;
      setTasks(newTasksArray);
      setLists([...updateLists]);
    }
  };

  return (
    <div className='mx-auto flex max-w-80 sticky top-2'>
      <Input
        disabled={listId === 'home'}
        type='text'
        placeholder='Create new task...'
        className='sticky z-20 rounded pl-4 outline-none w-full h-12 pr-12 border-none bg-gray-100 hover:bg-gray-200 focus-visible:ring-0 focus-visible:bg-gray-200 focus-visible:placeholder:text-gray-400'
        onKeyDown={handleKeyPress}
        onChange={(e) => setInputData(e.target.value)}
        value={inputData}
      />
      <Checkbox
        disabled={listId === 'home'}
        name='checked'
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className='top-4 right-8 z-30'
      />
    </div>
  );
};

export default CreateTask;
