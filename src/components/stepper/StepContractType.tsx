import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card.tsx'
import { StepperFooter, useStepperContext } from '@/components/stepper/Stepper.tsx'
import * as React from 'react'

enum Contract {
    FIXED_RATE = 'fixed-rate',
    MILESTONE = 'milestone',
    HOURLY_BASIS = 'hourly-basis',
}

export type ContractType = `${Contract}`

export function StepContractType() {
    const [contractType, setContractType] = useState<ContractType>(Contract.FIXED_RATE)
    const stepperCtx = useStepperContext<any>()

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
        <div className='flex flex-col justify-center gap-4'>
            <p className='self-center font-semibold'>What type of Contractor's contract you need?</p>
            <div className='flex items-center gap-4'>
                {cards.map((card, ix) => (
                    <Card
                        key={ix}
                        onClick={() => setContractType(card.value)}
                        className='w-52 cursor-pointer hover:shadow-md'
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
            <p>{stepperCtx.value}</p>
            <StepperFooter />
        </div>
    )
}
