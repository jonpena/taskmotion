import { TaskProps } from '../interfaces/task.interface';

type TaskComponentProps = {
  task: TaskProps;
};

const Task = ({ task }: TaskComponentProps) => {
  return (
    <div
      className="h-full overflow-x-hidden flex justify-between items-center
      bg-white p-0 rounded-md 
      text-gray-500 my-2 cursor-pointer pointer-events-auto"
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.status}
          className="mr-2 border-gray-400
          [--chkbg:theme(colors.blue.500)] [--chkfg:white]"
        />
        <div
          title={task.name}
          className=" whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {task.name}
        </div>
      </div>
    </div>
  );
};

export default Task;
