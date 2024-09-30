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
  DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableOverlay } from './SortableOverlay';
import { SortableItem } from './SortableItem';
import { Virtuoso } from 'react-virtuoso';
import { TaskProps } from '@shared/task.interface';
import { useParams } from 'react-router-dom';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useDragStore } from '@/store/dragStore';

type handleDragEndProps = {
  active: Active;
  over: Over | null;
};

type Props<T extends TaskProps> = {
  items: T[];
  onChange(items: T[]): void;
  renderItem(item: T): ReactNode;
};

export const SortableList = <T extends TaskProps>({
  items,
  onChange,
  renderItem,
}: Props<T>) => {
  const { listId } = useParams();
  const [active, setActive] = useState<Active | null>(null);
  const { setIsDragging } = useDragStore();

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

  const handleDragStart = ({ active }: DragStartEvent) => {
    if (!listId) return;
    setActive(active);
    setIsDragging(true);
  };

  const handleDragEnd = ({ active, over }: handleDragEndProps) => {
    if (!listId) return;
    if (over && active.id !== over.id) {
      const activeIndex = items.findIndex(({ id }) => id === active.id);
      const overIndex = items.findIndex(({ id }) => id === over.id);
      const newOrder = arrayMove(items, activeIndex, overIndex);
      onChange(newOrder);
      requestUpdateList(listId, { tasks: newOrder });
    }
    setActive(null);
    setIsDragging(false);
  };

  return (
    <div className='w-full lg:pl-[340px] lg:mt-48 mt-4'>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActive(null)}
      >
        <SortableContext items={items}>
          <Virtuoso
            className='lg:!h-custom !h-customMobile'
            totalCount={items.length}
            itemContent={(index: number) => (
              <div className='py-[2px]' key={items[index].id}>
                {renderItem(items[index])}
              </div>
            )}
          />
        </SortableContext>
        <SortableOverlay>
          {activeItem ? renderItem(activeItem) : null}
        </SortableOverlay>
      </DndContext>
    </div>
  );
};

SortableList.Item = SortableItem;
