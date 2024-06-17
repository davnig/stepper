import * as React from 'react'

type JsonViewerProps = {
    children: any
}

export function JsonViewer({ children }: JsonViewerProps) {
    return (
        <pre className='my-4 rounded-md bg-neutral-700 px-4 py-2 text-white'>
            {JSON.stringify(children ?? {}, null, 4)}
        </pre>
    )
}
