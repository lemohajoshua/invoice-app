export default function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  className = '',
}) {
  const baseClasses =
    'px-4 py-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary:
      'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };

  const selectedVariant = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${selectedVariant} ${className}`}
    >
      {children}
    </button>
  );
}