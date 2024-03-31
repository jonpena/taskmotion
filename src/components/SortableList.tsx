import { useMemo, useState } from "react";
import { ReactNode } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Active, Over, UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { SortableOverlay } from "./SortableOverlay";
import { DragHandle, SortableItem } from "./SortableItem";
import { Virtuoso } from "react-virtuoso";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { TASK_MAXWIDTH, TASK_MINWIDTH } from "@/constants/base";

type BaseItem = {
  id: UniqueIdentifier;
};

type Props<T extends BaseItem> = {
  items: T[];
  onChange(items: T[]): void;
  renderItem(item: T): ReactNode;
};

type handleDragEndProps = {
  active: Active;
  over: Over | null;
};

export function SortableList<T extends BaseItem>({
  items,
  onChange,
  renderItem,
}: Props<T>) {
  const [active, setActive] = useState<Active | null>(null);

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
    if (over && active.id !== over.id) {
      const activeIndex = items.findIndex(({ id }) => id === active.id);
      const overIndex = items.findIndex(({ id }) => id === over.id);
      onChange(arrayMove(items, activeIndex, overIndex));
    }
    setActive(null);
  };

  return (
    <div
      style={{
        width: `calc(clamp(${TASK_MINWIDTH}px, 100vw, ${TASK_MAXWIDTH}px))`,
      }}
      className="m-auto"
    >
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={({ active }) => setActive(active)}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActive(null)}
      >
        <SortableContext items={items}>
          <Virtuoso
            className="!h-[calc(100vh)]"
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
