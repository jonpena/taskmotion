import CreateTask from '@/components/CreateTask';
import ListCollection from '@/components/ListCollection';
import { UserNav } from '@/components/UserNav';
import UserWelcome from '@/components/UserWelcome';
import { Outlet } from 'react-router-dom';

const Board = () => {
  return (
    <div>
      <nav className='absolute top-4 right-2 z-[999]'>
        <UserNav />
      </nav>
      <main className='px-14 lg:px-0 w-full lg:pl-[340px] sticky top-2 lg:top-40'>
        <div className='max-w-[640px] min-w-48 lg:w-[640px] mx-auto flex flex-col lg:gap-y-5'>
          <UserWelcome />
          <CreateTask />
        </div>
      </main>
      <ListCollection />
      <Outlet />
    </div>
  );
};

export default Board;
