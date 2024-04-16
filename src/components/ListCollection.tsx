import { useTaskStore } from '../store/taskStore';

const ListCollection = () => {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <ul
      style={{ height: 'calc(100dvh - 88px)' }}
      className="w-[350px] z-50 mx-auto mt-2 ml-2 py-8 bg-white border border-gray-200
       shadow-md absolute rounded-md"
    >
      <li className="mx-auto flex items-center justify-between px-4 text-gray-500 bg-gray-100 pl-2 w-80 h-12 rounded-xl">
        <span className="text-sm">Home</span>
        <span className="text-sm font-medium bg-white px-2 py-1 rounded-lg">
          {tasks.length}
        </span>
      </li>
      <li className="mx-auto mt-2 flex items-center justify-between px-4 text-gray-500 bg-gray-100 pl-2 w-80 h-12 rounded-xl">
        <span className="text-sm">Primera lista</span>
        <span className="text-sm font-medium bg-white px-2 py-1 rounded-lg">
          {tasks.length}
        </span>
      </li>
    </ul>
  );
};

export default ListCollection;
