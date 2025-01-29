import { useMemo, useState } from 'react';
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
import { Virtuoso } from 'react-virtuoso';
import { useParams } from 'react-router-dom';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useDragStore } from '@/store/dragStore';
import { useTaskStore } from '@/store/taskStore';
import SortableItem from './SortableItem';

type handleDragEndProps = {
  active: Active;
  over: Over | null;
};

const SortableList = () => {
  const { listId } = useParams();
  const [active, setActive] = useState<Active | null>(null);
  const { setIsDragging } = useDragStore();
  const { tasks, setTasks } = useTaskStore();

  const activeItem = useMemo(
    () => tasks.find((item) => item.id === active?.id),
    [active, tasks]
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
      const activeIndex = tasks.findIndex(({ id }) => id === active.id);
      const overIndex = tasks.findIndex(({ id }) => id === over.id);
      const newOrder = arrayMove(tasks, activeIndex, overIndex);
      setTasks(newOrder);
      requestUpdateList(listId, { tasks: newOrder });
    }
    setActive(null);
    setIsDragging(false);
  };

  return (
    <div className='w-full lg:pl-[340px] lg:mt-36 mt-4'>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActive(null)}
      >
        <SortableContext items={tasks}>
          <Virtuoso
            data={tasks}
            className='lg:!h-custom !h-customMobile'
            totalCount={tasks.length}
            itemContent={(index, item) => (
              <div
                key={item.id}
                className={`${!index && 'lg:pt-12'} ${
                  index + 1 === tasks.length && 'lg:pb-0.5'
                }`}
              >
                <SortableItem task={item} />
              </div>
            )}
          />
        </SortableContext>
        <SortableOverlay>
          {activeItem ? <SortableItem task={activeItem} /> : null}
        </SortableOverlay>
      </DndContext>
    </div>
  );
};

export default SortableList;
