import { UserAuth } from '@/context/AuthContext';
import { requestCreateList } from '@/services/requestCreateList';
import { useListStore } from '@/store/listStore';
import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { Input } from './ui/input';
import { replaceEmojis } from '@/utils/replaceEmojis';
import { useNavigate } from 'react-router-dom';
import { useShortcut } from '@/hooks/useShortcut';
import { useMediaQuery } from '@uidotdev/usehooks';
import { AddButton } from './buttons/AddButton';
import { ShortcutBadge } from './buttons/ShortcutBadge';
import { SIZE_ID } from '@/constants/base';
import { createNotification } from '@/utils/createNotification';
import { useNotificationsStore } from '@/store/notificationsStore';

const CreateList = () => {
  const [listName, setListName] = useState('');
  const inputRef = useRef(null!) as React.RefObject<HTMLInputElement>;
  const { email } = UserAuth().user;
  const keydown = useShortcut(['Control+l']);
  const isSmallDevice = useMediaQuery('only screen and (max-width : 1023px)');
  const navigate = useNavigate();
  const { lists, setLists } = useListStore();
  const notificationsStore = useNotificationsStore();

  const createList = () => {
    // Create list
    if (listName) {
      const newlist = {
        listId: nanoid(SIZE_ID),
        name: replaceEmojis(listName),
        tasks: [],
      };
      const updateLists = [...lists, newlist];
      requestCreateList(email, newlist);
      setLists(updateLists);
      setListName('');
      navigate(`/b/${newlist.listId}`);
      inputRef.current?.blur();

      // Create notification
      createNotification(notificationsStore, email, {
        type: 'list',
        action: 'created',
        message: listName,
      });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    listName ? createList() : inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      listName ? createList() : inputRef.current?.focus();
    }
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
        <ShortcutBadge keys='L' className={`${listName && 'opacity-0'}`} />
      )}

      <AddButton
        title='Create new list'
        onMouseDown={handleClick}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default CreateList;
