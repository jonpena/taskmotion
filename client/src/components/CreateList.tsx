import { UserAuth } from '@/context/AuthContext';
import { requestCreateList } from '@/services/requestCreateList';
import { useListStore } from '@/store/listStore';
import { Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Input } from './ui/input';
import { Tooltip } from './Tooltip';
import { replaceEmojis } from '@/utils/replaceEmojis';
import { useNavigate } from 'react-router-dom';

const CreateList = () => {
  const [listName, setListName] = useState('');
  const lists = useListStore((state) => state.lists);
  const { setLists } = useListStore();
  const { user } = UserAuth();
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();

  const createList = () => {
    if (!listName) return;
    const newlist = {
      listId: uuid(),
      name: replaceEmojis(listName),
      tasks: [],
    };
    const updateLists = [...lists, newlist];
    requestCreateList(user.email, newlist);
    setLists(updateLists);
    setListName('');
    navigate(`/list/` + newlist.listId);
    inputRef.current?.blur();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    listName ? createList() : inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) =>
    e.key === 'Enter' && createList();

  return (
    <div className='mt-1 w-full sticky bottom-0 group'>
      <Input
        ref={inputRef}
        type='text'
        value={listName}
        onChange={(e) => setListName(e.target.value.trimStart())}
        onKeyDown={handleKeyPress}
        placeholder='Create new list...'
        className='text-neutral-600 dark:text-neutral-50 h-12 pr-12 border-none bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 focus-visible:ring-0 focus-visible:bg-gray-200 focus-visible:placeholder:text-neutral-400 dark:focus-visible:placeholder:text-neutral-200'
      />
      <Tooltip title='Create new list'>
        <button
          onMouseDown={handleClick}
          className='w-7 h-7 absolute right-2 top-[10px] flex justify-center items-center 
          text-sm font-medium bg-white dark:bg-neutral-800 rounded-lg select-none'
        >
          <Plus className='w-4 h-4 text-neutral-600 dark:text-neutral-50 pointer-events-none group-focus-within:rotate-90 transition-transform duration-200' />
        </button>
      </Tooltip>
    </div>
  );
};

export default CreateList;
