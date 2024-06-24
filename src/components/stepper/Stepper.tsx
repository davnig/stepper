import { createContext, Dispatch, forwardRef, ReactNode, Ref, useContext, useMemo, useState } from 'react'
import { cn, FnChildren, renderFnChildren } from '@/utils/utils.ts'
import { Button } from '@/components/ui/Button.tsx'
import { Slot } from '@radix-ui/react-slot'

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

export type StepperProps<V> = {
    steps: number
    titles?: string[]
    initialValue?: V
    children?: FnChildren<StepperContext<V>>
}

export function Stepper<V>({ steps, titles, initialValue, children, ...props }: StepperProps<V>) {
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

    return <stepperContext.Provider value={context}>{renderFnChildren(children, context)}</stepperContext.Provider>
}

// =================== Step ===================

export type StepProps = {
    children?: ReactNode
    className?: string
}

export function Step({ children, className }: StepProps) {
    return <div className={cn('flex h-full w-full flex-col gap-4', className)}>{children}</div>
}

// =============== Step Header ===============

export function StepHeader<V>() {
    const { step: stepCtx, steps, titles } = useStepperContext<V>()

    const step = stepCtx ?? 0

    return (
        <ul aria-label='Steps' className='text-foreground-sub items-center md:flex'>
            {[...Array(steps)].map((_, i) => (
                <li
                    aria-current={stepCtx === i ? 'step' : false}
                    className='flex gap-x-3 md:flex-1 md:flex-col-reverse md:gap-2 md:gap-x-0'
                >
                    {/* Indicator */}
                    <div className='flex flex-col items-center md:flex-1 md:flex-row'>
                        {/* Left line */}
                        <div
                            className={cn(
                                'hidden w-full border md:block',
                                i == 0 && 'border-none',
                                step >= i && 'border-primary'
                            )}
                        />
                        {/* Circle */}
                        <div
                            className={cn(
                                'flex h-4 w-4 flex-none items-center justify-center rounded-full border-2',
                                step > i && 'border-primary bg-primary',
                                step === i && 'border-primary'
                            )}
                        >
                            {/*<span className={cn('h-2 w-2 rounded-full bg-primary', step != i && 'hidden')}></span>*/}
                            {step > i ? (
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
                            ) : (
                                ''
                            )}
                        </div>
                        {/* Right line */}
                        <div
                            className={cn(
                                'h-12 border md:h-auto md:w-full',
                                i + 1 === steps && 'border-none',
                                step > i && 'border-primary'
                            )}
                        />
                    </div>

                    {/* Title */}
                    <div className='flex h-4 items-center justify-center md:mt-3 md:h-auto'>
                        <span className={cn('text-sm text-muted-foreground', step === i && 'text-primary')}>
                            {titles?.[i]}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
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

export type StepFooterProps<V> = StepperEventHandlers<V> & {
    className?: string
}

export function StepFooter<V>({ className, onNext, onBack, ...props }: StepFooterProps<V>) {
    const { value, step, steps, ...stepper } = useStepperContext<V>()

    return (
        <div className={cn('flex items-center justify-between', className)}>
            <Button
                variant='secondary'
                onClick={() => {
                    stepper.back?.(async () => onBack?.(value))
                }}
            >
                {step === 0 ? 'Cancel' : 'Back'}
            </Button>
            <Button onClick={() => stepper.next?.(async () => onNext?.(value))}>
                {step === steps - 1 ? 'Done' : 'Next'}
            </Button>
        </div>
    )
}
