import { Strikethrough } from '@/components/ui/strikethrough';

type TaskNameDisplayProps = {
  taskName: string;
  date: string;
  checked: boolean;
};

export const TaskNameDisplay = ({
  taskName,
  checked,
  date,
}: TaskNameDisplayProps) => {
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      className={`absolute pt-1.5 left-0 z-0 w-full h-8 rounded-md flex items-start text-left 
    pointer-events-none peer-focus:opacity-0 peer-focus:!text-transparent`}
    >
      <span
        className={`pl-9 ml-1.5 truncate text-sm ${
          date && !checked ? 'w-[calc(100%-8.5rem)]' : 'w-[calc(100%-6rem)]'
        }`}
      >
        <Strikethrough checked={checked}>{taskName}</Strikethrough>
      </span>
    </button>
  );
};
