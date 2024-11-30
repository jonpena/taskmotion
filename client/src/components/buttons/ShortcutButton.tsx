import { Command, Plus } from 'lucide-react';

type ShortcutButtonProps = {
  keys: string;
  className: string;
};

const ShortcutButton = ({ keys, className }: ShortcutButtonProps) => {
  return (
    <code
      className={
        `absolute right-11 flex items-center gap-x-[2px]
            text-neutral-600 dark:text-neutral-50 rounded-md bg-white dark:bg-neutral-800 h-7 px-[0.3rem] text-xs
        group-focus-within:opacity-0 group-focus-within:scale-100 transition-opacity duration-200 pointer-events-none ` +
        className
      }
    >
      <Command className='w-3 h-auto ' />
      <Plus className='w-3 h-auto ' />
      <span className='font-mono'>{keys}</span>
    </code>
  );
};

export default ShortcutButton;
