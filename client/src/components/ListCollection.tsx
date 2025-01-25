import { useListStore } from '@/store/listStore';
import { useNavigate, useParams } from 'react-router-dom';
import ListItem from './ListItem';
import CreateList from './CreateList';
import { AlertDialogMessage } from './AlertDialogMessage';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { LayoutDashboardIcon } from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { BurgerButton } from './buttons/BurgerButton';

const DashboardButton = () => {
  const { listId } = useParams();
  const navigate = useNavigate();

  const handleClick = () => navigate(`/u/dashboard`);

  return (
    <li
      id='dashboard'
      onClick={handleClick}
      className={`flex items-center gap-2 px-3 text-gray-700 dark:text-neutral-50 
    bg-gray-100 dark:bg-neutral-900 w-full h-12 rounded-md 
    hover:bg-gray-200 dark:hover:bg-white/15
    cursor-pointer select-none ${!listId && 'bg-gray-200 dark:bg-white/15'}`}
    >
      <LayoutDashboardIcon size={20} className='text-primary/70' />
      <span className='font-medium'>Dashboard</span>
    </li>
  );
};

export const ListCollection = () => {
  const lists = useListStore((state) => state.lists);
  const isSmallDevice = useMediaQuery('only screen and (max-width : 1023px)');
  const [open, setOpen] = useState(!isSmallDevice);
  const [animationParent] = useAutoAnimate();

  useEffect(() => {
    setOpen(!isSmallDevice);
  }, [isSmallDevice]);

  return (
    <>
      <BurgerButton onClick={() => setOpen(!open)} />
      <div
        onClick={() => setOpen(false)}
        className={`
          lg:backdrop-blur-none ${
            open ? 'backdrop-blur-sm visible' : 'invisible'
          }
          fixed top-0 pt-14 lg:top-15 z-[60] w-full lg:w-0 transition-all duration-300`}
      >
        <ul
          ref={animationParent}
          className={`w-3/4 md:w-[340px] h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-4.5rem)] overflow-y-auto 
            bg-background lg:ml-2 ml-0 rounded-md mt-2 ${
              open ? 'left-0' : '-left-full md:-left-x-[348px]'
            }
            p-2 border transition-all duration-700 ease-cubic 
            `}
          onClick={(e) => e.stopPropagation()}
        >
          <DashboardButton />
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
