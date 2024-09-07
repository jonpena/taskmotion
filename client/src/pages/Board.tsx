import CreateTask from '@/components/CreateTask';
import ListCollection from '@/components/ListCollection';
import { UserNav } from '@/components/UserNav';
import { Outlet } from 'react-router-dom';

const Board = () => {
  return (
    <div>
      <CreateTask />
      <ListCollection />
      <Outlet />
      <nav className='absolute top-2 right-3 z-[999]'>
        <UserNav />
      </nav>
    </div>
  );
};

export default Board;
