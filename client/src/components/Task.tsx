import { Trash } from 'lucide-react';
import { TaskProps } from '../interfaces/task.interface';
import { useTaskStore } from '@/store/taskStore';
import { useParams } from 'react-router-dom';
import { fetcherUpdateList } from '@/services/fetcherUpdateList';

type TaskComponentProps = {
  task: TaskProps;
};

const Task = ({ task }: TaskComponentProps) => {
  const { setTasks } = useTaskStore();
  const tasks = useTaskStore((state) => state.tasks);
  const { listId } = useParams();

  const handleDelete = () => {
    if (!listId) return;

    const newTasks = tasks.filter((elem) => elem.id !== task.id);

    fetcherUpdateList(listId, { tasks: newTasks });

    setTasks(newTasks);
  };

  return (
    <div
      className='h-full overflow-x-hidden flex justify-between items-center 
      text-gray-500 my-2 cursor-pointer pointer-events-auto border-2 border-red-500'
    >
      <input
        type='checkbox'
        // checked={task.checked}
        className='mr-2 border-gray-400'
      />
      <span
        title={task.name}
        className=' whitespace-nowrap overflow-hidden text-ellipsis'
      >
        {task.name}
      </span>
      <Trash className='w-8 cursor-pointer' onClick={handleDelete} />
    </div>
  );
};

export default Task;
