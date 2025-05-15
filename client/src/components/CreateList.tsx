import { UserAuth } from '@/context/AuthContext';
import { createList } from '@/services/listService';
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

  const handleCreateList = () => {
    if (listName) {
      const newlist = {
        listId: nanoid(SIZE_ID),
        name: replaceEmojis(listName),
        tasks: [],
      };
      const updateLists = [...lists, newlist];
      createList(email, newlist);
      setLists(updateLists);
      setListName('');
      navigate(`/b/${newlist.listId}`);
      inputRef.current?.blur();

      createNotification(notificationsStore, email, {
        type: 'list',
        action: 'created',
        message: listName,
        id: newlist.listId,
      });
    }
  };

  const handleForm = () => {
    listName ? handleCreateList() : inputRef.current?.focus();
  };

  useEffect(() => {
    if (keydown === 'ctrl+l') inputRef.current?.focus();
  }, [keydown]);

  return (
    <CreateInput
      value={listName}
      onChange={setListName}
      onSubmit={handleForm}
      inputRef={inputRef}
      placeholder='Create new list...'
      shortcutKey='l'
      className='mt-1'
    />
  );
};

export default CreateList;
