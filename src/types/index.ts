export type { FC, ReactNode } from 'react'
export type Theme = 'light' | 'dark'

export interface Note {
  /** Unique identifier */
  readonly id: string
  /** The title */
  title: string
  /** The content or note itself */
  content: string
  /** The date when it was created */
  created: string
  /** The last date when it was modified */
  updated: string
}
