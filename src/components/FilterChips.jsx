const FilterChips = ({ options, activeFilter, setActiveFilter }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const active = activeFilter === option;

        return (
          <button
            key={option}
            onClick={() => setActiveFilter(option)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              active
                ? "bg-blue-600 text-white"
                : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default FilterChips;