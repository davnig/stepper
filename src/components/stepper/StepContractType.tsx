import * as React from 'react'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card.tsx'
import { Step, StepContent, StepFooter, StepHeader, useStepperContext } from '@/components/stepper/Stepper.tsx'
import { JsonViewer } from '@/components/ui/JsonViewer.tsx'
import { StepperResult } from '@/App.tsx'
import { cn } from '@/utils/utils.ts'

enum Contract {
    FIXED_RATE = 'fixed-rate',
    MILESTONE = 'milestone',
    HOURLY_BASIS = 'hourly-basis',
}

export type ContractType = `${Contract}`

export type StepContractTypeResult = { contractType: ContractType }

export function StepContractType() {
    const stepperCtx = useStepperContext<StepperResult>()

    const [contractType, setContractType] = useState<ContractType>(
        stepperCtx.value?.contractType ?? Contract.FIXED_RATE
    )

    const cards = [
        {
            title: 'Fixed rate',
            description: 'Contracts that have a fixed rate on every payment',
            value: Contract.FIXED_RATE,
        },
        {
            title: 'Milestone',
            description: 'Contract with that will be paid as the get completed',
            value: Contract.MILESTONE,
        },
        {
            title: 'Hourly basis',
            description: 'Contract with that will be paid by hours they work',
            value: Contract.HOURLY_BASIS,
        },
    ]

    return (
        <Step>
            <StepHeader />
            <StepContent className='flex flex-col items-center gap-4'>
                <p className='self-center font-semibold'>What type of Contractor's contract you need?</p>
                <div className='flex flex-col gap-4 md:flex-row md:items-center'>
                    {cards.map((card, ix) => (
                        <Card
                            key={ix}
                            onClick={() => setContractType(card.value)}
                            className={cn(
                                'w-52 cursor-pointer hover:shadow-md',
                                contractType === card.value && 'border border-primary'
                            )}
                        >
                            <CardHeader className='flex flex-col items-center text-center'>
                                <CardTitle>{card.title}</CardTitle>
                                <CardDescription>{card.description}</CardDescription>
                            </CardHeader>
                            <CardContent className='flex justify-center'>
                                <input
                                    type='radio'
                                    value={card.value}
                                    name='contract-type'
                                    checked={contractType === card.value}
                                    onChange={event => event.target.checked && setContractType(card.value)}
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <JsonViewer>{stepperCtx.value}</JsonViewer>
            </StepContent>
            <StepFooter onNext={async val => ({ ...(val ?? {}), contractType })} />
        </Step>
    )
}
