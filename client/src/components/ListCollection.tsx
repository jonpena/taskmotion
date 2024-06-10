import { useListStore } from '@/store/listStore';
import { useTaskStore } from '@/store/taskStore';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ListCollection = () => {
  const lists = useListStore((state) => state.lists);
  const { setLists } = useListStore();
  const tasks = useTaskStore((state) => state.tasks);
  const navigate = useNavigate();
  const { listId } = useParams();

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const newlistId = event.currentTarget.getAttribute('id');

    if (newlistId === listId) return;

    const aux = [...lists];

    const index = aux.findIndex((list) => list.listId === listId);

    aux[index].tasks = tasks;

    setLists(aux);

    navigate(`/list/${newlistId}`);
  };

  return (
    <ul
      style={{ height: 'calc(100dvh - 88px)' }}
      className='w-[350px] z-50 mx-auto mt-2 ml-2 py-8 bg-white border border-gray-200
       shadow-md absolute rounded-md'
    >
      {lists.map((list) => (
        <li
          id={list.listId}
          key={list.listId}
          onClick={handleClick}
          className={`mx-auto cursor-pointer flex items-center justify-between px-4 text-gray-500 bg-gray-100 pl-2 w-80 h-12 rounded-xl ${
            listId === list.listId && 'bg-gray-300'
          }`}
        >
          <span className='text-sm'>{list.name}</span>
          <span className='text-sm font-medium bg-white px-2 py-1 rounded-lg'>
            {list.listId === listId ? tasks.length : list.tasks.length}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ListCollection;
