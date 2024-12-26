import { Plus } from 'lucide-react';
import { Tooltip } from '../Tooltip';

type AddButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  title: string;
};

export const AddButton = ({ disabled, title, ...props }: AddButtonProps) => {
  return (
    <Tooltip title={title} disabled={disabled}>
      <button
        data-testid='add-button'
        disabled={disabled}
        className='bg-white dark:bg-neutral-800 w-7 h-7 
        right-2 top-3 flex justify-center items-center text-sm font-medium flex-grow-1 rounded-lg select-none aspect-square'
        {...props}
      >
        <Plus className='w-4 h-4 text-neutral-600 dark:text-neutral-50 pointer-events-none group-focus-within:rotate-90 transition-transform duration-200' />
      </button>
    </Tooltip>
  );
};
