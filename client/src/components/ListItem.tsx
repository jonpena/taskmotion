import { ListProps } from '@shared/list.interface';
import { requestDeleteList } from '@/services/requestDeleteList';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useAlertDialogStore } from '@/store/alertDialogStore';
import { useListStore } from '@/store/listStore';
import { useTaskStore } from '@/store/taskStore';
import { ListLength } from '@/utils/ListLength';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type ListItemProps = {
  list: ListProps;
};

const ListItem = ({ list }: ListItemProps) => {
  const { listId } = useParams();
  const navigate = useNavigate();
  const tasks = useTaskStore((state) => state.tasks);
  const lists = useListStore((state) => state.lists);
  const { setLists } = useListStore();
  const inputRef =
    useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
  const [countTasks, setCountTasks] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const { setOpen, setHandleDelete, setTitle } = useAlertDialogStore();
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  const [name, setName] = useState(list.name);
  const [lastName, setLastName] = useState(list.name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trimStart());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!inputRef?.current || list.listId !== listId) return;
    if (e.key === 'Enter') {
      inputRef?.current.blur();
    }
  };

  const handleBlur = () => {
    if (listId && name && name !== lastName) {
      requestUpdateList(listId, { name, tasks });
      setLastName(name);
    } else setName(lastName);
    setIsFocused(false);
  };

  const handleDeleteList = (_listId: string) => {
    setHandleDelete(() => {
      const filterListCollection = lists.filter((l) => l.listId !== _listId);
      if (_listId === listId) navigate('/list/home');
      setLists(filterListCollection);
      requestDeleteList(_listId);
    });
    setTitle(name as string);
    setOpen(true);
  };

  const handleRoute = () => {
    if (isFocused || list.listId === listId) return;
    navigate(`/list/${list.listId}`);
  };

  const handleDoubleClick = () => {
    if (isFocused) return;
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(
      inputRef.current?.value.length,
      inputRef.current?.value.length
    );
    setIsFocused(true);
  };

  useEffect(() => {
    setCountTasks(ListLength(list, tasks, listId));
  }, [lists]);

  const handleClicks = () => {
    console.log('handle click');

    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      console.log('click');
      handleDoubleClick();
    } else {
      console.log('double click');
      handleRoute();
      setClickTimeout(
        setTimeout(() => {
          setClickTimeout(null);
        }, 200)
      );
    }
  };

  return (
    <li
      title={name}
      onClick={handleClicks}
      className={`w-full h-12 mx-auto mt-1 flex items-center justify-between px-2 text-gray-500 
        bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 select-none group
        ${listId === list.listId && 'bg-gray-200'}`}
    >
      <input
        ref={inputRef}
        type='text'
        className={`w-[255px] h-7 whitespace-nowrap overflow-hidden text-ellipsis text-sm pl-2
          outline-none rounded
          ${isFocused ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
        value={name}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        onBlur={handleBlur}
      />
      <span
        className={`w-[255px] absolute whitespace-nowrap overflow-hidden text-ellipsis text-sm pl-2 ${
          !isFocused ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {name}
      </span>
      <span
        onClick={() => handleDeleteList(list.listId as string)}
        title='Delete list'
        className='min-w-6 w-max h-8 flex justify-center items-center 
        text-sm font-medium bg-white rounded-lg select-none cursor-pointer'
      >
        <Trash2 className='text-red-400 w-4 group-hover:inline-block hidden' />
        <span className='text-center inline-block group-hover:hidden align-middle text-xs text-gray-500'>
          <span className='w-full'>{countTasks}</span>
        </span>
      </span>
    </li>
  );
};

export default ListItem;
