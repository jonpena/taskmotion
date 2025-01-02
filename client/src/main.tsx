import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '@/context/AuthContext.tsx';
import { ThemeProvider } from '@/context/ThemeContext.tsx';

import App from './App.tsx';

import { StrictMode } from 'react';
import { SWRConfig, SWRConfiguration } from 'swr';
import { localStorageProvider } from './services/localStorageProvider.ts';

const swrConfig = { provider: localStorageProvider } as SWRConfiguration;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SWRConfig value={swrConfig}>
          <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
            <App />
          </ThemeProvider>
        </SWRConfig>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
