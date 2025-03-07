"use client"

import type React from "react"
import { Mail } from "lucide-react"

interface EmailInputProps {
  email: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isFocused: boolean
  onFocus: () => void
  onBlur: () => void
  disabled?: boolean
}

export default function EmailInput({ email, onChange, isFocused, onFocus, onBlur, disabled }: EmailInputProps) {
  return (
    <div className="relative flex-1">
      <Mail
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
          isFocused ? "text-secondary" : "text-text-muted"
        }`}
      />
      <input
        type="email"
        value={email}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Enter your email"
        className="w-full pl-12 pr-4 py-3 bg-primary text-text rounded-md border border-secondary focus:border-ring outline-none transition-all duration-200"
        required
        disabled={disabled}
      />
    </div>
  )
}

