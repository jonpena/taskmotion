import { useLocalstorage } from "./hooks/useLocalstorage";
import { TaskProps } from "./interfaces/task.interface";
import CreateTask from "./components/CreateTask";
import { reorder } from "./services/Reorder";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";

const App = () => {
  const [data] = useLocalstorage("data");

  const [tasks, setTasks] = useState(data as TaskProps[]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    setTasks(reorder(tasks, result.source.index, result.destination.index));
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CreateTask tasks={tasks} setTasks={setTasks} />
      <div className="flex h-screen">
        <TaskList items={tasks} />
      </div>
    </DragDropContext>
  );
};

export default App;
