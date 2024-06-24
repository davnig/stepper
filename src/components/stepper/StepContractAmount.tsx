import * as React from 'react'
import { Step, StepContent, StepFooter, StepHeader, useStepperContext } from '@/components/stepper/Stepper.tsx'
import { JsonViewer } from '@/components/ui/JsonViewer.tsx'

export function StepContractAmount() {
    const stepperCtx = useStepperContext()

    return (
        <Step>
            <StepHeader />
            <StepContent className='flex flex-col items-center gap-4'>
                <JsonViewer>{stepperCtx.value}</JsonViewer>
            </StepContent>
            <StepFooter />
        </Step>
    )
}
