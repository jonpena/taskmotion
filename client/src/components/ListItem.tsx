import { ListProps } from '@shared/list.interface';
import { requestDeleteList } from '@/services/requestDeleteList';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useAlertDialogStore } from '@/store/alertDialogStore';
import { useListStore } from '@/store/listStore';
import { useTaskStore } from '@/store/taskStore';
import { ListLength } from '@/utils/ListLength';
import { useDebounce } from '@uidotdev/usehooks';
import { Disc3, Trash2 } from 'lucide-react';
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
  const [name, setName] = useState(list.name);
  const [isTyping, setIsTyping] = useState(false);
  const debouncedName = useDebounce(name, 500);
  const inputRef =
    useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
  const [countTasks, setCountTasks] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const { setOpen, setHandleDelete, setTitle } = useAlertDialogStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setName(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!inputRef || !inputRef.current) return;
    if (e.key === 'Enter') inputRef.current.blur();
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

  const handleRoute = (event: React.MouseEvent<HTMLInputElement>) => {
    const newlistId = event.currentTarget.getAttribute('id');
    navigate(`/list/${newlistId}`);
    inputRef.current?.blur();
  };

  const handleDoubleClick = () => {
    inputRef.current?.focus();
    if (!isFocused) {
      inputRef.current?.setSelectionRange(
        inputRef.current?.value.length,
        inputRef.current?.value.length
      );
    }
    setIsFocused(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    switch (event.detail) {
      case 1:
        if (!isFocused)
          handleRoute(event as unknown as React.MouseEvent<HTMLInputElement>);
        return;
      case 2:
        handleDoubleClick();
        return;
    }
  };

  useEffect(() => {
    if (!listId || listId !== list.listId || !isTyping) return;
    requestUpdateList(listId, {
      name: debouncedName,
      tasks,
    });
    setIsTyping(false);
  }, [debouncedName]);

  useEffect(() => {
    if (!listId) return;
    setCountTasks(ListLength(list, tasks, listId));
  }, [lists]);

  return (
    <li
      id={list.listId}
      onClick={(e) => handleClick(e)}
      title={name}
      className={`w-80 h-12 mx-auto mt-1 cursor-pointer flex items-center justify-between px-4 text-gray-500 
    bg-gray-100 pl-2 rounded-md hover:bg-gray-200 transition-colors duration-200 select-none group
    ${listId === list.listId && 'bg-gray-200'}`}
    >
      <input
        ref={inputRef}
        type='text'
        className={`w-[265px] h-7 whitespace-nowrap overflow-hidden text-ellipsis text-sm pl-2
          outline-none cursor-pointer rounded ${
            listId !== list.listId ? 'bg-inherit' : '[&:not(:focus)]:bg-inherit'
          } 
          ${!isFocused && 'pointer-events-none'}
          `}
        value={name}
        onClick={(e) => handleClick(e)}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        onBlur={() => setIsFocused(false)}
      />
      <span
        onClick={() => handleDeleteList(list.listId as string)}
        title='Delete list'
        className='min-w-6 w-max h-8 flex justify-center items-center 
        text-sm font-medium bg-white rounded-lg select-none'
      >
        {(isTyping && <Disc3 className='text-gray-700 w-4 animate-spin' />) || (
          <>
            <Trash2 className='text-red-400 w-4 group-hover:inline-block hidden' />
            <span className='text-center inline-block group-hover:hidden align-middle text-xs text-gray-500'>
              <span className='w-full'>{countTasks}</span>
            </span>
          </>
        )}
      </span>
    </li>
  );
};

export default ListItem;
