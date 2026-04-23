import { z } from 'zod';

export const invoiceSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.string().email('Invalid email address'),
  dueDate: z.string().min(1, 'Due date is required'),
  status: z.enum(['draft', 'pending', 'paid']).default('draft'),
  items: z.array(
    z.object({
      description: z.string().min(1, 'Item description required'),
      quantity: z.number().positive('Quantity must be positive'),
      price: z.number().positive('Price must be positive'),
    })
  ).min(1, 'At least one item is required'),
  notes: z.string().optional(),
});