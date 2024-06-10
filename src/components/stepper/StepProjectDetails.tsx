import * as React from 'react'
import { Step, StepContent, StepFooter, StepHeader, useStepperContext } from '@/components/stepper/Stepper.tsx'
import { useMemo } from 'react'
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

export function StepProjectDetails() {
    const stepperCtx = useStepperContext<string>()

    const FormSchema = useMemo(
        () =>
            z.object({
                jobTitle: z.string().min(2, {
                    message: 'Job title must be at least 2 characters.',
                }),
                description: z.string().min(2, {
                    message: 'Description must be at least 2 characters.',
                }),
                duration: z.object(
                    { from: z.date(), to: z.date() },
                    {
                        required_error: 'A date is required.',
                    }
                ),
            }),
        []
    )

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            jobTitle: '',
            description: '',
            duration: { from: new Date(), to: addDays(new Date(), 1) },
        },
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        // todo: submit
        console.log(data)
    }

    return (
        <Step>
            <StepHeader />
            <StepContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
                        <FormField
                            control={form.control}
                            name='jobTitle'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job title</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter a title for this job' {...field} />
                                    </FormControl>
                                    {/*<FormDescription>This is your public display name.</FormDescription>*/}
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
                                    {/*<FormDescription>This is your public display name.</FormDescription>*/}
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
                                    <FormDescription>{`The job has a selected duration of ${formatDuration(intervalToDuration({ start: field.value.from, end: field.value.to }))}`}</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/*<Button type='submit'>Submit</Button>*/}
                    </form>
                </Form>
                <p>{stepperCtx.value}</p>
            </StepContent>
            <StepFooter />
        </Step>
    )
}
