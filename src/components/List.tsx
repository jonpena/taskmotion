import { SortableList } from './sortable/SortableList';
import Task from './Task';
import { useTaskStore } from '@/store/taskStore';

const List = () => {
  const items = useTaskStore((state) => state.tasks);

  const { setTasks } = useTaskStore();

  return (
    <SortableList
      items={items}
      onChange={setTasks}
      renderItem={(item) => (
        <SortableList.Item id={item.id}>
          <Task task={item} />
          <SortableList.DragHandle />
        </SortableList.Item>
      )}
    />
  );
};

export default List;
