/* eslint-disable no-useless-escape */
import ReactDOM from "react-dom";
import { List, AutoSizer } from "react-virtualized-for-vite";
import { memo, CSSProperties, ReactInstance } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { TaskProps } from "../interfaces/task.interface";
import Task from "./Task";
import { itemListProps } from "../interfaces/itemList.interface";

const ItemList = memo(
  ({ item, style, index, provided, isDragging }: itemListProps) => {
    // Restrict dragging to vertical axis
    let transform = provided.draggableProps.style?.transform;

    if (transform) {
      transform = transform.replace(/\(.+\,/, "(-50%,");
    }

    const styleExtended = {
      ...style,
      ...provided.draggableProps.style,
      userSelect: "none",
      width: "640px",
      left: "50%",
      transform: transform ? transform : "translateX(-50%)",
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
        <Row item={item} />
      </div>
    );
  }
);

const Row = ({ item }: { item: TaskProps }) => {
  return (
    <Task
      task={{
        id: item.id,
        name: item.name,
        description: item.name,
        status: false,
        listId: "1",
      }}
    />
  );
};

const rowRenderer =
  (items: TaskProps[]) =>
  ({ index, style }: { index: number; style: CSSStyleRule }) => {
    const item = items[index];

    if (!item) return null;

    return (
      <Draggable index={index} key={item.id} draggableId={item.id}>
        {(provided, snapshot) => {
          return (
            <ItemList
              item={item}
              provided={provided}
              style={style}
              isDragging={snapshot.isDragging}
              index={0}
            />
          );
        }}
      </Draggable>
    );
  };

const TaskList = memo(({ items }: { items: TaskProps[] }) => {
  return (
    <div className="flex-1 border-black border ">
      <Droppable
        mode="virtual"
        direction="vertical"
        droppableId={"droppable"}
        renderClone={(provided, snapshot, rubric) => (
          <ItemList
            provided={provided}
            isDragging={snapshot.isDragging}
            item={items[rubric.source.index]}
            style={undefined}
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
                  style={{
                    transition: "background-color 0.2s ease",
                    backgroundColor: snapshot.isDraggingOver
                      ? "#0a84e3"
                      : "#74b9ff",
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
