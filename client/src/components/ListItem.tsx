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
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [countTasks, setCountTasks] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const { setOpen, setHandleDelete, setTitle } = useAlertDialogStore();
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  const [name, setName] = useState(list.name);
  const [previousName, setPreviousName] = useState(list.name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trimStart());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!inputRef?.current || list.listId !== listId) return;
    if (e.key === 'Enter') inputRef?.current.blur();
  };

  const handleBlur = () => {
    if (listId && name && name !== previousName) {
      requestUpdateList(listId, { name, tasks });
      setPreviousName(name);
    } else setName(previousName);
    setIsFocused(false);
  };

  const handleDeleteList = (_listId: string) => {
    setHandleDelete(() => {
      const filterListCollection = lists.filter((l) => l.listId !== _listId);
      if (_listId === listId) navigate('/list/home');
      setLists(filterListCollection);
      requestDeleteList(_listId);
    });
    setOpen(true);
  };

  const handleClick = () => {
    if (isFocused || list.listId === listId) return;
    setTitle(name as string);
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

  const handleClicks = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      handleDoubleClick();
    } else {
      handleClick();
      setClickTimeout(
        setTimeout(() => {
          setClickTimeout(null);
        }, 200)
      );
    }
  };

  useEffect(() => {
    setCountTasks(ListLength(list, tasks, listId));
  }, [lists]);

  return (
    <li
      title={name}
      onClick={handleClicks}
      className={`relative w-full h-12 mx-auto mt-1 flex items-center justify-between px-2 text-gray-500 
        bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 select-none group
        ${listId === list.listId && 'bg-gray-200'}`}
    >
      <input
        ref={inputRef}
        type='text'
        className={`w-full pl-2 mr-2 h-7 whitespace-nowrap overflow-hidden text-ellipsis text-sm
          outline-none rounded
          ${isFocused ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
        value={name}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        onBlur={handleBlur}
      />
      <span
        className={` pl-2 w-[calc(100%-3rem)] absolute whitespace-nowrap overflow-hidden text-ellipsis text-sm ${
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
