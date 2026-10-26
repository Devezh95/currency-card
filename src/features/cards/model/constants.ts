import type { BadgeTone } from '@/shared/ui'

export const PRIORITY_VALUES = ['low', 'medium', 'high', 'urgent'] as const
export const STATUS_VALUES = ['todo', 'in_progress', 'review', 'done'] as const
export const ASSIGNEE_VALUES = [
  'alex-ezhel',
  'nastya-kononeko',
  'nick-mironov',
  'denis-sanuvong',
] as const

export const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
} as const satisfies Record<(typeof PRIORITY_VALUES)[number], string>

export const STATUS_LABELS = {
  todo: 'To Do',
  in_progress: 'In Progress',
  review: 'Review',
  done: 'Done',
} as const satisfies Record<(typeof STATUS_VALUES)[number], string>

export const ASSIGNEE_NAMES = {
  'alex-ezhel': 'Alex Ezhel',
  'nastya-kononeko': 'Nastya Kononeko',
  'nick-mironov': 'Nick Mironov',
  'denis-sanuvong': 'Denis Sanuvong',
} as const satisfies Record<(typeof ASSIGNEE_VALUES)[number], string>

export const toOptions = <T extends string>(values: readonly T[], labels: Record<T, string>) =>
  values.map((value) => ({ value, label: labels[value] }))

export const LIMITS = {
  title: 100,
  description: 1000,
  tags: 10,
  tagLength: 20,
  images: 5,
  imageBytes: 5 * 1024 * 1024,
} as const

const TAG_TONES: readonly BadgeTone[] = ['purple', 'accent', 'red', 'warning', 'success']

export const tagTone = (index: number): BadgeTone => TAG_TONES[index % TAG_TONES.length] ?? 'purple'

export const MESSAGES = {
  titleRequired: 'Title is required',
  titleTooLong: `Title must be at most ${String(LIMITS.title)} characters`,
  descriptionRequired: 'Description is required',
  descriptionTooLong: `Description must be at most ${String(LIMITS.description)} characters`,
  priorityRequired: 'Please select a priority',
  deadlineInPast: 'Deadline cannot be in the past',
  tooManyTags: `Maximum ${String(LIMITS.tags)} tags`,
  tagTooLong: `Tag must be at most ${String(LIMITS.tagLength)} characters`,
  tagDuplicate: 'Tag already added',
  imageType: 'Only image files are allowed',
  tooManyImages: `Maximum ${String(LIMITS.images)} images`,
  imageTooLarge: `Each image must be ${String(LIMITS.imageBytes / 1024 / 1024)} MB or less`,
} as const
