import { UserAuth } from '@/context/AuthContext';
import { getGreeting } from '@/utils/getGreeting';
import { format } from 'date-fns';

const UserWelcome = () => {
  const { user } = UserAuth();
  const formatedDate = format(new Date(), 'EEEE, MMMM d');

  return (
    <div className='hidden lg:block'>
      <h3 className='text-gray-400'>{formatedDate}</h3>
      <h1 className='text-gray-700 text-2xl mt-1'>
        {getGreeting()}, {user.fullname}
      </h1>
    </div>
  );
};

export default UserWelcome;
