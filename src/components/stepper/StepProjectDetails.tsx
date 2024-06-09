import * as React from 'react'
import { StepperFooter, StepperHeader, useStepperContext } from '@/components/stepper/Stepper.tsx'
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
                // todo: date
                duration: z.string().date(),
            }),
        []
    )

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            jobTitle: '',
            description: '',
            duration: '',
        },
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        // todo: submit
        console.log(data)
    }

    return (
        <div className='flex min-w-96 flex-col gap-8'>
            <StepperHeader />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
                    <FormField
                        control={form.control}
                        name='jobTitle'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job title</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter a job title' {...field} />
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
                                    <Input placeholder='Enter a description' {...field} />
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
                                    <DatePicker {...field} />
                                </FormControl>
                                {/*<FormDescription>This is your public display name.</FormDescription>*/}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/*<Button type='submit'>Submit</Button>*/}
                </form>
            </Form>
            <p>{stepperCtx.value}</p>
            <StepperFooter />
        </div>
    )
}
