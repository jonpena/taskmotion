import { UserAuth } from '@/context/AuthContext';
import { ListProps } from '@/interfaces/list.interface';
import { requestCreateList } from '@/services/requestCreateList';
import { useListStore } from '@/store/listStore';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import ListItem from './ListItem';

const ListCollection = () => {
  const lists = useListStore((state) => state.lists);
  const { setLists } = useListStore();
  const navigate = useNavigate();
  const { listId } = useParams();
  const [listName, setListName] = useState('');
  const { user } = UserAuth();

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const newlistId = event.currentTarget.getAttribute('id');
    navigate(`/list/${newlistId}`);
  };

  const handleAddList = () => {
    if (listName === '') return;

    const newlist: ListProps = {
      listId: uuid(),
      name: listName,
      tasks: [],
    };
    const aux = [...lists, newlist];
    setLists(aux);
    requestCreateList(user.email, newlist);
  };

  return (
    <div
      className='w-[340px] z-50 mx-auto mt-2 ml-2 py-8 bg-white border border-gray-200
       shadow-md absolute rounded-md'
      style={{ height: 'calc(100dvh - 88px)' }}
    >
      <div className='flex justify-start items-center px-4 py-2'>
        <input
          type='text'
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder='Search...'
          className='w-1/2 border h-10 mx-2 pl-2'
        />
        <button>
          <Plus onClick={handleAddList} />
        </button>
      </div>

      <ul>
        <li
          id='home'
          onClick={handleClick}
          className={`mx-auto cursor-pointer flex items-center justify-between px-4 text-gray-500 
            bg-gray-100 pl-2 w-80 h-12 rounded-xl hover:bg-gray-200
             ${listId === 'home' && 'bg-gray-300'}`}
        >
          <span className='text-sm pl-2'>Todas las listas de tareas</span>
          <span className='text-sm font-medium flex justify-center items-center bg-white min-w-6 w-max h-8 rounded-lg'>
            {lists && lists.reduce((acc, list) => acc + list.tasks.length, 0)}
          </span>
        </li>

        {lists &&
          lists.map((list) => <ListItem list={list} key={list.listId} />)}
      </ul>
    </div>
  );
};

export default ListCollection;
