import { useState, useEffect } from "react"
import TaskList from "./components/TaskList"
import TaskModal from "./components/TaskModal"
import type { Task } from "./types"
import "./styles.css"

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const handleTaskSubmit = (taskData: { name: string; description: string } | Task) => {
    if ("id" in taskData) {
      // Actualizando una tarea existente
      setTasks(tasks.map((task) => (task.id === taskData.id ? taskData : task)))
    } else {
      // Creando una nueva tarea
      const newTask: Task = {
        id: Date.now().toString(),
        name: taskData.name,
        description: taskData.description,
        status: "active",
      }
      setTasks([...tasks, newTask])
    }
    setIsModalOpen(false)
    setEditingTask(null)
  }

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: task.status === "active" ? "completed" : "active" } : task,
      ),
    )
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const openEditModal = (task: Task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    return task.status === filter
  })

  return (
    <div className="todo-app">
      <h1>Administrador</h1>

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

        <div className="tabs">
          <button onClick={() => setFilter("all")} className={`tab-button ${filter === "all" ? "active" : ""}`}>
            All
          </button>
          <button onClick={() => setFilter("active")} className={`tab-button ${filter === "active" ? "active" : ""}`}>
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`tab-button ${filter === "completed" ? "active" : ""}`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="task-header">
        <span>Status</span>
        <span>Tarea</span>
        <span>Acciones</span>
      </div>

      <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={openEditModal} />

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