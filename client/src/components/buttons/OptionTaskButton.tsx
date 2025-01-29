import { ArrowDownUp, Copy, EllipsisVertical } from 'lucide-react';
import { IconButton } from '../ui/icon-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useListStore } from '@/store/listStore';

export const OptionTaskButton = () => {
  const { lists } = useListStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          className='ml-1 cursor-pointer self-start'
          icon={<EllipsisVertical width={18} strokeWidth={1.5} />}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[180px]'>
        <DropdownMenuItem disabled>
          <Copy className='mr-2 h-4 w-4' />
          <span>Duplicate</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ArrowDownUp className='mr-2 h-4 w-4' />
            <span>Move to</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent
            className='max-h-[240px] overflow-y-auto dark:bg-background
          [scrollbar-width:thin] translate-x-1'
          >
            {lists.map((list) => (
              <DropdownMenuItem key={list.listId} disabled>
                <span className='truncate'>{list.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
