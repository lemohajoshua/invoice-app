import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { invoiceSchema } from '../../schemas/invoiceSchema';

export default function InvoiceForm({
  defaultValues,
  onSubmit,
  isEditing = false,
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(invoiceSchema),

    defaultValues: defaultValues ?? {
      clientName: '',
      clientEmail: '',
      dueDate: '',
      status: 'draft',
      items: [{ description: '', quantity: 1, price: 0 }],
      notes: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="clientName" className="block font-medium mb-1">
          Client Name *
        </label>
        <input
          id="clientName"
          {...register('clientName')}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
        />
        {errors.clientName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.clientName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="clientEmail" className="block font-medium mb-1">
          Client Email *
        </label>
        <input
          id="clientEmail"
          type="email"
          {...register('clientEmail')}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
        />
        {errors.clientEmail && (
          <p className="text-red-500 text-sm mt-1">
            {errors.clientEmail.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="dueDate" className="block font-medium mb-1">
          Due Date *
        </label>
        <input
          id="dueDate"
          type="date"
          {...register('dueDate')}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
        />
        {errors.dueDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.dueDate.message}
          </p>
        )}
      </div>

      {isEditing && (
        <div>
          <label htmlFor="status" className="block font-medium mb-1">
            Status
          </label>
          <select
            id="status"
            {...register('status')}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      )}

      <div>
        <label className="block font-medium mb-2">
          Invoice Items *
        </label>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border p-4 rounded mb-3 space-y-2"
          >
            <input
              placeholder="Description"
              {...register(`items.${index}.description`)}
              className="w-full p-2 border rounded dark:bg-gray-800"
            />
            {errors.items?.[index]?.description && (
              <p className="text-red-500 text-sm">
                {errors.items[index].description.message}
              </p>
            )}

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Quantity"
                {...register(`items.${index}.quantity`, {
                  valueAsNumber: true,
                  min: 1,
                })}
                className="w-1/2 p-2 border rounded dark:bg-gray-800"
              />

              <input
                type="number"
                placeholder="Price"
                step="0.01"
                {...register(`items.${index}.price`, {
                  valueAsNumber: true,
                  min: 0,
                })}
                className="w-1/2 p-2 border rounded dark:bg-gray-800"
              />
            </div>

            {errors.items?.[index]?.quantity && (
              <p className="text-red-500 text-sm">
                {errors.items[index].quantity.message}
              </p>
            )}

            {errors.items?.[index]?.price && (
              <p className="text-red-500 text-sm">
                {errors.items[index].price.message}
              </p>
            )}

            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 text-sm hover:underline"
            >
              Remove item
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({ description: '', quantity: 1, price: 0 })
          }
          className="text-blue-600 hover:underline"
        >
          + Add item
        </button>

        {errors.items && typeof errors.items.message === 'string' && (
          <p className="text-red-500 text-sm mt-1">
            {errors.items.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="notes" className="block font-medium mb-1">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          {...register('notes')}
          rows="3"
          className="w-full p-2 border rounded dark:bg-gray-800"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          {isEditing ? 'Update Invoice' : 'Create Invoice'}
        </button>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 px-6 py-2 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}