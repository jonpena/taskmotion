import { type CSSProperties, type PropsWithChildren } from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TASK_MAXWIDTH, TASK_MINWIDTH } from '@/constants/base';
import { GripVertical } from 'lucide-react';
import { useParams } from 'react-router-dom';

type Props = {
  id: UniqueIdentifier;
};

// million-ignore
export function SortableItem({ children, id }: PropsWithChildren<Props>) {
  const { listId } = useParams();

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    maxWidth: `calc(clamp(${TASK_MINWIDTH}px, 100vw, ${TASK_MAXWIDTH}px))`,
    margin: '0 auto',
    paddingLeft: '10px',
    paddingRight: '10px',
    userSelect: 'none',
    transition,
    height: '48px',
    borderRadius: '8px',
    opacity: isDragging ? 0 : 1,
  };

  return (
    <li
      className={`bg-gray-100 flex justify-between items-center flex-grow list-none`}
      ref={setNodeRef}
      style={style}
    >
      {children}
      <button
        title='Move task'
        disabled={listId === 'home'}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        className={`flex flex-none items-center justify-center w-8 h-8 touch-none rounded border-none outline-none appearance-none
          ml-[2px] disabled:cursor-default disabled:pointer-events-none bg-black/5 hover:bg-black/10`}
        {...attributes}
        {...listeners}
      >
        <GripVertical color='gray' width={20} strokeWidth={2} />
      </button>
    </li>
  );
}
