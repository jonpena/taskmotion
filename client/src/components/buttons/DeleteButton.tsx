import { Trash2 } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';
import { IconButton } from '../ui/icon-button';

export const DeleteButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <IconButton
      className='self-start'
      icon={
        <Trash2 className='w-4 group-hover:text-red-400 select-none pointer-events-none' />
      }
      {...props}
    />
  );
};
