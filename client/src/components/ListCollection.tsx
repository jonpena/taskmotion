import { useListStore } from '@/store/listStore';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ListItem from './ListItem';
import CreateList from './CreateList';
import { AlertDialogMessage } from './AlertDialogMessage';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { PanelRightIcon } from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const ListCollection = () => {
  const lists = useListStore((state) => state.lists);
  const navigate = useNavigate();
  const { listId } = useParams();
  const isSmallDevice = useMediaQuery('only screen and (max-width : 1023px)');
  const [open, setOpen] = useState(!isSmallDevice);
  const [animationParent] = useAutoAnimate();

  const handleClick = () => navigate(`/list/home`);

  useEffect(() => {
    setOpen(!isSmallDevice);
  }, [isSmallDevice]);

  return (
    <>
      <Button
        variant='outline'
        className={`w-10 h-10 fixed top-3 left-2 z-50 bg-white ${
          isSmallDevice ? 'inline-block' : 'hidden'
        }`}
        onClick={() => setOpen(!open)}
      >
        <PanelRightIcon
          size={26}
          absoluteStrokeWidth={true}
          strokeWidth={1.75}
          className='text-gray-500 dark:text-neutral-100 absolute top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2'
        />
      </Button>
      <div
        onClick={() => setOpen(false)}
        className={`
          lg:backdrop-blur-none
         ${open ? 'backdrop-blur-sm visible' : 'invisible'}
          absolute top-14 lg:top-15 z-30 lg:z-50 w-full lg:w-0 transition-all duration-300`}
      >
        <ul
          ref={animationParent}
          onClick={(e) => e.stopPropagation()}
          className={`w-3/4 md:w-[340px] h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-4.5rem)] overflow-y-auto  bg-background lg:ml-2 ml-0 rounded-md mt-2
             ${open ? 'left-0' : '-left-full md:-left-x-[348px]'}
            p-2 border transition-all duration-700 ease-cubic 
            `}
        >
          <li
            id='home'
            onClick={handleClick}
            className={`flex items-center justify-between px-2 text-gray-500 dark:text-neutral-50 
            bg-gray-100 dark:bg-neutral-900 w-full h-12 rounded-md hover:bg-gray-200 dark:hover:bg-white/15 select-none
             ${listId === 'home' && 'bg-gray-300 dark:bg-white/15'}`}
          >
            <span className='text-sm pl-2'>Home</span>
            <span className='text-xs font-medium flex justify-center items-center bg-white dark:bg-neutral-800 w-7 h-7 aspect-square rounded-lg'>
              {lists?.reduce((acc, list) => acc + list.tasks.length, 0)}
            </span>
          </li>

          {lists?.map((list) => (
            <ListItem list={list} key={list.listId} />
          ))}
          <CreateList />
        </ul>
      </div>
      <AlertDialogMessage />
    </>
  );
};

export default ListCollection;
