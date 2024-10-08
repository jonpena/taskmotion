import { CheckIcon } from 'lucide-react';
import { Tooltip } from '../Tooltip';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

// million-ignore
const Checkbox = ({ name, checked, onChange, disabled, className }: Props) => {
  return (
    <label className='flex w-fit h-fit'>
      <input
        name={name}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        type='checkbox'
        className={`peer pointer-events-none w-0 appearance-none`}
      />
      <Tooltip
        title={checked ? 'Press to uncheck' : 'Press to check'}
        disable={disabled}
      >
        <div
          className={
            `pointer-events-auto relative aspect-square bg-black/5 transition-colors hover:bg-black/10 peer-checked:bg-text w-5 h-5 rounded-lg peer-checked:[&>*]:animate-pop-up peer-checked:[&>*]:opacity-100 ${
              disabled && 'cursor-not-allowed'
            } ` + className
          }
        >
          <CheckIcon className='text-gray-700 absolute inset-0 m-auto w-[0.6rem] animate-none stroke-[6px] text-foreground opacity-0' />
        </div>
      </Tooltip>
    </label>
  );
};

export default Checkbox;
