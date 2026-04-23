import { useContext } from 'react';
import { InvoiceContext } from '../contexts/InvoiceContext';

export function useInvoices() {
  return useContext(InvoiceContext);
}