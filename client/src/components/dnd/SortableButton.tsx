import { useDragStore } from '@/store/dragStore';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { GripVertical } from 'lucide-react';

type sortableButtonProps = {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
};

const SortableButton = ({ attributes, listeners }: sortableButtonProps) => {
  const { isDragging: isDraggingStore } = useDragStore();

  return (
    <button
      style={{ cursor: isDraggingStore ? 'grabbing' : 'grab' }}
      className={`w-8 h-8 flex flex-none items-center justify-center touch-none rounded-lg border-none outline-none appearance-none ml-1 disabled:opacity-50 disabled:cursor-default disabled:pointer-events-none bg-black/5
    hover:bg-black/10 dark:bg-neutral-800 z-0 self-start`}
      {...attributes}
      {...listeners}
    >
      <GripVertical
        className='text-neutral-500 dark:text-neutral-300'
        width={20}
        strokeWidth={2}
      />
    </button>
  );
};

export default SortableButton;
