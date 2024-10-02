import { en } from './en'

type NestedPaths<T, Prev extends string = ''> = {
  [K in keyof T]: T[K] extends Record<string, any>
    ? NestedPaths<T[K], `${Prev}${Prev extends '' ? '' : '.'}${K & string}`>
    : `${Prev}${Prev extends '' ? '' : '.'}${K & string}`
}[keyof T]

export type Messages = typeof en

export type MessageKey = NestedPaths<Messages>
