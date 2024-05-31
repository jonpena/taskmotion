import { useListStore } from '@/store/listStore';

const ListCollection = () => {
  const lists = useListStore((state) => state.lists);

  return (
    <ul
      style={{ height: 'calc(100dvh - 88px)' }}
      className='w-[350px] z-50 mx-auto mt-2 ml-2 py-8 bg-white border border-gray-200
       shadow-md absolute rounded-md'
    >
      {lists.map((list) => (
        <li
          key={list.listId}
          className='mx-auto flex items-center justify-between px-4 text-gray-500 bg-gray-100 pl-2 w-80 h-12 rounded-xl'
        >
          <span className='text-sm'>{list.name}</span>
          <span className='text-sm font-medium bg-white px-2 py-1 rounded-lg'>
            {list.tasks.length}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ListCollection;
