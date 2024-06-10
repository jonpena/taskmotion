import CreateTask from '@/components/CreateTask';
import List from '@/components/List';
import ListCollection from '@/components/ListCollection';
import { UserAuth } from '@/context/AuthContext';

const Board = () => {
  const { signout } = UserAuth();

  return (
    <div>
      <CreateTask />
      <ListCollection />
      <List />
      <div className='absolute text-white top-2 right-3 z-[999] border border-gray-500 px-4 py-3 rounded-md bg-blue-400'>
        <button onClick={signout}>Signout</button>
      </div>
    </div>
  );
};

export default Board;
