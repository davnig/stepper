import { Stepper, StepFooter, StepHeader, useStepperContext } from '@/components/stepper/Stepper.tsx'
import { Input } from '@/components/ui/Input.tsx'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/Form.tsx'
import { useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx'
import { StepContractType } from '@/components/stepper/StepContractType.tsx'
import { StepProjectDetails } from '@/components/stepper/StepProjectDetails.tsx'

/*
1. Fixed Rate
Step 1: Select Contract Type: Fixed Rate

Step 2: Project Details
- Project Description
- Estimated Project Duration
- Specific Requirements

Step 3: Contract Amount
- Total Amount
- Payment Deadline (project delivery date)

Step 4: Payment Terms
- Payment Methods (bank transfer, PayPal, etc.)
- Cancellation and Refund Policy

Step 5: Contract Clauses
- Intellectual Property
- Confidentiality
- Dispute Resolution

Step 6: Review and Confirmation
- Review all details
- Confirm and Sign the Contract

2. Milestone
Step 1: Select Contract Type: Milestone

Step 2: Project Details
- Project Description
- Estimated Project Duration
- Specific Requirements

Step 3: Define Milestones
- Create Milestones (description, deadline, deliverables)
- Amount Associated with Each Milestone

Step 4: Payment Terms
- Payment upon Delivery of Each Milestone
- Payment Methods (bank transfer, PayPal, etc.)
- Cancellation and Refund Policy

Step 5: Contract Clauses
- Intellectual Property
- Confidentiality
- Dispute Resolution

Step 6: Review and Confirmation
- Review all details
- Confirm and Sign the Contract

3. Hourly Based
Step 1: Select Contract Type: Hourly Based

Step 2: Project Details
- Project Description
- Estimated Project Duration
- Specific Requirements

Step 3: Hourly Rate
- Hourly Rate Amount
- Estimated Number of Hours
- Billing Period (weekly, bi-weekly, monthly)

Step 4: Time Tracking and Reporting
- Time Tracking Tools (Toggl, Harvest, etc.)
- Weekly/Monthly Reports

Step 5: Payment Terms
- Payment Methods (bank transfer, PayPal, etc.)
- Cancellation and Refund Policy

Step 6: Contract Clauses
- Intellectual Property
- Confidentiality
- Dispute Resolution

Step 7: Review and Confirmation
- Review all details
- Confirm and Sign the Contract
 */

enum STEPS {
    CONTRACT_TYPE,
    PROJECT_DETAILS,
    CONTRACT_AMOUNT,
}

export function App() {
    return (
        <Stepper
            steps={Object.keys(STEPS).length / 2}
            initialValue='hello world'
            titles={['Contract type', 'Project details', 'Contract amount']}
        >
            {({ step }) => (
                <div className='flex h-screen w-screen flex-col items-center justify-between py-8'>
                    {step === STEPS.CONTRACT_TYPE && <StepContractType />}
                    {step === STEPS.PROJECT_DETAILS && <StepProjectDetails />}
                    {/*{step === STEPS.CONTRACT_AMOUNT && <Step3 />}*/}
                </div>
            )}
        </Stepper>
    )
}
