import * as React from 'react'
import { Step, StepContent, StepFooter, StepHeader, useStepperContext } from '@/components/stepper/Stepper.tsx'
import { JsonViewer } from '@/components/ui/JsonViewer.tsx'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { StepperResult } from '@/App.tsx'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/Form.tsx'
import { Input } from '@/components/ui/Input.tsx'
import { Environ } from '@/env.ts'

const FORM_SCHEMA = z.object({
    compensationDescription: z.string(),
})

export type StepPaymentTermsResult = z.infer<typeof FORM_SCHEMA>

export function StepPaymentTerms() {
    const stepperCtx = useStepperContext<StepperResult>()

    const form = useForm<StepPaymentTermsResult>({
        resolver: zodResolver(FORM_SCHEMA),
        defaultValues: {
            compensationDescription: '',
            ...stepperCtx.value,
        },
    })

    return (
        <Step
            onNext={async val => {
                await form.trigger()
                if (!form.formState.isValid) throw new Error('Invalid stepper form')

                let res: StepPaymentTermsResult
                await form.handleSubmit(formValues => {
                    res = { ...(val ?? {}), ...formValues }
                })()
                return res!
            }}
        >
            <StepHeader />
            <StepContent title='What are the compensation details?' className='flex flex-col items-center gap-6'>
                <Form {...form}>
                    <form className='w-full space-y-6'>
                        <FormField
                            control={form.control}
                            name='compensationDescription'
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter a description' {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                {Environ.isDev && <JsonViewer>{stepperCtx.value}</JsonViewer>}
            </StepContent>
            <StepFooter />
        </Step>
    )
}
