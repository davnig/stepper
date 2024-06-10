import * as React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover.tsx'
import { Button } from '@/components/ui/Button.tsx'
import { cn } from '@/utils/utils.ts'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Dispatch } from 'react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/Calendar.tsx'
import { DateRange } from 'react-day-picker'

function isDateRange(date: DateRange | Date | undefined): date is DateRange {
    const coerced = date as DateRange
    return !!coerced.from
}

export type DatePickerProps<D extends DateRange | Date> = {
    mode?: 'single' | 'range'
    value?: D
    onChange?: Dispatch<D | undefined>
}

function DatePicker<D extends DateRange | Date>({
    mode = 'single',
    value: date,
    onChange: onDateChange,
}: DatePickerProps<D>) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id='date'
                    variant='outline'
                    className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {mode === 'single' && (date && !isDateRange(date) ? format(date, 'PPP') : <span>Pick a date</span>)}
                    {mode === 'range' &&
                        (isDateRange(date) && date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(date.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>Pick a range</span>
                        ))}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
                {/*todo: fix typing*/}
                {!isDateRange(date) ? (
                    <Calendar mode='single' selected={date} onSelect={val => onDateChange?.(val as any)} initialFocus />
                ) : (
                    <Calendar
                        mode='range'
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={val => onDateChange?.(val as any)}
                        numberOfMonths={2}
                        initialFocus
                    />
                )}
            </PopoverContent>
        </Popover>
    )
}

export { DatePicker }
