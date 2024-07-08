import * as React from 'react'
import { Step, StepContent, StepFooter, StepHeader, useStepperContext } from '@/components/stepper/Stepper.tsx'
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
import { Input } from '@/components/ui/Input.tsx'
import { DatePicker } from '@/components/ui/DatePicker.tsx'
import { addDays, formatDuration, intervalToDuration } from 'date-fns'
import { TextArea } from '@/components/ui/TextArea.tsx'
import { JsonViewer } from '@/components/ui/JsonViewer.tsx'
import { StepperResult } from '@/App.tsx'

const FORM_SCHEMA = z.object({
    jobTitle: z.string(),
    description: z.string(),
    duration: z.object(
        { from: z.date(), to: z.date() },
        {
            required_error: 'A date is required.',
        }
    ),
})

export type StepProjectDetailsResult = z.infer<typeof FORM_SCHEMA>

export function StepProjectDetails() {
    const stepperCtx = useStepperContext<StepperResult>()

    const form = useForm<StepProjectDetailsResult>({
        resolver: zodResolver(FORM_SCHEMA),
        defaultValues: {
            jobTitle: '',
            description: '',
            duration: { from: new Date(), to: addDays(new Date(), 1) },
            ...stepperCtx.value,
        },
    })

    return (
        <Step
            onNext={async val => {
                await form.trigger()
                // todo:
                // if (!form.formState.isValid) return { ...(val ?? {}) }
                if (!form.formState.isValid) throw new Error('Invalid stepper form')

                let res: StepProjectDetailsResult
                await form.handleSubmit(formValues => {
                    res = { ...(val ?? {}), ...formValues }
                })()
                return res!
            }}
        >
            <StepHeader />
            <StepContent>
                <Form {...form}>
                    <form className='w-full space-y-6'>
                        <FormField
                            control={form.control}
                            name='jobTitle'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job title</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter a title for this job' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <TextArea placeholder='Enter a description' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='duration'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job duration</FormLabel>
                                    <FormControl>
                                        <DatePicker mode='range' {...field} />
                                    </FormControl>
                                    <FormDescription>{`The job has a selected duration of ${formatDuration(
                                        intervalToDuration({
                                            start: field.value.from,
                                            end: field.value.to,
                                        })
                                    )}`}</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <JsonViewer>{stepperCtx.value}</JsonViewer>
            </StepContent>
            <StepFooter />
        </Step>
    )
}
