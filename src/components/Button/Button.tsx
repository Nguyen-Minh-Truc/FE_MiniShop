'use client'

import React from 'react'
import { ButtonProps } from './Button.types'
import { Spinner } from '@/components/ui/spinner'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', isLoading, disabled, className, children, ...props }, ref) => {
    const baseStyles = 'font-medium rounded-md transition-colors duration-200 flex items-center gap-2'

    const variantStyles = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-border text-foreground hover:bg-muted',
      ghost: 'hover:bg-muted text-foreground',
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    const finalClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={finalClassName}
        {...props}
      >
        {isLoading && <Spinner className="w-4 h-4" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
