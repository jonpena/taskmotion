import { LayoutDashboardIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export const DashboardButton = () => {
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
