import { Link } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';

export default function InvoiceCard({ invoice }) {
  const total =
    invoice.items?.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    ) || 0;

  return (
    <Link to={`/invoices/${invoice.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold">
            Invoice #{invoice.id.slice(0, 8)}
          </h3>
          <StatusBadge status={invoice.status} />
        </div>

        <p className="text-gray-600 dark:text-gray-300">
          {invoice.clientName}
        </p>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Due: {new Date(invoice.dueDate).toLocaleDateString()}
        </p>

        <p className="text-right font-bold mt-3">
          ${total.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}