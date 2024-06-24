import { Trash } from 'lucide-react';
import { TaskProps } from '../interfaces/task.interface';
import { useTaskStore } from '@/store/taskStore';
import { useParams } from 'react-router-dom';
import { requestUpdateList } from '@/services/requestUpdateList';

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
    requestUpdateList(listId, { tasks: newTasks });
    setTasks(newTasks);
  };

  const handleChange = () => {
    if (!listId) return;
    const aux = [...tasks];
    const findTaskIndex = tasks.findIndex((elem) => elem.id === task.id);
    aux[findTaskIndex].checked = !task.checked;
    setTasks(aux);
    requestUpdateList(listId, { tasks: aux });
  };

  return (
    <div
      className='h-full overflow-x-hidden flex justify-between items-center 
      text-gray-500 my-2 cursor-pointer pointer-events-auto'
    >
      <input
        disabled={listId === 'home'}
        type='checkbox'
        defaultChecked={task.checked}
        onChange={handleChange}
        className='mr-2 border-gray-400'
      />
      <span
        title={task.name}
        className={`whitespace-nowrap overflow-hidden text-ellipsis ${
          task.checked && 'line-through'
        }`}
      >
        {task.name}
      </span>
      <Trash className='w-8 cursor-pointer' onClick={handleDelete} />
    </div>
  );
};

export default Task;
