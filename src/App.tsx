import type React from "react"
import { useState, useEffect, useCallback } from "react"
import FilterTabs from "./components/FilterTabs"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import Modal from "./components/Modal"
import type { Task } from "./types/Task"
import "./styles.css"

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks")
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  const [filter, setFilter] = useState(() => {
    return sessionStorage.getItem("filter") || "all"
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined)

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    sessionStorage.setItem("filter", filter)
  }, [filter])

  const addTask = useCallback((title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks((prevTasks) => [...prevTasks, newTask])
  }, [])

  const toggleTask = useCallback((id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const completedAt = !task.completed ? new Date().toISOString() : undefined
          return {
            ...task,
            completed: !task.completed,
            completedAt,
          }
        }
        return task
      }),
    )
  }, [])

  const deleteTask = useCallback((id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }, [])

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  const openModal = useCallback((task: Task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }, [])

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <TaskForm onAddTask={addTask} />
      <FilterTabs filter={filter} onSetFilter={setFilter} />
      <TaskList tasks={filteredTasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} onOpenModal={openModal} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} task={selectedTask} />
    </div>
  )
}

export default App