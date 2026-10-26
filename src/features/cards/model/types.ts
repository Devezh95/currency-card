import type { ASSIGNEE_VALUES, PRIORITY_VALUES, STATUS_VALUES } from './constants'

export type Priority = (typeof PRIORITY_VALUES)[number]
export type Status = (typeof STATUS_VALUES)[number]
export type AssigneeId = (typeof ASSIGNEE_VALUES)[number]

export interface Card {
  id: string
  title: string
  description: string
  priority: Priority
  status?: Status
  assignee?: AssigneeId

  deadline?: string
  tags: string[]

  createdAt: string

  updatedAt: string
}

export type CardInput = Omit<Card, 'id' | 'createdAt' | 'updatedAt'>

export interface CardImage {
  id: string
  file: File
}
