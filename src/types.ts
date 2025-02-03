export interface Task {
  id: string
  name: string
  description: string
  status: "active" | "completed"
}