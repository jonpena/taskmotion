import { MAX_CONTENT_TASK } from '@/constants/base';
import { RefObject, TextareaHTMLAttributes } from 'react';

type textareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  reference?: RefObject<HTMLTextAreaElement>;
};

export const Textarea = ({ className, reference, ...props }: textareaProps) => {
  return (
    <textarea
      ref={reference}
      rows={1}
      maxLength={MAX_CONTENT_TASK}
      className={`w-full h-full overflow-auto py-1 pl-1.5 mr-2 text-sm
      bg-neutral-100 dark:bg-neutral-800 resize-none
      outline-none rounded ${className}
      `}
      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
      {...props}
    />
  );
};
