import { Stepper, StepperFooter, StepperHeader, useStepperContext } from './stepper/Stepper.tsx'

enum STEPS {
    FIRST,
    SECOND,
    THIRD,
}

export function App() {
    return (
        <Stepper
            steps={Object.keys(STEPS).length / 2}
            initialValue='hello world'
            titles={['First step', 'Second step', 'Third step']}
        >
            {({ step }) => (
                <div className='px-36 py-20'>
                    {step === STEPS.FIRST && <Step1 />}
                    {step === STEPS.SECOND && <Step2 />}
                    {step === STEPS.THIRD && <Step3 />}
                </div>
            )}
        </Stepper>
    )
}

function Step1() {
    const stepperCtx = useStepperContext<string>()

    return (
        <div className='flex flex-col gap-2'>
            <StepperHeader />
            <p>{stepperCtx.value}</p>
            <StepperFooter />
        </div>
    )
}

function Step2() {
    const stepperCtx = useStepperContext<string>()

    return (
        <div className='flex flex-col gap-2'>
            <StepperHeader />
            <p>{stepperCtx.value}</p>
            <StepperFooter />
        </div>
    )
}

function Step3() {
    const stepperCtx = useStepperContext<string>()

    return (
        <div className='flex flex-col gap-2'>
            <StepperHeader />
            <p>{stepperCtx.value}</p>
            <StepperFooter />
        </div>
    )
}
