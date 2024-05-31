import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Board from './pages/Board';

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/board' element={<Board />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
