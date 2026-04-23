import { useParams, useNavigate } from 'react-router-dom';
import { useInvoices } from '../hooks/useInvoices';
import InvoiceForm from '../components/invoices/InvoiceForm';

export default function InvoiceEdit() {
  const { id } = useParams();
  const { getInvoice, updateInvoice } = useInvoices();
  const navigate = useNavigate();
  const invoice = getInvoice(id);

  if (!invoice) return <div className="text-center py-10">Invoice not found</div>;

  const onSubmit = (data) => {
    updateInvoice(id, data);
    navigate(`/invoices/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Edit Invoice
      </h1>
      <InvoiceForm defaultValues={invoice} onSubmit={onSubmit} isEditing={true} />
    </div>
  );
}