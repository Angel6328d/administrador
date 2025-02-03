import type React from "react"
import type { Task } from "../types/Task"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | undefined
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, task }) => {
  if (!isOpen || !task) return null

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{task.title}</h2>
          <button onClick={onClose} className="modal-close">
            ×
          </button>
        </div>
        <div className="modal-body">
          <p>
            Estado:{" "}
            <span className={task.completed ? "completed" : ""}>{task.completed ? "Completada" : "Activa"}</span>
          </p>
          <p>Creada: {formatDate(task.createdAt)}</p>
          {task.completed && task.completedAt && <p>Completada: {formatDate(task.completedAt)}</p>}
        </div>
      </div>
    </div>
  )
}

export default Modal