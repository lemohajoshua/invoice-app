import { useParams, Link, useNavigate } from 'react-router-dom';
import { useInvoices } from '../hooks/useInvoices';
import StatusBadge from '../components/common/StatusBadge';
import { useState } from 'react';
import DeleteConfirmModal from '../components/common/Modal';

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const { getInvoice, updateInvoice, deleteInvoice } = useInvoices();
  const navigate = useNavigate();
  const invoice = getInvoice(id);
  const [showModal, setShowModal] = useState(false);

  if (!invoice) {
    return <div className="text-center py-10">Invoice not found</div>;
  }

  // ✅ Safe total calculation
  const total =
    invoice.items?.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    ) || 0;

  // ✅ UX FIX: Prevent unnecessary updates
  const handleMarkAsPaid = () => {
    if (invoice.status !== 'pending') return;
    updateInvoice(id, { status: 'paid' });
  };

  const handleDelete = () => {
    deleteInvoice(id);
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Invoice #{invoice.id.slice(0, 8)}
        </h1>
        <StatusBadge status={invoice.status} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Client Name</p>
            <p className="font-medium">{invoice.clientName}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Client Email</p>
            <p className="font-medium">{invoice.clientEmail}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Due Date</p>
            <p>
              {invoice.dueDate
                ? new Date(invoice.dueDate).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Total</p>
            <p className="font-bold">${total.toFixed(2)}</p>
          </div>
        </div>

        <div>
          <p className="text-gray-500 text-sm mb-2">Items</p>

          {invoice.items?.length ? (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      ${(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No items available</p>
          )}
        </div>

        {invoice.notes && (
          <div>
            <p className="text-gray-500 text-sm">Notes</p>
            <p>{invoice.notes}</p>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          {/* ✅ Only show when valid */}
          {invoice.status === 'pending' && (
            <button
              onClick={handleMarkAsPaid}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              Mark as Paid
            </button>
          )}

          <Link
            to={`/invoices/${id}/edit`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Edit
          </Link>

          <button
            onClick={() => setShowModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            Delete
          </button>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        invoiceName={`#${invoice.id.slice(0, 8)}`}
      />
    </div>
  );
}