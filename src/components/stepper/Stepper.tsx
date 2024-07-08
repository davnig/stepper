import { createContext, Dispatch, forwardRef, ReactNode, Ref, useContext, useMemo, useState } from 'react'
import { cn, FnChildren, renderFnChildren } from '@/utils/utils.ts'
import { Button } from '@/components/ui/Button.tsx'
import { Slot } from '@radix-ui/react-slot'
import { Badge } from '@/components/ui/Badge.tsx'
import { CaretLeft } from '@phosphor-icons/react'

type StepperTransitionFn<V> = (value: V | undefined) => Promise<V | undefined>

type StepperState<V> = {
    value?: V
    step?: number
    steps: number
}

type StepperActions<V> = {
    next?: Dispatch<StepperTransitionFn<V>>
    back?: Dispatch<StepperTransitionFn<V>>
    complete?: Dispatch<void>
    cancel?: Dispatch<void>
}

type StepperEventHandlers<V> = {
    onNext?: StepperTransitionFn<V>
    onBack?: StepperTransitionFn<V>
    onComplete?: StepperTransitionFn<V>
    onCancel?: StepperTransitionFn<V>
}

// =============== Context ===============

// Stepper

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

// Step

export type StepContext<V> = StepperContext<V> & StepperEventHandlers<V>

const stepContext = createContext<StepContext<any> | undefined>(undefined)

export function useStepContext<V>(): StepContext<V> {
    const context = useContext(stepContext)
    if (!context) {
        throw new Error('useStepContext should be used within <Step>')
    }
    return context
}

// =============== Stepper ===============

export type StepperProps<V> = {
    steps: number
    titles?: string[]
    initialValue?: V
    children?: FnChildren<StepperContext<V>>
    className?: string
}

export function Stepper<V>({ steps, titles, initialValue, children, className, ...props }: StepperProps<V>) {
    const [state, setState] = useState<StepperState<V>>({ value: initialValue, step: 0, steps })

    const actions: StepperActions<V> = useMemo(() => {
        return {
            next: async (onNext?: StepperTransitionFn<V>) => {
                const newStep =
                    state.step === undefined ? undefined : state.step <= state.steps - 1 ? state.step + 1 : state.step
                const newValue = await onNext?.(state.value)

                setState(prev => ({
                    ...prev,
                    step: newStep,
                    value: newValue,
                }))
            },
            back: async (onBack?: StepperTransitionFn<V>) => {
                const newStep = state.step === undefined ? undefined : state.step > 0 ? state.step - 1 : state.step

                setState(prev => ({
                    ...prev,
                    step: newStep,
                }))
            },
        }
    }, [state.step, state.steps])

    const context: StepperContext<V> = {
        ...state,
        ...actions,
        titles,
    }

    return (
        <stepperContext.Provider value={context}>
            <div className={cn('flex min-h-screen flex-col items-center', className)}>
                {renderFnChildren(children, context)}
            </div>
        </stepperContext.Provider>
    )
}

// =================== Step ===================

export type StepProps<V> = StepperEventHandlers<V> & {
    children?: ReactNode
    className?: string
}

export function Step<V>({ children, className, ...eventHandlers }: StepProps<V>) {
    const stepperCtx = useStepperContext<V>()
    return (
        <stepContext.Provider value={{ ...stepperCtx, ...eventHandlers }}>
            <div className={cn('relative flex w-full flex-1 flex-col', className)}>{children}</div>
        </stepContext.Provider>
    )
}

// =============== Step Header ===============

export function StepHeader<V>() {
    const { step: stepCtx, steps, titles, onBack, ...stepperCtx } = useStepContext<V>()

    const step = stepCtx ?? 0

    return (
        <div className='text-foreground-sub sticky top-0 flex min-h-8 items-center bg-background p-8 md:h-auto'>
            {[...Array(steps)].map((_, i) => (
                <div
                    key={i}
                    className={cn(step !== i ? 'hidden md:flex' : 'flex', 'flex-1 md:flex-col md:gap-2 md:gap-x-0')}
                >
                    {/* Icon */}
                    <CaretLeft
                        className='h-4 w-4 flex-none self-center md:hidden'
                        onClick={() => {
                            stepperCtx.back?.(async () => onBack?.(stepperCtx.value))
                        }}
                    />

                    {/* Title */}
                    <div
                        className={cn(
                            'flex-1 pl-2 md:mt-3 md:flex md:flex-none md:items-center md:justify-center md:pl-0'
                        )}
                    >
                        <span className={cn('text-sm text-muted-foreground', step === i && 'md:text-primary')}>
                            {titles?.[i]}
                        </span>
                    </div>

                    {/* Badge */}
                    <Badge variant='secondary' className='md:hidden'>
                        {`Step ${step + 1} of ${steps}`}
                    </Badge>

                    {/* Indicator */}
                    <div className='hidden md:flex md:flex-1 md:items-center'>
                        {/* Left line */}
                        <div className={cn('w-full border', i == 0 && 'border-none', step >= i && 'border-primary')} />
                        {/* Circle */}
                        <div
                            className={cn(
                                'flex h-4 w-4 flex-none items-center justify-center rounded-full border-2',
                                step > i && 'border-primary bg-primary',
                                step === i && 'border-primary'
                            )}
                        >
                            {step > i && (
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='h-5 w-5 text-white'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                                </svg>
                            )}
                        </div>
                        {/* Right line */}
                        <div
                            className={cn(
                                'w-full border',
                                i + 1 === steps && 'border-none',
                                step > i && 'border-primary'
                            )}
                        />
                    </div>
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
    return <Comp className={cn('flex-1 overflow-auto px-8 py-4', className)} ref={ref} {...props} />
})

// =============== Step Footer ===============

export type StepFooterProps = {
    className?: string
}

export function StepFooter<V>({ className, ...props }: StepFooterProps) {
    const { value, step, steps, onBack, onNext, ...stepperCtx } = useStepContext<V>()

    return (
        <div
            className={cn(
                'bg-background p-8 md:sticky md:bottom-0 md:flex md:items-center md:justify-between',
                className
            )}
        >
            <Button
                variant='secondary'
                className='hidden md:inline-block'
                onClick={() => {
                    stepperCtx.back?.(async () => onBack?.(value))
                }}
            >
                {step === 0 ? 'Cancel' : 'Back'}
            </Button>
            <Button className='w-full md:w-auto' onClick={() => stepperCtx.next?.(async () => onNext?.(value))}>
                {step === steps - 1 ? 'Done' : 'Next'}
            </Button>
        </div>
    )
}
