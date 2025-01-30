import { useDragStore } from '@/store/dragStore';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { GripVertical } from 'lucide-react';
import { Button } from '../ui/button';

type sortableButtonProps = {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
};

const SortableButton = ({ attributes, listeners }: sortableButtonProps) => {
  const { isDragging: isDraggingStore } = useDragStore();

  return (
    <Button
      size={'icon'}
      className='self-start'
      style={{ cursor: isDraggingStore ? 'grabbing' : 'grab' }}
      {...attributes}
      {...listeners}
    >
      <GripVertical
        className='text-neutral-500 dark:text-neutral-300 group-hover:brightness-75'
        width={18}
        strokeWidth={1.5}
      />
    </Button>
  );
};

export default SortableButton;
