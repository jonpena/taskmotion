import { ListProps } from '@/interfaces/list.interface';
import { requestDeleteList } from '@/services/requestDeleteList';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useListStore } from '@/store/listStore';
import { useTaskStore } from '@/store/taskStore';
import { ListLength } from '@/utils/ListLength';
import { ListLengthCompleted } from '@/utils/ListLengthCompleted';
import { useDebounce } from '@uidotdev/usehooks';
import { Disc3, Trash2 } from 'lucide-react';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
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
  const [hover, setHover] = useState(false);
  const [name, setName] = useState(list.name);
  const [isTyping, setIsTyping] = useState(false);
  const debouncedName = useDebounce(name, 500);
  const inputRef =
    useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  const [countTasks, setCountTasks] = useState({
    numerator: 0,
    denominator: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setName(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!inputRef || !inputRef.current) return;
    if (e.key === 'Enter') inputRef.current.blur();
  };

  const handleDeleteList = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    _listId: string
  ) => {
    if (e.detail === 1) {
      const filteredLists = lists.filter((l) => l.listId !== _listId);
      if (_listId === listId) navigate('/list/home');
      setLists(filteredLists);
      requestDeleteList(_listId);
    } else if (e.detail === 2) e.stopPropagation();
  };

  const handleRoute = (event: React.MouseEvent<HTMLInputElement>) => {
    const newlistId = event.currentTarget.getAttribute('id');
    navigate(`/list/${newlistId}`);
  };

  const handleDoubleClick = () => {
    inputRef.current?.focus();
    inputRef.current?.select();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    switch (event.detail) {
      case 1:
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
    setCountTasks({
      numerator: ListLength(list, tasks, listId),
      denominator: ListLengthCompleted(list, tasks, listId),
    });
  }, [lists]);

  return (
    <li
      id={list.listId}
      onClick={(e) => handleClick(e)}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      className={`mx-auto mt-1 cursor-pointer flex items-center justify-between px-4 text-gray-500 
    bg-gray-100 pl-2 w-80 h-12 rounded-xl hover:bg-gray-200 transition-colors duration-200 select-none
    ${listId === list.listId && 'bg-gray-200'}`}
    >
      <input
        ref={inputRef}
        title={name}
        type='text'
        className={`w-[265px] pointer-events-none whitespace-nowrap overflow-hidden text-ellipsis text-sm h-7 pl-2
          outline-none cursor-pointer rounded ${
            listId !== list.listId ? 'bg-inherit' : '[&:not(:focus)]:bg-inherit'
          } `}
        value={name}
        onClick={(e) => handleClick(e)}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <span
        onClick={(e) => handleDeleteList(e, list.listId)}
        title='Delete list'
        className='min-w-6 w-max h-8 flex justify-center items-center text-sm font-medium bg-white rounded-lg select-none'
      >
        {isTyping ? (
          <Disc3 className='text-gray-400 w-4 animate-spin' />
        ) : hover ? (
          <Trash2 className='text-red-400 w-4' />
        ) : (
          <span className='text-center inline-block align-middle text-xs text-gray-500'>
            {countTasks.numerator !== countTasks.denominator && (
              <span className='block border-b border-gray-500 w-full'>
                {countTasks.numerator}
              </span>
            )}
            <span className='block'>{countTasks.denominator}</span>
          </span>
        )}
      </span>
    </li>
  );
};

export default ListItem;
