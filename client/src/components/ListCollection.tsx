import { useListStore } from '@/store/listStore';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ListItem from './ListItem';
import CreateList from './CreateList';

const ListCollection = () => {
  const lists = useListStore((state) => state.lists);
  const navigate = useNavigate();
  const { listId } = useParams();

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const newlistId = event.currentTarget.getAttribute('id');
    navigate(`/list/${newlistId}`);
  };

  return (
    <div
      className='w-[340px] z-50 mx-auto mt-2 ml-2 py-8 bg-white border border-gray-200
       shadow-md absolute rounded-md'
      style={{ height: 'calc(100dvh - 88px)' }}
    >
      <CreateList />

      <ul>
        <li
          id='home'
          onClick={handleClick}
          className={`mx-auto cursor-pointer flex items-center justify-between px-4 text-gray-500 
            bg-gray-100 pl-2 w-80 h-12 rounded-xl hover:bg-gray-200 select-none
             ${listId === 'home' && 'bg-gray-300'}`}
        >
          <span className='text-sm pl-2'>Home</span>
          <span className='text-xs font-medium flex justify-center items-center bg-white min-w-6 w-max h-8 rounded-lg'>
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
