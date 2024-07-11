import { CheckIcon } from 'lucide-react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

// million-ignore
const Checkbox = ({ name, checked, onChange, disabled, className }: Props) => {
  return (
    <label className='flex h-fit w-fit'>
      <input
        name={name}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        type='checkbox'
        className={`peer pointer-events-none w-0 appearance-none` + className}
      />
      <div className='pointer-events-auto relative aspect-square bg-black/5 transition-colors hover:bg-black/10 peer-checked:bg-text w-5 h-5 rounded-lg peer-checked:[&>*]:animate-pop-up peer-checked:[&>*]:opacity-100'>
        <CheckIcon className='absolute inset-0 m-auto w-[10px] animate-none stroke-[6px] text-foreground opacity-0' />
      </div>
    </label>
  );
};

export default Checkbox;
