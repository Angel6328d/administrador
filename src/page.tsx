"use client"

import { useState, useEffect } from "react"
import FilterTabs from "./components/FilterTabs"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import Modal from "./components/Modal"
import type { Task } from "./types/Task"

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks")
      return savedTasks ? JSON.parse(savedTasks) : []
    }
    return []
  })
  const [filter, setFilter] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("filter") || "all"
    }
    return "all"
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined)

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    sessionStorage.setItem("filter", filter)
  }, [filter])

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks([...tasks, newTask])
  }

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) => {
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
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  const openModal = (task: Task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <FilterTabs filter={filter} onSetFilter={setFilter} />
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={filteredTasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} onOpenModal={openModal} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} task={selectedTask} />
    </div>
  )
}

export default TodoApp

