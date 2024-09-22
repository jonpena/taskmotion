import { UserAuth } from '@/context/AuthContext';
import { useAlertDialogStore } from '@/store/alertDialogStore';
import { getGreeting } from '@/utils/getGreeting';
import { useDocumentTitle } from '@uidotdev/usehooks';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

const UserWelcome = () => {
  const { user } = UserAuth();
  const formatedDate = format(new Date(), 'EEEE, MMMM d');
  const { title } = useAlertDialogStore();
  const { listId } = useParams();

  useDocumentTitle('Taskmotion | ' + (listId !== 'home' ? title : 'Home'));

  return (
    <div className='hidden lg:block'>
      <h3 className='text-gray-400'>{formatedDate}</h3>
      <h1 className='text-gray-700 text-2xl mt-1'>
        {listId === 'home' ? `${getGreeting()}, ${user.fullname}` : title}
      </h1>
    </div>
  );
};

export default UserWelcome;
