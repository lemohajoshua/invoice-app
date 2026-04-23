import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import InvoiceCreate from './pages/InvoiceCreate';
import InvoiceEdit from './pages/InvoiceEdit';
import InvoiceDetailPage from './pages/InvoiceDetailPage';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path="/invoices/new" element={<InvoiceCreate />} />
        <Route path="/invoices/:id/edit" element={<InvoiceEdit />} />
        <Route path="/invoices/:id" element={<InvoiceDetailPage />} />
      </Routes>
    </Layout>
  );
}

export default App;