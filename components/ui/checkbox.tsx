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
>(({ className, checked = false, onCheckedChange, disabled, ...props }, ref) => (
  <button
    ref={ref}
    role="checkbox"
    aria-checked={checked}
    disabled={disabled}
    className={cn(
      "peer shrink-0 rounded-sm border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "h-5 w-5 border-gray-400",
      checked && "bg-primary border-primary",
      disabled && "cursor-not-allowed opacity-50 bg-gray-100",
      !disabled && "cursor-pointer",
      className
    )}
    onClick={() => !disabled && onCheckedChange?.(!checked)}
    {...props}
  >
    {checked && (
      <Check className="h-4 w-4 text-white mx-auto" />
    )}
  </button>
))
Checkbox.displayName = "Checkbox"

export { Checkbox }