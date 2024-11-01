import { useEffect } from 'react';
import SortableList from './sortable/SortableList';
import { useTaskStore } from '@/store/taskStore';
import { useListStore } from '@/store/listStore';
import { useNavigate, useParams } from 'react-router-dom';
import { TaskProps } from '@shared/task.interface';
import { useAlertDialogStore } from '@/store/dialogStore';
import SortableItem from './sortable/SortableItem';

const List = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const lists = useListStore((state) => state.lists);
  const { setTasks } = useTaskStore();
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

  return (
    <>
      {tasks.length > 0 ? (
        <SortableList
          onChange={setTasks}
          renderItem={(item) => <SortableItem task={item} />}
        />
      ) : (
        <div className=' mx-auto mt-60 pl-[340px]'>
          <h2 className='w-[640px] text-gray-500 text-lg text-center mx-auto'>
            This list is empty
          </h2>
        </div>
      )}
    </>
  );
};

export default List;
