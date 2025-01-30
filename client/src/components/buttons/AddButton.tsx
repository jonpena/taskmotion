import { Plus } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { Button } from '../ui/button';

type AddButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

export const AddButton = ({ title, ...props }: AddButtonProps) => {
  return (
    <Tooltip title={title}>
      <Button
        size={'icon'}
        data-testid='add-button'
        variant={'secondary'}
        {...props}
      >
        <Plus className='w-4 h-4 text-neutral-600 dark:text-neutral-50 pointer-events-none group-focus-within:rotate-90 transition-transform duration-200' />
      </Button>
    </Tooltip>
  );
};
