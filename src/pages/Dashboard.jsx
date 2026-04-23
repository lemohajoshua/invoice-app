import { useState } from 'react';
import { useInvoices } from '../hooks/useInvoices';
import InvoiceCard from '../components/invoices/InvoiceCard';
import FilterControls from '../components/invoices/FilterControls';

export default function Dashboard() {

    const { invoices, loading } = useInvoices();
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredInvoices = invoices.filter(inv => {
        if (statusFilter === 'all') return true;
        return inv.status === statusFilter;
    });

    if (loading) {
        return <div className="text-center py-10">Loading invoices...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Invoices</h1>
            <FilterControls currentFilter={statusFilter} onFilterChange={setStatusFilter} />
        </div>

        {filteredInvoices.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No invoices found. Create your first invoice!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvoices.map(invoice => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      )}
    </div>
  );
}
