import { Plus } from 'lucide-react';
import { Tooltip } from '../Tooltip';
import { IconButton } from '../ui/icon-button';

type AddButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  title: string;
};

export const AddButton = ({ disabled, title, ...props }: AddButtonProps) => {
  return (
    <Tooltip title={title} disabled={disabled}>
      <IconButton
        data-testid='add-button'
        className='w-7 h-7'
        disabled={disabled}
        icon={
          <Plus className='w-4 h-4 text-neutral-600 dark:text-neutral-50 pointer-events-none group-focus-within:rotate-90 transition-transform duration-200' />
        }
        {...props}
      />
    </Tooltip>
  );
};
