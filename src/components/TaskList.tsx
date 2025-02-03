import type React from "react"
import type { Task } from "../types"

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (task: Task) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, onEdit }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <input type="checkbox" checked={task.status === "completed"} onChange={() => onToggle(task.id)} />
          <div className="task-content">
            <span className={task.status === "completed" ? "completed" : ""}>{task.name}</span>
            <p className="task-description">{task.description}</p>
          </div>
          <div className="task-actions">
            <button className="edit-button" onClick={() => onEdit(task)}>
              ✎
            </button>
            <button onClick={() => onDelete(task.id)} className="delete-button">
              ×
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TaskList