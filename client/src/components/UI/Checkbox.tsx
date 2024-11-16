import { CheckIcon } from 'lucide-react';
import { Tooltip } from '../Tooltip';
import { InputHTMLAttributes } from 'react';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  classNameContainer?: string;
};

// million-ignore
const Checkbox = ({
  name,
  checked,
  disabled,
  className,
  classNameContainer,
  ...props
}: CheckboxProps) => {
  return (
    <label className={`flex w-fit h-fit` + ' ' + classNameContainer}>
      <input
        type='checkbox'
        name={name}
        className={`peer pointer-events-none w-0 appearance-none`}
        checked={checked}
        disabled={disabled}
        {...props}
      />
      <Tooltip
        title={checked ? 'Press to uncheck' : 'Press to check'}
        disable={disabled}
      >
        <div
          className={
            `pointer-events-auto relative aspect-square bg-black/5 hover:bg-black/10 dark:bg-neutral-800 dark:hover:bg-white/10  transition-colors peer-checked:bg-text rounded-lg peer-checked:[&>*]:animate-pop-up peer-checked:[&>*]:opacity-100 ${
              disabled && 'cursor-not-allowed'
            } ` + className
          }
        >
          <CheckIcon className='text-gray-700 dark:text-neutral-50 absolute inset-0 m-auto w-[0.6rem] animate-none stroke-[6px] text-foreground opacity-0' />
        </div>
      </Tooltip>
    </label>
  );
};

export default Checkbox;
