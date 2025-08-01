import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './css/Index.css';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import 'react-loading-skeleton/dist/skeleton.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster 
        position="top-center" 
        reverseOrder={false}
      />
      
      <App />
    </BrowserRouter>
  </StrictMode>,
);