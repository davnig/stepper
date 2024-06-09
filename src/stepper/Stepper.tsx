import { createContext, Dispatch, FC, useContext, useState } from 'react'
import { FnChildren, renderFnChildren } from '../utils/utils.ts'
import { Button } from '../components/Button.tsx'

// =============== Context ===============

export type StepperContext<V> = StepperState<V>

const stepperContext = createContext<StepperContext<any> | undefined>(undefined)

export function useStepperContext<V>(): StepperContext<V> {
    const context = useContext(stepperContext)
    if (!context) {
        throw new Error('useStepperContext should be used within <Stepper>')
    }
    return context
}

// =============== Stepper ===============

type StepperState<V> = {
    value?: V
    step?: number
}

type StepperActions = {
    onNext?: Dispatch<void>
    onBack?: Dispatch<void>
    onComplete?: Dispatch<void>
    onCancel?: Dispatch<void>
}

export type StepperProps<V> = StepperActions & {
    steps?: number
    initialValue?: V
    children?: FnChildren<StepperContext<V>>
}

export function Stepper<V>({ steps, initialValue, children, ...props }: StepperProps<V>) {
    const [state, setState] = useState<StepperState<V>>({ value: initialValue, step: 0 })

    const context: StepperContext<V> = {
        ...state,
    }

    return <stepperContext.Provider value={context}>{renderFnChildren(children, context)}</stepperContext.Provider>
}

// =============== Header ===============

export type StepperHeaderProps = unknown

export function StepperHeader(props: StepperHeaderProps) {
    return <></>
}

// =============== Stepper Footer ===============

export type StepperFooterProps = StepperActions

export function StepperFooter({ onNext, onBack, ...props }: StepperFooterProps) {
    return (
        <div className='flex items-center justify-between'>
            <Button variant='secondary' onClick={() => onBack?.()}>
                Back
            </Button>
            <Button onClick={() => onNext?.()}>Next</Button>
        </div>
    )
}
