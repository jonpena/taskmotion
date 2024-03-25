// import { useTaskStore } from "../store/taskStore";

const Table = () => {
  // const tasks = useTaskStore((state) => state.tasks);

  return (
    <div
      style={{ height: "calc(100dvh - 88px)" }}
      className="flex justify-center py-4 w-[350px] bg-white border border-gray-200
       shadow-md absolute mt-2 ml-2 rounded-md"
    >
      <div className="bg-gray-100 w-80 h-12 rounded">Home</div>
    </div>
  );
};

export default Table;
