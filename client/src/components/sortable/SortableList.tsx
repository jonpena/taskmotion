import { useMemo, useState } from 'react';
import { ReactNode } from 'react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  Active,
  Over,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableOverlay } from './SortableOverlay';
import { DragHandle, SortableItem } from './SortableItem';
import { Virtuoso } from 'react-virtuoso';
import { TaskProps } from '@/interfaces/task.interface';
import { useParams } from 'react-router-dom';
import { fetcherUpdateList } from '@/services/fetcherUpdateList';

type Props<T extends TaskProps> = {
  items: T[];
  onChange(items: T[]): void;
  renderItem(item: T): ReactNode;
};

type handleDragEndProps = {
  active: Active;
  over: Over | null;
};

export function SortableList<T extends TaskProps>({
  items,
  onChange,
  renderItem,
}: Props<T>) {
  const [active, setActive] = useState<Active | null>(null);
  const { listId } = useParams();

  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = ({ active, over }: handleDragEndProps) => {
    if (!listId) return;
    if (over && active.id !== over.id) {
      const activeIndex = items.findIndex(({ id }) => id === active.id);
      const overIndex = items.findIndex(({ id }) => id === over.id);
      const newOrder = arrayMove(items, activeIndex, overIndex);
      onChange(newOrder);
      fetcherUpdateList(listId, { tasks: newOrder });
    }
    setActive(null);
  };

  return (
    <div className='w-full'>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={({ active }) => setActive(active)}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActive(null)}
      >
        <SortableContext items={items}>
          <Virtuoso
            className='!h-custom'
            totalCount={items.length}
            itemContent={(index: number) => (
              <div key={items[index].id}>{renderItem(items[index])}</div>
            )}
          />
        </SortableContext>
        <SortableOverlay>
          {activeItem ? renderItem(activeItem) : null}
        </SortableOverlay>
      </DndContext>
    </div>
  );
}

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;
