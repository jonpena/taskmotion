import { Tooltip } from '@/components/Tooltip';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';

interface IAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
}

export const IAButton = ({ isLoading, ...props }: IAButtonProps) => {
  return (
    <Tooltip title='Generate with AI'>
      <Button
        size='icon'
        variant='ghost'
        className='absolute right-1.5 top-1.5 text-muted-foreground hover:text-primary transition-colors duration-200'
        {...props}
      >
        {isLoading ? (
          <Loader2 className='h-4 w-4 animate-spin-slow text-primary' />
        ) : (
          <Sparkles className='h-4 w-4' />
        )}
      </Button>
    </Tooltip>
  );
};
