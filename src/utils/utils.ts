import { ReactNode } from 'react'

export type FnChildren<P> = ReactNode | ((params: P) => ReactNode)

export function renderFnChildren<P>(fnChildren: FnChildren<P>, params: P) {
    return typeof fnChildren === 'function' ? fnChildren(params) : fnChildren
}
