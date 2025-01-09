import { Trash2 } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

export const DeleteButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <button
      {...props}
      className={`group w-8 h-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-neutral-800 transition-all hover:bg-black/10 disabled:opacity-50 
        disabled:pointer-events-none touch-none cursor-default z-0 self-start`}
    >
      <Trash2 className='w-4 group-hover:text-red-400 select-none pointer-events-none' />
    </button>
  );
};
