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

  useEffect(() => {
    if (task) {
      setTaskName(task.name)
      setTaskDescription(task.description)
    } else {
      setTaskName("")
      setTaskDescription("")
    }
  }, [task])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (taskName.trim()) {
      if (task) {
        // Si estamos editando, enviamos la tarea completa actualizada
        onSubmit({
          ...task,
          name: taskName.trim(),
          description: taskDescription.trim(),
        })
      } else {
        // Si estamos creando, enviamos solo los campos necesarios
        onSubmit({
          name: taskName.trim(),
          description: taskDescription.trim(),
        })
      }
      setTaskName("")
      setTaskDescription("")
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{task ? "Editar Tarea" : "Crear Nueva Tarea"}</h2>
          <button onClick={onClose} className="modal-close">
            &times;
          </button>
        </div>
        <div className="modal-body">
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
            <div style={{ marginTop: "15px" }}>
              <button type="submit" className="add-button">
                {task ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TaskModal