import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useTaskStore } from '../store/taskStore';
import { useParams } from 'react-router-dom';
import { requestUpdateList } from '@/services/requestUpdateList';

const CreateTask = () => {
  const [inputData, setInputData] = useState('');
  const { setTasks } = useTaskStore();
  const tasks = useTaskStore((state) => state.tasks);
  const { listId } = useParams();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!listId) return;

    if (e.key === 'Enter' && (e.target as HTMLInputElement).value !== '') {
      setInputData('');
      const newTasks = {
        id: uuid(),
        name: (e.target as HTMLInputElement).value,
        checked: false,
      };
      const aux = [...tasks, newTasks];
      requestUpdateList(listId, { tasks: aux });
      setTasks(aux);
    }
  };

  return (
    <div className='sticky w-full h-16 bg-red-400 flex items-center justify-center z-[999]'>
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
