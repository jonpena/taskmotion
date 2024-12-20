import { useEffect } from 'react';
import SortableList from './dnd/SortableList';
import { useTaskStore } from '@/store/taskStore';
import { useListStore } from '@/store/listStore';
import { useNavigate, useParams } from 'react-router-dom';
import { TaskProps } from '@shared/task.interface';
import { useAlertDialogStore } from '@/store/dialogStore';

const CleanList = () => {
  return (
    <div className=' mx-auto mt-60 lg:pl-[340px]'>
      <h2 className='w-max text-gray-500 text-lg text-center mx-auto'>
        This list is empty
      </h2>
    </div>
  );
};

const List = () => {
  const { tasks, setTasks } = useTaskStore();
  const lists = useListStore((state) => state.lists);
  const { listId } = useParams();
  const { setTitle } = useAlertDialogStore();
  const navigate = useNavigate();

  useEffect(() => {
    let findTasks: TaskProps[] = [];
    if (listId === 'home') {
      setTitle('Home');
      lists.forEach((list) => {
        findTasks = findTasks.concat(list.tasks);
      });
    } else {
      const findList = lists.find((l) => l.listId === listId);
      if (lists.length !== 0 && !findList) navigate('/list/home');
      setTitle(findList?.name as string);
      findTasks = findList?.tasks || [];
    }

    setTasks(findTasks);
  }, [listId, lists]);

  return tasks.length > 0 ? <SortableList /> : <CleanList />;
};

export default List;
