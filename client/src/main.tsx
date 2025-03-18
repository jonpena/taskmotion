import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '@/context/AuthContext.tsx';
import { ThemeProvider } from '@/context/ThemeContext.tsx';

import App from './App.tsx';

import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
          <App />
        </ThemeProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
