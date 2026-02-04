import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
    {
        variants: {
            variant: {
                primary: 'bg-navy-900 text-white hover:bg-navy-800 focus:ring-navy-600',
                secondary: 'bg-gold-400 text-navy-900 hover:bg-gold-500 focus:ring-gold-600',
                outline: 'border-2 border-navy-900 text-navy-900 hover:bg-navy-50',
                ghost: 'text-navy-900 hover:bg-navy-50',
                destructive: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
            },
            size: {
                sm: 'px-4 py-2 text-sm',
                md: 'px-6 py-3 text-base',
                lg: 'px-8 py-4 text-lg',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
)

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
