import { UserAuth } from '@/context/AuthContext';
import { ListProps } from '@shared/list.interface';
import { requestCreateList } from '@/services/requestCreateList';
import { useListStore } from '@/store/listStore';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Input } from './UI/input';

const CreateList = () => {
  const [name, setName] = useState('');
  const lists = useListStore((state) => state.lists);
  const { setLists } = useListStore();
  const { user } = UserAuth();

  const createList = () => {
    if (!name) return;
    const newlist: ListProps = {
      listId: uuid(),
      name,
      tasks: [],
    };
    const aux = [...lists, newlist];
    requestCreateList(user.email, newlist);
    setLists(aux);
    setName('');
  };

  const handleClick = () => createList();

  const handleKeyPress = (e: React.KeyboardEvent) =>
    e.key === 'Enter' && createList();

  return (
    <div className='mt-1 mx-auto flex w-full sticky bottom-0'>
      <Input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value.trimStart())}
        onKeyDown={handleKeyPress}
        placeholder='Create new list...'
        className='text-gray-600 h-12 pr-12 border-none bg-gray-100 hover:bg-gray-200 focus-visible:ring-0 focus-visible:bg-gray-200 focus-visible:placeholder:text-gray-400'
      />
      <button
        title='Create new list'
        className=' w-6 h-6 absolute right-2 top-3 flex justify-center items-center 
        text-sm font-medium bg-white rounded-lg select-none'
      >
        <Plus onClick={handleClick} className='w-4 h-4 text-gray-600' />
      </button>
    </div>
  );
};

export default CreateList;
