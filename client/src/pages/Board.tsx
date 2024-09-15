import CreateTask from '@/components/CreateTask';
import ListCollection from '@/components/ListCollection';
import { UserNav } from '@/components/UserNav';
import { Outlet } from 'react-router-dom';

const Board = () => {
  return (
    <div>
      <CreateTask />
      <nav className='absolute top-4 right-2 z-[999]'>
        <UserNav />
      </nav>
      <ListCollection />
      <Outlet />
    </div>
  );
};

export default Board;
