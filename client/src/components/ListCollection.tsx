import { useListStore } from '@/store/listStore';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ListItem from './ListItem';
import CreateList from './CreateList';
import { AlertDialogMessage } from './AlertDialogMessage';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/UI/popover';
import { Button } from '@/components/UI/button';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { LayoutPanelLeft } from 'lucide-react';

const ListCollection = () => {
  const lists = useListStore((state) => state.lists);
  const navigate = useNavigate();
  const { listId } = useParams();
  const isSmallDevice = useMediaQuery('only screen and (max-width : 1023px)');
  const [openPopover, setOpenPopover] = useState(!isSmallDevice);

  const handleClick = () => {
    navigate(`/list/home`);
  };

  useEffect(() => {
    setOpenPopover(!isSmallDevice ? true : false);
  }, [isSmallDevice]);

  return (
    <Popover open={openPopover}>
      <PopoverTrigger asChild>
        <Button
          className={`w-10 h-10 fixed top-3 left-2 z-50 bg-white ${
            isSmallDevice ? 'inline-block' : 'hidden'
          }`}
          variant='outline'
          onClick={() => {
            setOpenPopover(!openPopover);
          }}
        >
          <LayoutPanelLeft
            size={26}
            absoluteStrokeWidth={true}
            strokeWidth={2}
            className='text-gray-500 absolute top-1/2 left-1/2 
          -translate-x-1/2  -translate-y-1/2'
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-screen md:w-[320px] h-[100dvh] lg:mt-[62px] lg:ml-2 mt-2 p-2'>
        <ul>
          <li
            id='home'
            onClick={handleClick}
            className={`flex items-center justify-between px-2 text-gray-500 
            bg-gray-100 w-full h-12 rounded-md hover:bg-gray-200 select-none
             ${listId === 'home' && 'bg-gray-300'}`}
          >
            <span className='text-sm pl-2'>Home</span>
            <span className='text-xs font-medium flex justify-center items-center bg-white min-w-6 w-max h-8 rounded-lg'>
              {lists && lists.reduce((acc, list) => acc + list.tasks.length, 0)}
            </span>
          </li>

          {lists &&
            lists.map((list) => <ListItem list={list} key={list.listId} />)}
        </ul>
        <CreateList />

        <AlertDialogMessage />
      </PopoverContent>
    </Popover>
  );
};

export default ListCollection;
