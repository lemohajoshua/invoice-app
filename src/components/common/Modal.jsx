import { useEffect, useRef } from 'react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, invoiceName }) {
  const dialogRef = useRef(null);

  useEffect(() => {
  if (isOpen) {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      dialogRef.current.focus();
    }
  } else {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }
}, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      className="rounded-lg p-6 backdrop:bg-black/50 dark:bg-gray-800 dark:text-white"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title" className="text-xl font-bold mb-4">Confirm Deletion</h2>
      <p className="mb-6">Are you sure you want to delete invoice {invoiceName}?</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </dialog>
  );
}