import { useState } from "react";
import { createRange } from "./utils/utilities";
import { SortableList } from "./components/SortableList";
import Task from "./components/Task";

function getMockItems() {
  return createRange(1000, (index) => ({ id: index + 1 }));
}

export function App() {
  const [items, setItems] = useState(getMockItems);

  return (
    <SortableList
      items={items}
      onChange={setItems}
      renderItem={(item) => (
        <SortableList.Item id={item.id}>
          <Task
            task={{
              id: item.id.toString(),
              name: `Task ${item.id}`,
              listId: "1",
            }}
          />
          <SortableList.DragHandle />
        </SortableList.Item>
      )}
    />
  );
}

export default App;
