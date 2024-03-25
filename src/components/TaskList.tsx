/* eslint-disable no-useless-escape */
import ReactDOM from "react-dom";
import { List, AutoSizer } from "react-virtualized-for-vite";
import { memo, CSSProperties, ReactInstance } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { TaskProps } from "../interfaces/task.interface";
import Task from "./Task";
import { useTaskStore } from "../store/taskStore";
import { DraggableProvided } from "react-beautiful-dnd";

export type itemListProps = {
  item: TaskProps;
  style: CSSStyleRule | undefined | CSSProperties;
  index: number;
  provided: DraggableProvided;
  isDragging: boolean;
};

const ItemList = memo(
  ({ item, style, index, provided, isDragging }: itemListProps) => {
    let transform = provided.draggableProps.style?.transform;

    if (transform) {
      transform = transform.replace(/\(.+\,/, "(0,");
    }

    const styleExtended = {
      ...style,
      ...provided.draggableProps.style,
      userSelect: "none",
      "pointer-events": "none",
      cursor: "default",
      display: "flex",
      justifyContent: "center",
      transform: transform ? transform : "translateX(0px)",
    };

    return (
      <div
        data-index={index}
        data-testid={item.id}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        data-is-dragging={isDragging}
        style={styleExtended as CSSProperties}
      >
        <Task task={item} />
      </div>
    );
  }
);

const rowRenderer =
  (items: TaskProps[]) =>
  ({ index, style }: { index: number; style: CSSStyleRule }) => {
    const item = items[index];

    if (!item) return null;

    return (
      <Draggable
        index={index}
        key={item.id}
        draggableId={item.id}
        disableInteractiveElementBlocking
      >
        {(provided, snapshot) => {
          return (
            <ItemList
              provided={provided}
              item={item}
              style={{ ...style }}
              isDragging={snapshot.isDragging}
              index={0}
            />
          );
        }}
      </Draggable>
    );
  };

const TaskList = memo(() => {
  const items = useTaskStore((state) => state.tasks);

  return (
    <div className="flex flex-1 height-custom overflow-hidden">
      <Droppable
        mode="virtual"
        direction="vertical"
        droppableId={"TASK_LIST"}
        renderClone={(provided, snapshot, rubric) => (
          <ItemList
            provided={provided}
            isDragging={snapshot.isDragging}
            item={items[rubric.source.index]}
            style={{}}
            index={0}
          />
        )}
      >
        {(droppableProvided, snapshot) => {
          const itemCount = snapshot.isUsingPlaceholder
            ? items.length + 1
            : items.length;

          return (
            <AutoSizer>
              {({ height, width }: { height: string; width: string }) => (
                <List
                  width={width}
                  height={height}
                  rowHeight={50}
                  rowCount={itemCount}
                  ref={(ref: ReactInstance | null | undefined) => {
                    if (ref) {
                      const whatHasMyLifeComeTo = ReactDOM.findDOMNode(ref);
                      if (whatHasMyLifeComeTo instanceof window.HTMLElement) {
                        droppableProvided.innerRef(whatHasMyLifeComeTo);
                      }
                    }
                  }}
                  rowRenderer={rowRenderer(items)}
                />
              )}
            </AutoSizer>
          );
        }}
      </Droppable>
    </div>
  );
});

export default TaskList;
