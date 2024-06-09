import { createContext, Dispatch, FC, useContext, useState } from 'react'
import { FnChildren, renderFnChildren } from '../utils/utils.ts'

// =============== Context ===============

export type StepperContext<V> = {
    value?: V
}

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

export type StepperProps<V> = {
    steps?: number
    initialValue?: V
    children?: FnChildren<StepperContext<V>>
    onNext?: Dispatch<void>
    onBack?: Dispatch<void>
    onComplete?: Dispatch<void>
    onCancel?: Dispatch<void>
}

export function Stepper<V>({ steps, initialValue, children, ...props }: StepperProps<V>) {
    const [state, setState] = useState<StepperState<V>>({ value: initialValue })

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

export type StepperFooterProps = unknown

export function StepperFooter(props: StepperFooterProps) {
    return <></>
}
