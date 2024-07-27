import CreateTask from '@/components/CreateTask';
// import List from '@/components/List';
import ListCollection from '@/components/ListCollection';
import { UserAuth } from '@/context/AuthContext';
import { Outlet } from 'react-router-dom';

const Board = () => {
  const { signout } = UserAuth();

  return (
    <div>
      <CreateTask />
      <ListCollection />
      <Outlet />
      <div className='absolute text-white top-2 right-3 z-[999] border border-gray-500 px-3 py-2 rounded-md bg-indigo-500'>
        <button onClick={signout}>Signout</button>
      </div>
    </div>
  );
};

export default Board;
