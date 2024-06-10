import { useEffect } from 'react';
import { SortableList } from './sortable/SortableList';
import Task from './Task';
import { useTaskStore } from '@/store/taskStore';
import { useListStore } from '@/store/listStore';
import { useParams } from 'react-router-dom';

const List = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const lists = useListStore((state) => state.lists);
  const { setTasks } = useTaskStore();
  const { listId } = useParams();

  useEffect(() => {
    const findList = lists.find((list) => list.listId === listId);
    setTasks(findList?.tasks || []);
  }, [listId, lists]);

  return (
    <SortableList
      items={tasks || []}
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
