import { Trash2 } from 'lucide-react';
import { TaskProps } from '../interfaces/task.interface';
import { useTaskStore } from '@/store/taskStore';
import { useParams } from 'react-router-dom';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

type TaskComponentProps = {
  task: TaskProps;
};

const Task = ({ task }: TaskComponentProps) => {
  const { setTasks } = useTaskStore();
  const tasks = useTaskStore((state) => state.tasks);
  const { listId } = useParams();
  const [name, setName] = useState(task.name);
  const [checked, setChecked] = useState(task.checked);
  const debouncedName = useDebounce(name, 500);
  const debouncedChecked = useDebounce(checked, 500);

  const handleDelete = () => {
    if (!listId) return;
    const newTasks = tasks.filter((elem) => elem.id !== task.id);
    requestUpdateList(listId, { tasks: newTasks });
    setTasks(newTasks);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (!listId) return;
    const aux = [...tasks];
    const findTaskIndex = tasks.findIndex((elem) => elem.id === task.id);
    aux[findTaskIndex].name = name;
    aux[findTaskIndex].checked = checked;
    requestUpdateList(listId, { tasks: aux });
  }, [debouncedName, debouncedChecked]);

  return (
    <div
      className='w-full h-full overflow-x-hidden flex justify-between items-center 
      text-gray-500 my-2 cursor-pointer pointer-events-auto'
    >
      <input
        name='name'
        disabled={listId === 'home'}
        type='checkbox'
        checked={checked}
        onChange={handleChange}
        className='mr-2 cursor-pointer'
      />

      <input
        name='checked'
        title={name}
        type='text'
        disabled={listId === 'home'}
        className={`w-full whitespace-nowrap overflow-hidden text-ellipsis text-sm h-7 pl-2 outline-none cursor-pointer rounded  `}
        value={name}
        onChange={handleInputChange}
      />

      <Trash2 className='w-6 cursor-pointer' onClick={handleDelete} />
    </div>
  );
};

export default Task;
