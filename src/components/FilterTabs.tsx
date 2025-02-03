import type React from "react"

interface FilterTabsProps {
  filter: string
  onSetFilter: (filter: string) => void
}

const FilterTabs: React.FC<FilterTabsProps> = ({ filter, onSetFilter }) => {
  return (
    <div className="tabs">
      <button className={`tab-button ${filter === "all" ? "active" : ""}`} onClick={() => onSetFilter("all")}>
        Todas
      </button>
      <button className={`tab-button ${filter === "active" ? "active" : ""}`} onClick={() => onSetFilter("active")}>
        Activas
      </button>
      <button
        className={`tab-button ${filter === "completed" ? "active" : ""}`}
        onClick={() => onSetFilter("completed")}
      >
        Completadas
      </button>
    </div>
  )
}

export default FilterTabs