import { UserAuth } from '@/context/AuthContext';
import { useAlertDialogStore } from '@/store/dialogStore';
import { getGreeting } from '@/utils/getGreeting';
import { useDocumentTitle } from '@uidotdev/usehooks';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

const UserWelcome = () => {
  const formatedDate = format(new Date(), 'EEEE, MMMM d');
  const { title } = useAlertDialogStore();
  const { listId } = useParams();
  const { user } = UserAuth();

  useDocumentTitle(
    'Taskmotion | ' + (listId !== 'home' ? title ?? 'Loading...' : 'Home')
  );

  return (
    <div className='hidden lg:block'>
      <h3 className='text-gray-400 dark:text-neutral-300 text-[17px]'>
        {getGreeting()} Today is {formatedDate}
      </h3>
      <h1
        className='text-gray-700 dark:text-neutral-200 text-[1.8rem] font-medium mt-0.5
        whitespace-nowrap overflow-hidden text-ellipsis
      '
      >
        {listId === 'home'
          ? `${user?.fullname ?? 'Loading...'}`
          : `${title ?? 'Loading...'}`}
      </h1>
    </div>
  );
};

export default UserWelcome;
