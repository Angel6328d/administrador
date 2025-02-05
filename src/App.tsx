import { useState, useEffect, useCallback } from "react"
import { AnimatePresence } from "framer-motion"
import TaskList from "./components/TaskList"
import TaskModal from "./components/TaskModal"
import FilterTabs from "./components/FilterTabs"
import type { Task } from "./types"
import "./styles.css"

export type FilterType = "all" | "active" | "completed"

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks")
    return storedTasks ? JSON.parse(storedTasks) : []
  })
  const [filter, setFilter] = useState<FilterType>("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const handleTaskSubmit = useCallback((taskData: { name: string; description: string } | Task) => {
    if ("id" in taskData) {
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskData.id ? taskData : task)))
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        name: taskData.name,
        description: taskData.description,
        status: "active",
      }
      setTasks((prevTasks) => [...prevTasks, newTask])
    }
    setIsModalOpen(false)
    setEditingTask(null)
  }, [])

  const toggleTask = useCallback((id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: task.status === "active" ? "completed" : "active" } : task,
      ),
    )
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }, [])

  const openEditModal = useCallback((task: Task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }, [])

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    return task.status === filter
  })

  return (
    <div className="todo-app">
      <h1>Administrador de Tareas</h1>

      <div className="app-controls">
        <button
          onClick={() => {
            setEditingTask(null)
            setIsModalOpen(true)
          }}
          className="add-button"
        >
          + Crear Tarea
        </button>

        <FilterTabs filter={filter} onSetFilter={setFilter} />
      </div>

      <div className="task-header">
        <span>Status</span>
        <span>Tarea</span>
        <span>Acciones</span>
      </div>

      <AnimatePresence>
        <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={openEditModal} />
      </AnimatePresence>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingTask(null)
        }}
        onSubmit={handleTaskSubmit}
        task={editingTask}
      />
    </div>
  )
}

export default App