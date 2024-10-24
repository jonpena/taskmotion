import { Route, Routes, useLocation } from 'react-router-dom';
import { UserAuth } from '@/context/AuthContext';
import Home from '@/pages/Home';
import Board from '@/pages/Board';
import LoginCard from '@/pages/Login';
import List from '@/components/List';
import ProtectedRoute from '@/components/ProtectedRoute';
import { isEmptyObject } from '@/utils/isEmptyObject';

export function App() {
  const { user } = UserAuth();
  const location = useLocation();
  const isAuthenticated = !isEmptyObject(user);

  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedRoute
            isAuthenticated={!isAuthenticated}
            redirect={!isAuthenticated ? location.pathname : '/list/home'}
          >
            <Home />
          </ProtectedRoute>
        }
      >
        <Route index path='/login' element={<LoginCard />} />
      </Route>
      <Route
        path='/list/:listId'
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect={location.pathname}
          >
            <Board />
          </ProtectedRoute>
        }
      >
        <Route index element={<List />} />
      </Route>
    </Routes>
  );
}

export default App;
