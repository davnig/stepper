import { Step, StepContent, StepFooter, StepHeader, useStepperContext } from '@/components/stepper/Stepper.tsx'
import { StepperResult } from '@/App.tsx'
import { JsonViewer } from '@/components/ui/JsonViewer.tsx'
import { Environ } from '@/env.ts'

export function StepReview() {
    const stepperCtx = useStepperContext<StepperResult>()
    return (
        <Step>
            <StepHeader />
            <StepContent>{Environ.isDev && <JsonViewer>{stepperCtx.value}</JsonViewer>}</StepContent>
            <StepFooter />
        </Step>
    )
}
