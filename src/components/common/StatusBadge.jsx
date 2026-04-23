const statusConfig = {
  draft: { label: 'Draft', className: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200' },
  pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  paid: { label: 'Paid', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.draft;
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}