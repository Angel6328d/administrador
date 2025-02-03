export interface Task {
  id: number
  title: string
  completed: boolean
  createdAt: string
  completedAt?: string
  description?: string
}