"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const Checkbox = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
  }
>(({ className, checked = false, onCheckedChange, disabled, onClick, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) {
      onCheckedChange?.(!checked)
      onClick?.(e)
    }
  }

  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      className={cn(
        "shrink-0 rounded-sm border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "h-5 w-5 border-gray-400 bg-white flex items-center justify-center",
        checked && "bg-blue-600 border-blue-600",
        disabled && "cursor-not-allowed opacity-50 bg-gray-100",
        !disabled && "cursor-pointer hover:border-gray-500",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {checked && (
        <Check className="h-3 w-3 text-white" strokeWidth={3} />
      )}
    </button>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }