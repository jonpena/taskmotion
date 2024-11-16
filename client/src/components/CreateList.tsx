import { UserAuth } from '@/context/AuthContext';
import { requestCreateList } from '@/services/requestCreateList';
import { useListStore } from '@/store/listStore';
import { Command, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Input } from './ui/input';
import { Tooltip } from './Tooltip';
import { replaceEmojis } from '@/utils/replaceEmojis';
import { useNavigate } from 'react-router-dom';
import { useShortcut } from '@/hooks/useShortcut';
import { useMediaQuery } from '@uidotdev/usehooks';

const CreateList = () => {
  const [listName, setListName] = useState('');
  const lists = useListStore((state) => state.lists);
  const { setLists } = useListStore();
  const { user } = UserAuth();
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();
  const keydown = useShortcut(['Control+l']);
  const isSmallDevice = useMediaQuery('only screen and (max-width : 1023px)');

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

  const handleClick = () => {
    listName ? createList() : inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) =>
    e.key === 'Enter' && createList();

  useEffect(() => {
    if (keydown === 'Control+l') inputRef.current?.focus();
  }, [keydown]);

  return (
    <div className='mt-1 w-full sticky bottom-0 flex items-center group bg-gray-100 dark:bg-neutral-900 rounded-md px-2'>
      <Input
        ref={inputRef}
        type='text'
        value={listName}
        onChange={(e) => setListName(e.target.value.trimStart())}
        onKeyDown={handleKeyPress}
        placeholder='Create new list...'
        className='text-neutral-600 dark:text-neutral-50 pl-2 h-12 border-none bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 focus-visible:ring-0 focus-visible:bg-gray-200 focus-visible:placeholder:text-neutral-400 dark:focus-visible:placeholder:text-neutral-200'
      />

      {!isSmallDevice && (
        <code
          className={`absolute right-12 flex gap-x-[2px] rounded-md bg-white dark:bg-neutral-800 p-[0.3rem] text-xs font-mono text-neutral-600 dark:text-neutral-50
          group-focus-within:opacity-0 transition-opacity duration-200 pointer-events-none
          ${listName && 'opacity-0'}`}
        >
          <Command className='w-3 h-auto ' />
          <Plus className='w-3 h-auto ' />
          <span>L</span>
        </code>
      )}
      <Tooltip title='Create new list'>
        <button
          onMouseDown={handleClick}
          className='bg-white dark:bg-neutral-800 w-7 h-7 right-2 top-3 flex justify-center items-center 
        text-sm font-medium flex-grow-1 rounded-lg select-none aspect-square'
        >
          <Plus className='w-4 h-4 text-neutral-600 dark:text-neutral-50 pointer-events-none group-focus-within:rotate-90 transition-transform duration-200' />
        </button>
      </Tooltip>
    </div>
  );
};

export default CreateList;
