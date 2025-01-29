import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  className?: string;
  icon: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          `group w-7 h-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-neutral-800 transition-all hover:bg-black/10 disabled:opacity-50 disabled:pointer-events-none touch-none cursor-default z-0 aspect-square`,
          className
        )}
        {...props}
      >
        {icon}
      </button>
    );
  }
);
