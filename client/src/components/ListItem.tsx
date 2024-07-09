import { ListProps } from '@/interfaces/list.interface';
import { requestDeleteList } from '@/services/requestDeleteList';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useListStore } from '@/store/listStore';
import { useTaskStore } from '@/store/taskStore';
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
  const debouncedName = useDebounce(name, 400);
  const inputRef =
    useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const newlistId = event.currentTarget.getAttribute('id');
    navigate(`/list/${newlistId}`);
  };

  const handleDeleteList = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    _listId: string
  ) => {
    event.stopPropagation();
    const filteredLists = lists.filter((l) => l.listId !== _listId);
    if (_listId === listId) navigate('/list/home');
    setLists(filteredLists);
    requestDeleteList(_listId);
  };

  const listLength = (list: ListProps) =>
    list.listId === listId ? tasks.length : list.tasks.length;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setName(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!inputRef || !inputRef.current) return;
    if (e.key === 'Enter') inputRef.current.blur();
  };

  useEffect(() => {
    ``;
    if (!listId || listId !== list.listId || !isTyping) return;
    setIsTyping(false);
    requestUpdateList(listId, {
      name: debouncedName,
      tasks,
    });
  }, [debouncedName]);

  return (
    <li
      id={list.listId}
      onClick={handleClick}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`mx-auto mt-1 cursor-pointer flex items-center justify-between px-4 text-gray-500 
    bg-gray-100 pl-2 w-80 h-12 rounded-xl hover:bg-gray-200 transition-colors duration-200
    ${listId === list.listId && 'bg-gray-200'}`}
    >
      <input
        ref={inputRef}
        title={name}
        type='text'
        className={`w-[90%] whitespace-nowrap overflow-hidden text-ellipsis text-sm h-7 pl-2 outline-none cursor-pointer rounded ${
          listId !== list.listId
            ? 'bg-inherit  pointer-events-none'
            : '[&:not(:focus)]:bg-inherit'
        } `}
        value={name}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <span
        title='Delete list'
        className='min-w-6 w-max h-8 flex justify-center items-center text-sm font-medium bg-white rounded-lg'
      >
        {isTyping ? (
          <Disc3 className='text-gray-400 w-4 animate-spin' />
        ) : hover ? (
          <Trash2
            className='text-red-400 w-4'
            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
              handleDeleteList(e, list.listId)
            }
          />
        ) : (
          listLength(list)
        )}
      </span>
    </li>
  );
};

export default ListItem;
