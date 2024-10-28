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
  const [animationParent] = useAutoAnimate({ duration: 200 });

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
          strokeWidth={2}
          className='text-gray-500 dark:text-neutral-100 absolute top-1/2 left-1/2
          -translate-x-1/2  -translate-y-1/2'
        />
      </Button>
      <div
        className={`absolute top-12 lg:top-15 z-50 bg-background lg:ml-2 ml-0 rounded-md mt-4 
   w-3/4 md:w-[340px] h-[calc(100dvh-4.5rem)] overflow-y-auto p-2 border transition-transform duration-700
   ease-cubic
   ${open ? 'translate-x-0' : '-translate-x-full md:-translate-x-[348px]'}`}
      >
        <ul ref={animationParent}>
          <li
            id='home'
            onClick={handleClick}
            className={`flex items-center justify-between px-2 text-gray-500 dark:text-neutral-50 
            bg-gray-100 dark:bg-neutral-900 w-full h-12 rounded-md hover:bg-gray-200 dark:hover:bg-white/15 select-none
             ${listId === 'home' && 'bg-gray-300 dark:bg-white/15'}`}
          >
            <span className='text-sm pl-2'>Home</span>
            <span className='text-xs font-medium flex justify-center items-center bg-white dark:bg-neutral-800 min-w-6 w-max h-8 rounded-lg'>
              {lists && lists.reduce((acc, list) => acc + list.tasks.length, 0)}
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
