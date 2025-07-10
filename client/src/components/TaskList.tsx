import { useEffect } from 'react';
import SortableList from './dnd/SortableList';
import { useTaskStore } from '@/store/taskStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlertDialogStore } from '@/store/dialogStore';
import { useLists } from '@/hooks/useLists';

const EmptyList = () => {
  return (
    <div className=' mx-auto mt-60 lg:pl-[340px]'>
      <h2 className='w-max text-gray-500 text-lg text-center mx-auto'>This list is empty</h2>
    </div>
  );
};

export const TaskList = () => {
  const { tasks, setTasks } = useTaskStore();
  const { lists } = useLists();
  const { listId } = useParams();
  const { setListTitle } = useAlertDialogStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lists) return;
    const findList = lists.find((l) => l.listId === listId);
    if (!findList && lists.length !== 0) navigate('/u/dashboard');
    setListTitle(findList?.name ?? '');
    setTasks(findList?.tasks || []);
  }, [listId, lists, navigate, setListTitle, setTasks]);

  return tasks.length > 0 ? <SortableList /> : <EmptyList />;
};
