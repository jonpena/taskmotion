import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Board from './pages/Board';
import List from '@/components/List';
import LoginCard from './pages/Login';

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route index path='/login' element={<LoginCard />} />
      </Route>
      <Route path='/list/:listId' element={<Board />}>
        <Route index element={<List />} />
      </Route>
    </Routes>
  );
}

export default App;
