import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Invoice Manager
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/invoices/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            New Invoice
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}