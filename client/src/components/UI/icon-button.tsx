import { cn } from '@/lib/utils';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  className?: string;
  icon: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
};

export const IconButton = ({ icon, className, ...props }: IconButtonProps) => {
  return (
    <button
      className={cn(
        'group peer w-8 h-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-neutral-800 transition-all hover:bg-black/10 disabled:opacity-50 disabled:pointer-events-none touch-none cursor-default z-0 aspect-square',
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
};
