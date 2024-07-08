import * as React from 'react'

type JsonViewerProps = {
    children: any
}

export function JsonViewer({ children }: JsonViewerProps) {
    return <pre className='rounded-md bg-neutral-700 p-4 text-white'>{JSON.stringify(children ?? {}, null, 4)}</pre>
}
