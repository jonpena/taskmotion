import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Board from './pages/Board';
import List from '@/components/List';

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/list/:listId' element={<Board />}>
        <Route index element={<List />} />
      </Route>
    </Routes>
  );
}

export default App;
