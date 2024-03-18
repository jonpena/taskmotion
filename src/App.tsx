/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines */

import { useLocalstorage } from "./hooks/useLocalstorage";
import { TaskProps } from "./interfaces/task.interface";
import CreateTask from "./components/CreateTask";
import { reorder } from "./services/reorder";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskList from "./components/TaskList";
// import { CSSProperties, memo, useEffect, useState } from "react";
import { useTaskStore } from "./store/taskStore";
import { useEffect } from "react";

const App = () => {
  const [data] = useLocalstorage("data");

  const { tasks, initTasks } = useTaskStore();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    initTasks(reorder(tasks, source.index, destination.index));
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    initTasks(data as TaskProps[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CreateTask />
      <TaskList />
    </DragDropContext>
  );
};

export default App;
