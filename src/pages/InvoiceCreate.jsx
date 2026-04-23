import { useNavigate } from 'react-router-dom';
import { useInvoices } from '../hooks/useInvoices';
import InvoiceForm from '../components/invoices/InvoiceForm';

export default function InvoiceCreate() {
  const { addInvoice } = useInvoices();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    addInvoice(data);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Invoice</h1>
      <InvoiceForm onSubmit={onSubmit} />
    </div>
  );
}