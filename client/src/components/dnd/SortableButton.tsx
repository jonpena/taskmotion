import { useDragStore } from '@/store/dragStore';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { GripVertical } from 'lucide-react';
import { IconButton } from '../ui/icon-button';

type sortableButtonProps = {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
};

const SortableButton = ({ attributes, listeners }: sortableButtonProps) => {
  const { isDragging: isDraggingStore } = useDragStore();

  return (
    <IconButton
      className='self-start bg-neutral-100 dark:bg-neutral-900'
      style={{ cursor: isDraggingStore ? 'grabbing' : 'grab' }}
      {...attributes}
      {...listeners}
      icon={
        <GripVertical
          className='text-neutral-500 dark:text-neutral-300 group-hover:brightness-75'
          width={18}
          strokeWidth={1.5}
        />
      }
    />
  );
};

export default SortableButton;
