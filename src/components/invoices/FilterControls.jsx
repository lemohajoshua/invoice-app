export default function FilterControls({ currentFilter, onFilterChange }) {
  const filters = ['all', 'draft', 'pending', 'paid'];

  return (
    <div className="flex gap-2">
      {filters.map((filter) => {
        const isActive = currentFilter === filter;

        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-3 py-1 rounded-full capitalize transition ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        );
      })}
    </div>
  );
}