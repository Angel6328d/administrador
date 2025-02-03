import type React from "react"
import { useState, useCallback } from "react"

interface TaskFormProps {
  onAddTask: (title: string) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("")

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (title.trim()) {
        onAddTask(title.trim())
        setTitle("")
      }
    },
    [title, onAddTask],
  )

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva tarea..."
        className="task-input"
      />
      <button type="submit" className="add-button">
        Agregar
      </button>
    </form>
  )
}

export default TaskForm