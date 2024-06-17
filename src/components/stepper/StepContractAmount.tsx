import * as React from 'react'
import { Step, StepContent, useStepperContext } from '@/components/stepper/Stepper.tsx'
import { JsonViewer } from '@/components/ui/JsonViewer.tsx'

export function StepContractAmount() {
    const stepperCtx = useStepperContext()

    return (
        <Step className='justify-center'>
            <StepContent className='flex flex-col items-center gap-4'>
                <JsonViewer>{stepperCtx.value}</JsonViewer>
            </StepContent>
        </Step>
    )
}
