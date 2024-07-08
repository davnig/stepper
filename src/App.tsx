import { Stepper } from '@/components/stepper/Stepper.tsx'
import { StepContractType, StepContractTypeResult } from '@/components/stepper/StepContractType.tsx'
import { StepProjectDetails, StepProjectDetailsResult } from '@/components/stepper/StepProjectDetails.tsx'
import { StepPaymentTerms, StepPaymentTermsResult } from '@/components/stepper/StepPaymentTerms.tsx'
import { StepReview } from '@/components/stepper/StepReview.tsx'
import { IconContext } from '@phosphor-icons/react'

/*
1. Fixed Rate
Step 1: Select Contract Type: Fixed Rate

Step 2: Project Details
- Project Description
- Estimated Project Duration
- Specific Requirements

Step 3: Contract Terms
- Payment Methods (bank transfer, PayPal, etc.)
- Total Amount
- Payment Deadline (project delivery date)

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
    RESULT,
}

export type StepperResult = Partial<StepContractTypeResult & StepProjectDetailsResult & StepPaymentTermsResult>

export function App() {
    return (
        <IconContext.Provider
            value={{
                // color: 'limegreen',
                // size: 32,
                weight: 'light',
                // mirrored: false,
            }}
        >
            <Stepper<StepperResult>
                steps={Object.keys(STEPS).length / 2}
                initialValue={undefined}
                titles={['Contract type', 'Project details', 'Payment terms', 'Review']}
            >
                {({ step }) => (
                    <>
                        {step === STEPS.CONTRACT_TYPE && <StepContractType />}
                        {step === STEPS.PROJECT_DETAILS && <StepProjectDetails />}
                        {step === STEPS.CONTRACT_AMOUNT && <StepPaymentTerms />}
                        {step === STEPS.RESULT && <StepReview />}
                    </>
                )}
            </Stepper>
        </IconContext.Provider>
    )
}
