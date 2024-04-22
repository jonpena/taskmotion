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
      <div className="absolute top-0 right-0 z-[999] border border-gray-500 px-4 py-3 rounded-md text-white hover:bg-blue-500">
        <button onClick={signout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Board;
