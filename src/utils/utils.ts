import { ReactNode } from 'react'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type FnChildren<P> = ReactNode | ((params: P) => ReactNode)

/**
 * Functional rendering of children
 */
export function renderFnChildren<P>(fnChildren: FnChildren<P>, params: P) {
    return typeof fnChildren === 'function' ? fnChildren(params) : fnChildren
}

/**
 * Class mixing and Tailwind merge
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
