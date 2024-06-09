import * as React from 'react'
import { ComponentProps, ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../utils/utils.ts'

export const buttonVariants = cva('rounded-lg px-4 py-2', {
    variants: {
        variant: {
            primary: 'bg-gray-500 text-white hover:bg-gray-700',
            secondary: 'bg-transparent text-black hover:bg-gray-200',
        },
    },
})

export type ButtonProps = ComponentProps<'button'> & {
    variant?: 'primary' | 'secondary'
    children?: ReactNode
    className?: string
}

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
    return (
        <button className={cn(buttonVariants({ variant, className }))} {...props}>
            {children}
        </button>
    )
}
