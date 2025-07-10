import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { supabase } from './lib/services/supabase-client-service';
import { userApi } from './store/userApi';

// Global Supabase auth state change listener
supabase.auth.onAuthStateChange(() => {
  store.dispatch(userApi.util.resetApiState());
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
