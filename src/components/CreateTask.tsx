import { useState } from "react";
import { TaskProps } from "../interfaces/task.interface";
import { v4 as uuid } from "uuid";

type CreateTaskProps = {
  tasks: TaskProps[];
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
};

const CreateTask = ({ tasks, setTasks }: CreateTaskProps) => {
  const [inputData, setInputData] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.target as HTMLInputElement).value !== "") {
      // setInputData("");

      setTasks([
        {
          name: (e.target as HTMLInputElement).value,
          id: uuid().slice(0, 18),
          status: false,
          listId: "todo",
        },
        ...tasks,
      ]);
    }
  };

  return (
    <div className="sticky top-0 z-20 w-screen py-3 bg-red-500 flex items-center justify-center">
      <input
        type="text"
        placeholder="Create new task"
        className="z-20 border-none bg-white input input-bordered input-primary w-full max-w-xs"
        onKeyDown={handleKeyPress}
        onChange={(e) => setInputData(e.target.value)}
        value={inputData}
      />
    </div>
  );
};

export default CreateTask;
