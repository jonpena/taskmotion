import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListProps } from '@shared/types/list.types';
import { useAlertDialogStore } from '@/store/dialogStore';
import { useTaskStore } from '@/store/taskStore';
import { getTaskCount } from '@/utils/getTaskCount';
import { Trash2 } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { replaceEmojis } from '@/utils/replaceEmojis';
import { useDebounce } from '@uidotdev/usehooks';
import { UserAuth } from '@/context/AuthContext';
import { useUpdateNotifications } from '@/hooks/useNotification';
import { createNotification } from '@/utils/createNotification';
import { useDeleteList, useLists, useUpdateList } from '@/hooks/useLists';

type ListItemProps = {
  list: ListProps;
};

const ListItem = ({ list }: ListItemProps) => {
  const { listId } = useParams();
  const navigate = useNavigate();
  const { tasks } = useTaskStore();
  const inputRef = useRef(null!) as React.MutableRefObject<HTMLInputElement>;
  const [countTasks, setCountTasks] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const { setOpen, setHandleDelete, setListTitle } = useAlertDialogStore();
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  const [listName, setListName] = useState(list.name);
  const [previousName, setPreviousName] = useState(list.name);
  const listNameDebounced = useDebounce(listName, 200);
  const { email } = UserAuth().user;
  const updateNotifications = useUpdateNotifications();
  const { lists } = useLists();
  const updateList = useUpdateList();
  const deleteList = useDeleteList();

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
      updateList.mutate({
        listId,
        body: { name: formattedName, tasks },
      });
      setListName(formattedName);
      setPreviousName(formattedName);
      setListTitle(formattedName);
    } else setListName(previousName);
    setIsFocused(false);
  };

  const handleDeleteList = (e: React.MouseEvent, _listId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setHandleDelete(() => {
      if (!lists) return;
      if (_listId === listId) navigate('/u/dashboard');
      deleteList.mutate({ listId: _listId });

      const body = createNotification({
        type: 'list',
        action: 'deleted',
        message: list.name ?? 'none',
        id: _listId,
      });

      updateNotifications.mutate({ email, body });
    });
    setOpen(true);
  };

  const handleClick = () => {
    if (isFocused || list.listId === listId) return;
    setListTitle(listName as string);
    navigate(`/b/` + list.listId);
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
    setCountTasks(getTaskCount(list, tasks, listId));
  }, [list, listId, tasks]);

  useEffect(() => {
    if (listNameDebounced === list.name) return;
    setListTitle(listNameDebounced as string);
  }, [list.name, listNameDebounced, setListTitle]);

  return (
    <li
      tabIndex={0}
      onClick={handleClicks}
      onKeyDown={(e) => e.key === 'Enter' && handleClicks()}
      className={`relative w-full h-12 mx-auto mt-1 flex items-center justify-between text-neutral-500 dark:text-neutral-100
        bg-neutral-50 dark:bg-neutral-900 rounded-md hover:bg-black/10 dark:hover:bg-white/20 
        transition-colors duration-200 select-none group
        ${listId === list.listId && 'bg-neutral-300 dark:bg-white/15'}`}
    >
      <input
        ref={inputRef}
        type='text'
        className={`w-full pl-2 mx-2 h-8 truncate text-sm bg-neutral-100 dark:bg-neutral-800
          outline-none rounded
          ${isFocused ? 'opacity-100' : 'opacity-0'}
          `}
        value={listName}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        onBlur={handleBlur}
      />
      <div
        title={listName as string}
        className={`absolute top-0 z-0 w-full h-12 rounded-md flex items-center
            ${isFocused && 'pointer-events-none'}`}
      >
        <span
          className={`pl-4 w-[calc(100%-2.5rem)] truncate text-sm ${
            !isFocused ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {listName}
        </span>
      </div>
      <Tooltip title='Delete list'>
        <button
          onClick={(e) => handleDeleteList(e, list.listId as string)}
          className='z-0 mr-2 w-7 h-7 flex justify-center items-center 
        text-sm font-medium bg-white dark:bg-neutral-800 rounded-md select-none aspect-square'
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
        </button>
      </Tooltip>
    </li>
  );
};

export default ListItem;
