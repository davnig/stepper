import { Stepper, StepperFooter, StepperHeader, useStepperContext } from '@/components/stepper/Stepper.tsx'
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
import { Button } from '@/components/ui/Button.tsx'
import { useMemo } from 'react'

enum STEPS {
    FIRST,
    SECOND,
    THIRD,
}

export function App() {
    return (
        <Stepper
            steps={Object.keys(STEPS).length / 2}
            initialValue='hello world'
            titles={['First step', 'Second step', 'Third step']}
        >
            {({ step }) => (
                <div className='flex w-full flex-col items-center justify-between'>
                    {step === STEPS.FIRST && <Step1 />}
                    {step === STEPS.SECOND && <Step2 />}
                    {step === STEPS.THIRD && <Step3 />}
                </div>
            )}
        </Stepper>
    )
}

function Step1() {
    const stepperCtx = useStepperContext<string>()

    const FormSchema = useMemo(
        () =>
            z.object({
                username: z.string().min(2, {
                    message: 'Username must be at least 2 characters.',
                }),
            }),
        []
    )

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
        },
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log(data)
    }

    return (
        <div className='flex min-w-96 flex-col gap-8'>
            <StepperHeader />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Choose a username</FormLabel>
                                <FormControl>
                                    <Input placeholder='Username' {...field} />
                                </FormControl>
                                <FormDescription>This is your public display name.</FormDescription>
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

function Step2() {
    const stepperCtx = useStepperContext<string>()

    return (
        <div className='flex min-w-96 flex-col gap-8'>
            <StepperHeader />
            <p>{stepperCtx.value}</p>
            <StepperFooter />
        </div>
    )
}

function Step3() {
    const stepperCtx = useStepperContext<string>()

    return (
        <div className='flex min-w-96 flex-col gap-8 '>
            <StepperHeader />
            <p>{stepperCtx.value}</p>
            <StepperFooter />
        </div>
    )
}
