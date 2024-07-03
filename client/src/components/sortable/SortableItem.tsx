import type { CSSProperties, PropsWithChildren } from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TASK_MAXWIDTH, TASK_MINWIDTH } from '@/constants/base';
import { GripVertical } from 'lucide-react';
import { useParams } from 'react-router-dom';

type Props = {
  id: UniqueIdentifier;
};

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
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    maxWidth: `calc(clamp(${TASK_MINWIDTH}px, 100vw, ${TASK_MAXWIDTH}px))`,
    margin: '0 auto',
    paddingLeft: '10px',
    paddingRight: '10px',
    userSelect: 'none',
    transition,
    height: '48px',
    borderRadius: '8px',
  };

  return (
    // <SortableItemContext.Provider >
    <li className={`SortableItem`} ref={setNodeRef} style={style}>
      {children}
      <button
        disabled={listId === 'home'}
        className={`DragHandle ml-[2px] cursor-pointer disabled:cursor-default disabled:pointer-events-none`}
        {...attributes}
        {...listeners}
      >
        <GripVertical color='gray' width={20} strokeWidth={2} />
      </button>
    </li>
    // </SortableItemContext.Provider>
  );
}
