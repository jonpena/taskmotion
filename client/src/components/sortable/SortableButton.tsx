import { useDragStore } from '@/store/dragStore';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { GripVertical } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Tooltip } from '../Tooltip';

type sortableButtonProps = {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
};

const SortableButton = ({ attributes, listeners }: sortableButtonProps) => {
  const { listId } = useParams();
  const { isDragging: isDraggingStore } = useDragStore();

  return (
    <Tooltip title='Move task' disable={isDraggingStore}>
      <button
        style={{ cursor: isDraggingStore ? 'grabbing' : 'grab' }}
        disabled={listId === 'home'}
        className={`mt-2 flex flex-none items-center justify-center w-8 h-8 touch-none rounded-lg border-none outline-none appearance-none
      ml-1 disabled:cursor-default disabled:pointer-events-none bg-black/5 hover:bg-black/10 dark:bg-neutral-800 z-0`}
        {...attributes}
        {...listeners}
      >
        <GripVertical color='gray' width={20} strokeWidth={2} />
      </button>
    </Tooltip>
  );
};

export default SortableButton;
