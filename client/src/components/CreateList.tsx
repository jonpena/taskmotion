import { UserAuth } from '@/context/AuthContext';
import { requestCreateList } from '@/services/requestCreateList';
import { useListStore } from '@/store/listStore';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Input } from './ui/input';
import { replaceEmojis } from '@/utils/replaceEmojis';
import { useNavigate } from 'react-router-dom';
import { useShortcut } from '@/hooks/useShortcut';
import { useMediaQuery } from '@uidotdev/usehooks';
import { AddButton } from './buttons/AddButton';
import { ShortcutButton } from './buttons/ShortcutButton';

const CreateList = () => {
  const [listName, setListName] = useState('');
  const lists = useListStore((state) => state.lists);
  const { setLists } = useListStore();
  const { user } = UserAuth();
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const keydown = useShortcut(['Control+l']);
  const isSmallDevice = useMediaQuery('only screen and (max-width : 1023px)');
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

  useEffect(() => {
    if (keydown === 'Control+l') inputRef.current?.focus();
  }, [keydown]);

  return (
    <div
      className='mt-1 w-full sticky bottom-0 flex items-center group bg-gray-100 
    dark:bg-neutral-900 rounded-md px-2'
    >
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
        <ShortcutButton keys='L' className={`${listName && 'opacity-0'}`} />
      )}

      <AddButton title='Create new list' onMouseDown={handleClick} />
    </div>
  );
};

export default CreateList;
