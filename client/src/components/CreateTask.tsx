import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useTaskStore } from '../store/taskStore';
import { useParams } from 'react-router-dom';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useListStore } from '@/store/listStore';

const CreateTask = () => {
  const [inputData, setInputData] = useState('');
  const { setTasks } = useTaskStore();
  const tasks = useTaskStore((state) => state.tasks);
  const { setLists } = useListStore();
  const lists = useListStore((state) => state.lists);
  const { listId } = useParams();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!listId) return;

    if (e.key === 'Enter' && (e.target as HTMLInputElement).value !== '') {
      setInputData('');
      const newTask = {
        id: uuid(),
        name: (e.target as HTMLInputElement).value,
        checked: false,
      };
      const newTasksArray = [...tasks, newTask];
      requestUpdateList(listId, { tasks: newTasksArray });
      const updateLists = [...lists];
      const index = lists.findIndex((l) => l.listId === listId);
      updateLists[index].tasks = newTasksArray;
      setTasks(newTasksArray);
      setLists([...updateLists]);
    }
  };

  return (
    <div className='sticky w-max mx-auto h-16 flex items-center justify-center z-[999]'>
      <input
        type='text'
        placeholder='Create new task'
        className='z-20 border-none py-2 rounded pl-2 outline-none bg-white w-full max-w-xs'
        onKeyDown={handleKeyPress}
        onChange={(e) => setInputData(e.target.value)}
        value={inputData}
      />
    </div>
  );
};

export default CreateTask;
