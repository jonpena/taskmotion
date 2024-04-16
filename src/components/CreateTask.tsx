import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useTaskStore } from '../store/taskStore';

const CreateTask = () => {
  const [inputData, setInputData] = useState('');

  const { addTask } = useTaskStore();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.target as HTMLInputElement).value !== '') {
      setInputData('');

      addTask({
        id: uuid().slice(0, 18),
        name: (e.target as HTMLInputElement).value,
        status: false,
      });
    }
  };

  return (
    <div className="sticky w-full h-16 bg-red-400 flex items-center justify-center z-[999]">
      <input
        type="text"
        placeholder="Create new task"
        className="z-20 border-none py-2 rounded pl-2 outline-none bg-white w-full max-w-xs"
        onKeyDown={handleKeyPress}
        onChange={(e) => setInputData(e.target.value)}
        value={inputData}
      />
    </div>
  );
};

export default CreateTask;
