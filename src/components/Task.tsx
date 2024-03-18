import { TaskProps } from "../interfaces/task.interface";
// import { useState } from "react";
import { TASK_MAXWIDTH, TASK_MINWIDTH } from "../constants/base";
import { Box } from "@mui/material";

type TaskComponentProps = {
  task: TaskProps;
};

const Task = ({ task }: TaskComponentProps) => {
  return (
    <Box
      sx={{
        width: `calc(clamp(${TASK_MINWIDTH}px, 100vw, ${TASK_MAXWIDTH}px) - 60px)`,
      }}
      className=" h-[42PX] flex justify-between items-center
      bg-white p-3 rounded-md shadow-md text-gray-500 my-2 cursor-pointer pointer-events-auto"
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-2 checkbox checkbox-sm border-gray-400 border-2 checked:border-none
          [--chkbg:theme(colors.blue.500)] [--chkfg:white]"
        />
        <Box
          title={task.name}
          sx={{
            width: `calc(clamp(${TASK_MINWIDTH}px, 100vw, ${TASK_MAXWIDTH}px) - 60px)`,
          }}
          className=" whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {task.name}
        </Box>
      </div>
    </Box>
  );
};

export default Task;
