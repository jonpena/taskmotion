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

  // display: flex;
  // justify-content: space-between;
  // flex-grow: 1;
  // align-items: center;
  // padding: 5px 20px;
  // box-shadow: 0 0 0 calc(1px / var(--scale-x, 1)) rgba(63, 63, 68, 0.05),
  //   0 1px calc(3px / var(--scale-x, 1)) 0 rgba(34, 33, 81, 0.15);
  // box-sizing: border-box;
  // list-style: none;
  // color: #333;
  // font-weight: 400;
  // font-size: 1rem;

  return (
    <li
      className={`SortableItem bg-gray-200 flex justify-between items-center flex-grow list-none`}
      ref={setNodeRef}
      style={style}
    >
      {children}
      <button
        title='Move task'
        disabled={listId === 'home'}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        className={`DragHandle ml-[2px] cursor-pointer disabled:cursor-default disabled:pointer-events-none bg-black/5 hover:bg-black/10`}
        {...attributes}
        {...listeners}
      >
        <GripVertical color='gray' width={20} strokeWidth={2} />
      </button>
    </li>
  );
}
