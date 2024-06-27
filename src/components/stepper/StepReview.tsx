import { Step, StepFooter, useStepperContext } from '@/components/stepper/Stepper.tsx'
import { StepperResult } from '@/App.tsx'
import { JsonViewer } from '@/components/ui/JsonViewer.tsx'

export function StepReview() {
    const stepperCtx = useStepperContext<StepperResult>()
    return (
        <Step>
            <JsonViewer>{stepperCtx.value}</JsonViewer>
            <StepFooter />
        </Step>
    )
}
