import type React from "react"

type FilterType = "all" | "active" | "completed"

interface FilterTabsProps {
  filter: FilterType
  onSetFilter: (filter: FilterType) => void
}

const FilterTabs: React.FC<FilterTabsProps> = ({ filter, onSetFilter }) => {
  return (
    <div className="tabs flex space-x-2">
      <button
        onClick={() => onSetFilter("all")}
        className={`tab-button px-4 py-2 rounded-full transition-colors duration-200 ${
          filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Todas
      </button>
      <button
        onClick={() => onSetFilter("active")}
        className={`tab-button px-4 py-2 rounded-full transition-colors duration-200 ${
          filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Activas
      </button>
      <button
        onClick={() => onSetFilter("completed")}
        className={`tab-button px-4 py-2 rounded-full transition-colors duration-200 ${
          filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Completadas
      </button>
    </div>
  )
}

export default FilterTabs