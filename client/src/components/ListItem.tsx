import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListProps } from '@shared/list.interface';
import { requestDeleteList } from '@/services/requestDeleteList';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useAlertDialogStore } from '@/store/dialogStore';
import { useListStore } from '@/store/listStore';
import { useTaskStore } from '@/store/taskStore';
import { listLength } from '@/utils/listLength';
import { Trash2 } from 'lucide-react';
import { Tooltip } from '@/components/Tooltip';
import { replaceEmojis } from '@/utils/replaceEmojis';
import { useDebounce } from '@uidotdev/usehooks';

type ListItemProps = {
  list: ListProps;
};

const ListItem = ({ list }: ListItemProps) => {
  const { listId } = useParams();
  const navigate = useNavigate();
  const { tasks } = useTaskStore();
  const { lists, setLists } = useListStore();
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [countTasks, setCountTasks] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const { setOpen, setHandleDelete, setTitle } = useAlertDialogStore();
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  const [listName, setListName] = useState(list.name);
  const [previousName, setPreviousName] = useState(list.name);
  const listNameDebounced = useDebounce(listName, 200);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value.trimStart());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!inputRef?.current || list.listId !== listId) return;
    if (e.key === 'Enter') inputRef?.current.blur();
  };

  const handleBlur = () => {
    if (listId && listName && listName !== previousName) {
      const formattedName = replaceEmojis(listName);
      requestUpdateList(listId, { name: formattedName, tasks });
      setListName(formattedName);
      setPreviousName(formattedName);
      setTitle(formattedName);
    } else setListName(previousName);
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
    setTitle(listName as string);
    navigate(`/list/` + list.listId);
  };

  const handleDoubleClick = () => {
    if (isFocused) return;
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(-1, -1);
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
    setCountTasks(listLength(list, tasks, listId));
  }, [list, tasks]);

  useEffect(() => {
    if (listNameDebounced === list.name) return;
    setTitle(listNameDebounced as string);
  }, [listNameDebounced]);

  return (
    <li
      onClick={handleClicks}
      className={`relative w-full h-12 mx-auto mt-1 flex items-center justify-between text-neutral-500 dark:text-neutral-100
        bg-gray-100 dark:bg-neutral-900 rounded-md hover:bg-gray-200 dark:hover:bg-white/20 
        transition-colors duration-200 select-none group
        ${listId === list.listId && 'bg-gray-200 dark:bg-white/15'}`}
    >
      <input
        ref={inputRef}
        type='text'
        className={`w-full pl-2 mx-2 h-8 whitespace-nowrap overflow-hidden text-ellipsis text-sm bg-neutral-100 dark:bg-neutral-800
          outline-none rounded
          ${isFocused ? 'opacity-100' : 'opacity-0'}
          `}
        value={listName}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        onBlur={handleBlur}
      />
      <Tooltip title={listName as string}>
        <div
          className={`absolute top-0 z-0 w-full h-12 rounded-md flex items-center
            ${isFocused && 'pointer-events-none'}`}
        >
          <span
            className={`pl-4 w-[calc(100%-2.5rem)] whitespace-nowrap overflow-hidden text-ellipsis text-sm ${
              !isFocused ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {listName}
          </span>
        </div>
      </Tooltip>
      <Tooltip title='Delete list'>
        <span
          onClick={() => handleDeleteList(list.listId as string)}
          className='z-0 mr-2 w-7 h-7 flex justify-center items-center 
        text-sm font-medium bg-white dark:bg-neutral-800 rounded-lg select-none aspect-square'
        >
          <Trash2
            data-testid='delete-icon'
            className='text-red-400 w-4 group-hover:inline-block hidden'
          />
          <span
            data-testid='task-count'
            className='text-center inline-block group-hover:hidden align-middle text-xs text-neutral-500 dark:text-neutral-100'
          >
            <span className='w-full'>{countTasks}</span>
          </span>
        </span>
      </Tooltip>
    </li>
  );
};

export default ListItem;
