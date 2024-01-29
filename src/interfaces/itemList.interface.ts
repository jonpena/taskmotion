import { DraggableProvided } from "react-beautiful-dnd";
import { TaskProps } from "./task.interface";
import { CSSProperties } from "react";

export type itemListProps = {
  item: TaskProps;
  style: CSSStyleRule | undefined | CSSProperties;
  index: number;
  provided: DraggableProvided;
  isDragging: boolean;
};
