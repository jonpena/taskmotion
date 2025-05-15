import { UserAuth } from '@/context/AuthContext';
import { requestCreateList } from '@/services/requestCreateList';
import { useListStore } from '@/store/listStore';
import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { replaceEmojis } from '@/utils/replaceEmojis';
import { useNavigate } from 'react-router-dom';
import { useShortcut } from '@/hooks/useShortcut';
import { SIZE_ID } from '@/constants/base';
import { createNotification } from '@/utils/createNotification';
import { useNotificationsStore } from '@/store/notificationsStore';
import { CreateInput } from './CreateInput';

const CreateList = () => {
  const [listName, setListName] = useState('');
  const inputRef = useRef(null!) as React.RefObject<HTMLInputElement>;
  const { email } = UserAuth().user;
  const keydown = useShortcut(['ctrl+l']);
  const navigate = useNavigate();
  const { lists, setLists } = useListStore();
  const notificationsStore = useNotificationsStore();

  const createList = () => {
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

      createNotification(notificationsStore, email, {
        type: 'list',
        action: 'created',
        message: listName,
      });
    }
  };

  const handleListCreation = () => {
    listName ? createList() : inputRef.current?.focus();
  };

  useEffect(() => {
    if (keydown === 'ctrl+l') inputRef.current?.focus();
  }, [keydown]);

  return (
    <CreateInput
      value={listName}
      onChange={setListName}
      onSubmit={handleListCreation}
      inputRef={inputRef}
      placeholder='Create new list...'
      shortcutKey='l'
      className='mt-1'
    />
  );
};

export default CreateList;
