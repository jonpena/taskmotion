import { createContext, useContext, useMemo } from 'react';
import type { CSSProperties, PropsWithChildren } from 'react';
import type { DraggableAttributes, UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { TASK_MAXWIDTH, TASK_MINWIDTH } from '@/constants/base';
import { GripVertical } from 'lucide-react';

type Props = {
  id: UniqueIdentifier;
};

type Context = {
  attributes: DraggableAttributes | object;
  listeners: SyntheticListenerMap | undefined;
  ref: (element: HTMLElement | null) => void;
  isDragging: boolean;
};

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
  isDragging: false,
});

export function SortableItem({ children, id }: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
      isDragging,
    }),
    [attributes, listeners, setActivatorNodeRef, isDragging]
  );
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
    <SortableItemContext.Provider value={context}>
      <li className={`SortableItem`} ref={setNodeRef} style={style}>
        {children}
      </li>
    </SortableItemContext.Provider>
  );
}

export function DragHandle() {
  const { attributes, listeners, ref, isDragging } =
    useContext(SortableItemContext);

  return (
    <button
      className={`DragHandle ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      {...attributes}
      {...listeners}
      ref={ref}
    >
      <GripVertical color='gray' width={20} strokeWidth={2} />
    </button>
  );
}
