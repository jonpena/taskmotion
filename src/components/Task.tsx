import { TaskProps } from "../interfaces/task.interface";
import { TASK_MAXWIDTH, TASK_MINWIDTH } from "../constants/base";

type TaskComponentProps = {
  task: TaskProps;
};

const Task = ({ task }: TaskComponentProps) => {
  return (
    <div
      style={{
        width: `calc(clamp(${TASK_MINWIDTH}px, 100vw, ${TASK_MAXWIDTH}px))`,
      }}
      className=" h-[42PX] flex justify-between items-center
      bg-white p-3 rounded-md border border-gray-200 shadow-md 
      text-gray-500 my-2 cursor-pointer pointer-events-auto"
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-2 checkbox checkbox-sm border-gray-400 border-2 checked:border-none
          [--chkbg:theme(colors.blue.500)] [--chkfg:white]"
        />
        <div
          title={task.name}
          style={{
            maxWidth: `calc(clamp(${TASK_MINWIDTH}px, 100vw, ${TASK_MAXWIDTH}px) - 50px)`,
          }}
          className=" whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {task.name}
        </div>
      </div>
    </div>
  );
};

export default Task;
