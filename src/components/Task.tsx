import { TaskProps } from "../interfaces/task.interface";
// import { useState } from "react";
import { TASK_MAXWIDTH, TASK_MINWIDTH } from "../constants/base";
import { Box } from "@mui/material";

type TaskComponentProps = {
  task: TaskProps;
  // tasks: TaskProps[];
  // setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
};

const Task = ({ task /*, tasks, setTasks */ }: TaskComponentProps) => {
  // const [checked, setChecked] = useState<boolean>(task.status === true);

  return (
    <Box
      className="h-[42PX] flex justify-between items-center
      bg-white p-3 rounded-md shadow-md text-gray-500 my-2"
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          // checked={checked}
          // onChange={handleChange}
          className="mr-2 checkbox checkbox-sm border-gray-400 border-2 checked:border-none
          [--chkbg:theme(colors.blue.500)] [--chkfg:white]"
        />
        <Box
          sx={{
            width: `calc(clamp(${TASK_MINWIDTH}px, 100vw, ${TASK_MAXWIDTH}px) - 50px)`,
            maxWidth: `calc(clamp(${TASK_MINWIDTH}px, 100vw, ${TASK_MAXWIDTH}px) - 50px)`,
          }}
          className="whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {task.name}
        </Box>
      </div>
    </Box>
  );
};

export default Task;
