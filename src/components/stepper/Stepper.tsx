import { createContext, Dispatch, FC, forwardRef, ReactNode, Ref, useContext, useMemo, useState } from 'react'
import { cn, FnChildren, renderFnChildren } from '../../utils/utils.ts'
import { Button } from '@/components/ui/Button.tsx'
import { Slot } from '@radix-ui/react-slot'

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

// =================== Step ===================

export type StepProps = {
    children?: ReactNode
    className?: string
}

export function Step({ children, className }: StepProps) {
    return <div className={cn('flex h-full w-[50rem] flex-col gap-4', className)}>{children}</div>
}

// =============== Step Header ===============

export function StepHeader<V>() {
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

// =============== Step Content ===============

export type StepContentProps = {
    className?: string
    asChild?: boolean
    children?: ReactNode
}

export const StepContent = forwardRef(({ className, asChild, ...props }: StepContentProps, ref: Ref<any>) => {
    const Comp = asChild ? Slot : 'div'
    return <Comp className={cn('flex-1', className)} ref={ref} {...props} />
})

// =============== Step Footer ===============

export type StepFooterProps<V> = StepperEvents<V> & {
    className?: string
}

export function StepFooter<V>({ className, onNext, onBack, ...props }: StepFooterProps<V>) {
    const { value, next, back, step, steps } = useStepperContext<V>()

    return (
        <div className={cn('flex items-center justify-between', className)}>
            <Button
                variant='secondary'
                onClick={() => {
                    back?.()
                    onBack?.(value)
                }}
            >
                {step === 0 ? 'Cancel' : 'Back'}
            </Button>
            <Button
                onClick={() => {
                    next?.()
                    onNext?.(value)
                }}
            >
                {step === steps - 1 ? 'Done' : 'Next'}
            </Button>
        </div>
    )
}
