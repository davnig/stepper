import * as React from 'react'
import { useMemo } from 'react'
import { Step, StepContent, StepFooter, StepHeader, useStepperContext } from '@/components/stepper/Stepper.tsx'
import { JsonViewer } from '@/components/ui/JsonViewer.tsx'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { StepperResult } from '@/App.tsx'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form.tsx'
import { Bank, PaypalLogo, StripeLogo } from '@phosphor-icons/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx'
import { cn } from '@/utils/utils.ts'
import { Input } from '@/components/ui/Input.tsx'
import { DatePicker } from '@/components/ui/DatePicker.tsx'

enum PaymentMethod {
    STRIPE = 'stripe',
    PAYPAL = 'paypal',
    BANK = 'bank-transfer',
}

const FORM_SCHEMA = z.object({
    paymentMethod: z.enum([PaymentMethod.STRIPE, PaymentMethod.PAYPAL, PaymentMethod.BANK], {
        required_error: 'You need to choose a payment method.',
    }),
    paymentAmount: z.coerce.number(),
    paymentDate: z.date(),
    paymentDescription: z.string(),
})

export type StepPaymentTermsResult = z.infer<typeof FORM_SCHEMA>

export function StepPaymentTerms() {
    const stepperCtx = useStepperContext<StepperResult>()

    const form = useForm<StepPaymentTermsResult>({
        resolver: zodResolver(FORM_SCHEMA),
        defaultValues: {
            paymentMethod: PaymentMethod.STRIPE,
            paymentAmount: 0,
            paymentDate: new Date(),
            paymentDescription: '',
            ...stepperCtx.value,
        },
    })

    const paymentMethods = useMemo(
        () => [
            {
                title: 'Stripe',
                icon: <StripeLogo className='h-10 w-10' />,
                value: PaymentMethod.STRIPE,
            },
            {
                title: 'PayPal',
                icon: <PaypalLogo className='h-10 w-10' />,
                value: PaymentMethod.PAYPAL,
            },
            { title: 'Bank', icon: <Bank className='h-10 w-10' />, value: PaymentMethod.BANK },
        ],
        []
    )

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
            <StepContent className='flex flex-col items-center gap-4'>
                <Form {...form}>
                    <form className='w-full space-y-6'>
                        <FormField
                            control={form.control}
                            name='paymentMethod'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Payment method</FormLabel>
                                    <FormControl>
                                        <div className='grid grid-cols-3 gap-4'>
                                            {paymentMethods.map(method => (
                                                <Card
                                                    key={method.title}
                                                    className={cn(
                                                        'flex cursor-pointer flex-col items-center hover:shadow-md',
                                                        field.value === method.value && 'border border-primary'
                                                    )}
                                                    onClick={() => field.onChange(method.value)}
                                                >
                                                    <CardHeader>
                                                        <CardTitle
                                                            className={cn(
                                                                field.value === method.value && 'text-primary'
                                                            )}
                                                        >
                                                            {method.title}
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent
                                                        className={cn(
                                                            'flex items-center',
                                                            field.value === method.value
                                                                ? 'text-primary'
                                                                : 'text-muted-foreground'
                                                        )}
                                                    >
                                                        {method.icon}
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex items-center gap-4'>
                            <FormField
                                control={form.control}
                                name='paymentAmount'
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel>Payment amount</FormLabel>
                                        <FormControl>
                                            <Input type='number' {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='paymentDate'
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel>Payment date</FormLabel>
                                        <FormControl>
                                            <DatePicker mode='single' {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name='paymentDescription'
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter a payment description' {...field} />
                                    </FormControl>
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
