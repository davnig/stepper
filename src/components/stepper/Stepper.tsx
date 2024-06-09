import { createContext, Dispatch, FC, useContext, useMemo, useState } from 'react'
import { cn, FnChildren, renderFnChildren } from '../../utils/utils.ts'
import { Button } from '@/components/ui/Button.tsx'

type StepperState<V> = {
    value?: V
    step?: number
    steps: number
}

type StepperActions<V> = {
    next?: Dispatch<void>
    back?: Dispatch<void>
    complete?: Dispatch<void>
    cancel?: Dispatch<void>
}

type StepperEvents<V> = {
    onNext?: Dispatch<V | undefined>
    onBack?: Dispatch<V | undefined>
    onComplete?: Dispatch<V | undefined>
    onCancel?: Dispatch<V | undefined>
}

// =============== Context ===============

export type StepperContext<V> = StepperState<V> &
    StepperActions<V> & {
        titles?: string[]
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

export type StepperProps<V> = StepperEvents<V> & {
    steps: number
    titles?: string[]
    initialValue?: V
    children?: FnChildren<StepperContext<V>>
}

export function Stepper<V>({ steps, titles, initialValue, children, ...props }: StepperProps<V>) {
    const [state, setState] = useState<StepperState<V>>({ value: initialValue, step: 0, steps })

    const actions = useMemo(
        () => ({
            next: () =>
                setState(prev => ({
                    ...prev,
                    step: prev.step === undefined ? undefined : prev.step < steps - 1 ? prev.step + 1 : prev.step,
                })),
            back: () =>
                setState(prev => ({
                    ...prev,
                    step: prev.step === undefined ? undefined : prev.step > 0 ? prev.step - 1 : prev.step,
                })),
        }),
        [steps]
    )

    const context: StepperContext<V> = {
        ...state,
        ...actions,
        titles,
    }

    return <stepperContext.Provider value={context}>{renderFnChildren(children, context)}</stepperContext.Provider>
}

// =============== Header ===============

export function StepperHeader<V>() {
    const { step, steps, titles } = useStepperContext<V>()

    return (
        <div className='flex items-center gap-2'>
            {[...Array(steps)].map((_, i) => (
                <div key={i} className={cn('flex items-center gap-2', step === i && 'text-red-500')}>
                    <p>{i}</p>
                    <p>{titles?.[i]}</p>
                </div>
            ))}
        </div>
    )
}

// =============== Stepper Footer ===============

export type StepperFooterProps<V> = StepperEvents<V>

export function StepperFooter<V>({ onNext, onBack, ...props }: StepperFooterProps<V>) {
    const { value, next, back } = useStepperContext<V>()

    return (
        <div className='flex items-center justify-between'>
            <Button
                variant='secondary'
                onClick={() => {
                    back?.()
                    onBack?.(value)
                }}
            >
                Back
            </Button>
            <Button
                onClick={() => {
                    next?.()
                    onNext?.(value)
                }}
            >
                Next
            </Button>
        </div>
    )
}
