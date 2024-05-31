import CreateTask from '@/components/CreateTask';
import List from '@/components/List';
import ListCollection from '@/components/ListCollection';
import { UserAuth } from '@/context/AuthContext';
import { fetcherUserLists } from '@/services/fetcherUserLists';
import { useListStore } from '@/store/listStore';
import { useEffect } from 'react';

const Board = () => {
  const { signout, user } = UserAuth();
  const { setLists } = useListStore();

  useEffect(() => {
    fetcherUserLists(user.email).then((lists) => {
      if (lists) setLists(lists);
    });
  }, [user]);

  return (
    <div>
      <CreateTask />
      <ListCollection />
      <List />
      <div className='absolute top-0 right-0 z-[999] border border-gray-500 px-4 py-3 rounded-md bg-blue-400'>
        <button onClick={signout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Board;
