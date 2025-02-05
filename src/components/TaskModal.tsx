import type React from "react"
import { useState, useEffect } from "react"
import type { Task } from "../types"

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (taskData: { name: string; description: string } | Task) => void
  task?: Task | null
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSubmit, task }) => {
  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (task) {
      setTaskName(task.name)
      setTaskDescription(task.description)
    } else {
      setTaskName("")
      setTaskDescription("")
    }
    setError("")
  }, [task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (taskName.trim()) {
      if (task) {
        onSubmit({
          ...task,
          name: taskName.trim(),
          description: taskDescription.trim(),
        })
      } else {
        onSubmit({
          name: taskName.trim(),
          description: taskDescription.trim(),
        })
      }
      setTaskName("")
      setTaskDescription("")
      setError("")
    } else {
      setError("El nombre de la tarea no puede estar vacío")
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{task ? "Editar Tarea" : "Crear Nueva Tarea"}</h2>
          <button onClick={onClose} className="modal-close">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Nombre de la tarea"
            className="task-input"
            autoFocus
          />
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Descripción de la tarea"
            className="task-input"
            rows={3}
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="add-button">
              Cancelar
            </button>
            <button type="submit" className="add-button">
              {task ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal