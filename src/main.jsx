import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { InvoiceProvider } from './contexts/InvoiceContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';
import App from './App.jsx';

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <InvoiceProvider>
          <App />
        </InvoiceProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);