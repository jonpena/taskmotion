import { Strikethrough } from '@/components/ui/strikethrough';

type TaskNameDisplayProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  taskName: string;
  date: string;
  checked: boolean;
};

export const TaskNameDisplay = ({
  taskName,
  checked,
  date,
  ...props
}: TaskNameDisplayProps) => {
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      className={`cursor-text absolute pt-3.5 left-0 z-0 w-full h-full rounded-md flex items-start text-left 
    peer-focus:pointer-events-none peer-focus:opacity-0 peer-focus:!text-transparent`}
      {...props}
    >
      <span
        className={`pl-9 ml-8 truncate text-sm ${
          date && !checked ? 'w-[calc(100%-9.5rem)]' : 'w-[calc(100%-6.5rem)]'
        }`}
      >
        <Strikethrough checked={checked}>{taskName}</Strikethrough>
      </span>
    </button>
  );
};
