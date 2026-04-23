import { createContext, useState, useEffect } from 'react';
import localforage from 'localforage';

export const InvoiceContext = createContext(); 

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString();
};

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoices = async () => {
      const stored = await localforage.getItem('invoices');
      if (stored) setInvoices(stored);
      setLoading(false);
    };
    loadInvoices();
  }, []);

  useEffect(() => {
    if (!loading) {
      localforage.setItem('invoices', invoices);
    }
  }, [invoices, loading]);

  const addInvoice = (invoice) => {
    setInvoices((prev) => [...prev, { ...invoice, id: generateId() }]);
  };

  const updateInvoice = (id, data) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, ...data } : inv))
    );
  };

  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const getInvoice = (id) => {
    return invoices.find((inv) => inv.id === id);
  };

  return (
    <InvoiceContext.Provider
      value={{ invoices, loading, addInvoice, updateInvoice, deleteInvoice, getInvoice }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};