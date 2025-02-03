import type React from "react"
import type { Task } from "../types/Task"

interface TaskListProps {
  tasks: Task[]
  onToggleTask: (id: number) => void
  onDeleteTask: (id: number) => void
  onOpenModal: (task: Task) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask, onOpenModal }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <input type="checkbox" checked={task.completed} onChange={() => onToggleTask(task.id)} />
          <span onClick={() => onOpenModal(task)} className={task.completed ? "completed" : ""}>
            {task.title}
          </span>
          <button onClick={() => onDeleteTask(task.id)} className="delete-button">
            ×
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TaskList