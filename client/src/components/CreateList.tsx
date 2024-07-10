import { UserAuth } from '@/context/AuthContext';
import { ListProps } from '@/interfaces/list.interface';
import { requestCreateList } from '@/services/requestCreateList';
import { useListStore } from '@/store/listStore';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const CreateList = () => {
  const [listName, setListName] = useState('');
  const lists = useListStore((state) => state.lists);
  const { setLists } = useListStore();
  const { user } = UserAuth();

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
    <div className='flex w-full items-center gap-4 rounded-lg rounded-b-2xl px-3 transition-colors hover:bg-background'>
      <input
        type='text'
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder='Create new list...'
        className='w-1/2 border h-10 mx-2 pl-2'
      />
      <button>
        <Plus onClick={handleAddList} />
      </button>
    </div>
  );
};

export default CreateList;
