/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines */

// import { useLocalstorage } from "@/hooks/useLocalstorage";
// import { TaskProps } from "@/interfaces/task.interface";
import CreateTask from "@/components/CreateTask";
// import { DragDropContext, DropResult } from "react-beautiful-dnd";
// import TaskList from "@/components/TaskList";
// import { CSSProperties, memo, useEffect, useState } from "react";
// import { useTaskStore } from "@/store/taskStore";
// import { useEffect } from "react";
import Table from "@/components/Table";

const Board = () => {
  // const [data] = useLocalstorage("data");

  // const { tasks, initTasks } = useTaskStore();

  return (
    <div>
      <CreateTask />
      <Table />
      {/* <TaskList /> */}
    </div>
  );
};

export default Board;
