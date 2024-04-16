import List from '@/components/List';
import CreateTask from './components/CreateTask';
import ListCollection from './components/ListCollection';

export function App() {
  return (
    <div className="">
      <CreateTask />
      <ListCollection />
      <List />
    </div>
  );
}

export default App;
